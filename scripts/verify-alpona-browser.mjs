import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

const browser = spawn('C:/Users/monda/AppData/Local/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-win64/chrome-headless-shell.exe', ['--remote-debugging-port=9341', '--no-sandbox', '--disable-gpu', 'about:blank'], { windowsHide:true, stdio:'ignore' });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let socket;
try {
  let tabs;
  for (let i=0;i<50;i++) { try { tabs=await (await fetch('http://127.0.0.1:9341/json')).json(); break; } catch { await delay(100); } }
  assert.ok(tabs, 'Browser starts');
  socket=new WebSocket(tabs[0].webSocketDebuggerUrl);
  await new Promise(resolve => socket.addEventListener('open',resolve,{once:true}));
  let serial=0; const pending=new Map();
  socket.addEventListener('message', event => { const data=JSON.parse(event.data); if(data.id) { const p=pending.get(data.id); pending.delete(data.id); if(data.error)p.reject(Error(JSON.stringify(data.error))); else p.resolve(data.result); } });
  const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});
  const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1100,deviceScaleFactor:1,mobile:false});
  await send('Page.navigate',{url:'http://127.0.0.1:3002/'});
  for(let i=0;i<200;i++){if(await evaluate(`document.documentElement?.dataset.lotusLoading==='complete' && !!document.querySelector('.toolkit-alpona')`))break;await delay(150);}
  assert.ok(await evaluate(`!!document.querySelector('#stack')`), 'Toolkit loads');
  await evaluate(`document.fonts.ready`);
  await evaluate(`document.querySelector('#stack').scrollIntoView({block:'center',behavior:'instant'})`);
  await delay(500);
  const pointer=await evaluate(`(()=>{const r=document.querySelector('.flip-card').getBoundingClientRect();return {x:r.x+r.width*.7,y:r.y+r.height*.4}})()`);
  await send('Input.dispatchMouseEvent',{type:'mouseMoved',...pointer});
  await delay(250);
  assert.ok(await evaluate(`document.querySelector('.flip-card-tilt').style.transform.includes('rotateX')`),'Pointer tilt responds');
  assert.ok(await evaluate(`Number(getComputedStyle(document.querySelector('.flip-card-glare')).opacity)>0`),'Glare responds');
  await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:0,y:0});
  await delay(250);
  const directory='docs/alpona-verification'; await fs.mkdir(directory,{recursive:true});
  for(const theme of ['light','dark']) {
    await evaluate(`document.documentElement.dataset.theme='${theme}'; document.querySelector('#stack').scrollIntoView({block:'center',behavior:'instant'})`);
    await delay(500);
    for(const face of ['front','back']) {
      await evaluate(`[...document.querySelectorAll('.flip-card')].forEach(c=>{if(c.dataset.flipped!== '${face==='back'}')c.querySelector('button').click()})`);
      await delay(1200);
      assert.equal(await evaluate(`[...document.querySelectorAll('.flip-card')].filter(c=>c.dataset.flipped==='${face==='back'}').length`),4);
      assert.ok(await evaluate(`[...document.querySelectorAll('.toolkit-alpona')].every(s=>s.getAttribute('aria-hidden')==='true'&&getComputedStyle(s).pointerEvents==='none')`));
      for(let i=0;i<4;i++) {
        const clip=await evaluate(`(()=>{const r=document.querySelectorAll('.flip-card')[${i}].getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height,scale:1}})()`);
        const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip});
        await fs.writeFile(`${directory}/${theme}-${face}-${i+1}.png`,Buffer.from(shot.data,'base64'));
      }
    }
  }
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  assert.ok(await evaluate(`document.documentElement.scrollWidth<=390`),'No mobile horizontal overflow');
  console.log('Verified four front/back cards in both themes; saved 16 screenshots; SVG accessibility and pointer transparency pass; mobile has no horizontal overflow.');
} finally { socket?.close(); browser.kill(); }
