import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

const browser=spawn('C:/Users/monda/AppData/Local/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-win64/chrome-headless-shell.exe',['--remote-debugging-port=9342','--no-sandbox','--disable-gpu','about:blank'],{windowsHide:true,stdio:'ignore'});
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let socket;
try {
  let tabs;
  for(let i=0;i<50;i++){try{tabs=await(await fetch('http://127.0.0.1:9342/json')).json();break;}catch{await delay(100);}}
  assert.ok(tabs,'Browser starts');
  socket=new WebSocket(tabs[0].webSocketDebuggerUrl);
  await new Promise(resolve=>socket.addEventListener('open',resolve,{once:true}));
  let serial=0;const pending=new Map();
  socket.addEventListener('message',event=>{const data=JSON.parse(event.data);if(data.id){const p=pending.get(data.id);pending.delete(data.id);if(data.error)p.reject(Error(JSON.stringify(data.error)));else p.resolve(data.result);}});
  const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});
  const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
  const until=async expression=>{for(let i=0;i<120;i++){if(await evaluate(expression))return;await delay(100);}throw Error(`Timed out: ${expression}`);};
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await send('Page.addScriptToEvaluateOnNewDocument',{source:`
    window.scrambleHistory=[];
    new MutationObserver(records=>{
      for(const r of records){
        const el=r.target;
        if(r.attributeName==='data-scrambling'&&el.hasAttribute('data-scrambling')){
          const headline=el.closest('[data-headline]');
          window.scrambleHistory.push({word:el.firstElementChild.textContent,ready:document.documentElement.dataset.lotusLoading,transform:headline?getComputedStyle(headline).transform:null,width:el.getBoundingClientRect().width});
        }
      }
    }).observe(document,{subtree:true,attributes:true,attributeFilter:['data-scrambling']});
  `});
  const words=`[...document.querySelectorAll('#hero-name [class*="_word"]')]`;
  const originals=['Bedantika','Mondal'];
  for(const theme of ['light','dark']) {
    await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'},{name:'prefers-color-scheme',value:theme}]});
    await send('Page.navigate',{url:'http://127.0.0.1:3003/'});
    await until(`window.scrambleHistory?.length>=2`);
    assert.ok(await evaluate(`window.scrambleHistory.every(e=>e.ready==='complete'&&(!e.transform||e.transform==='none'||e.transform==='matrix(1, 0, 0, 1, 0, 0)'))`),'Scramble waits until loader and headline entrance finish');
    const widths=await evaluate(`${words}.map(el=>el.getBoundingClientRect().width)`);
    // Restart during automatic playback, then exit: one word restores immediately.
    const first=await evaluate(`(()=>{const r=${words}[0].getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
    await send('Input.dispatchMouseEvent',{type:'mouseMoved',...first});await delay(120);
    await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:0,y:0});await delay(100);
    assert.equal(await evaluate(`${words}[0].lastElementChild.textContent`),'Bedantika');
    await until(`!document.querySelector('#hero-name [data-scrambling]')`);
    assert.deepEqual(await evaluate(`${words}.map(el=>el.lastElementChild.textContent)`),originals);
    assert.deepEqual(await evaluate(`${words}.map(el=>el.getBoundingClientRect().width)`),widths,'Name widths stay fixed');
    const idleCount=await evaluate('window.scrambleHistory.length');await delay(400);
    assert.equal(await evaluate('window.scrambleHistory.length'),idleCount,'No automatic repeat');
    for(let i=0;i<2;i++) {
      const point=await evaluate(`(()=>{const r=${words}[${i}].getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
      await send('Input.dispatchMouseEvent',{type:'mouseMoved',...point});
      await until(`${words}[${i}].hasAttribute('data-scrambling')`);
      assert.equal(await evaluate(`${words}[${1-i}].hasAttribute('data-scrambling')`),false,'Hover stays independent');
      await until(`!document.querySelector('#hero-name [data-scrambling]')`);
      await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:0,y:0});
    }
    assert.equal(await evaluate(`document.querySelector('.name-period').textContent`),'.');
    assert.equal(await evaluate(`document.querySelector('#hero-name').getAttribute('aria-label')`),'Bedantika Mondal');
    assert.ok(await evaluate(`${words}.every(el=>el.lastElementChild.getAttribute('aria-hidden')==='true')`));
    console.log(`${theme}: entrance ordering, automatic resolution, hover interruption/replay, independent words, stable widths, period and accessible name passed.`);
  }
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await send('Page.navigate',{url:'http://127.0.0.1:3003/'});
  await until(`document.documentElement?.dataset.lotusLoading==='complete' && ${words}.length===2`);
  await delay(200);
  assert.equal(await evaluate('window.scrambleHistory.length'),0,'Reduced motion never scrambles');
  assert.deepEqual(await evaluate(`${words}.map(el=>el.lastElementChild.textContent)`),originals);
  console.log('Reduced motion: immediate correct spelling, no automatic scramble.');
} finally {socket?.close();browser.kill();}
