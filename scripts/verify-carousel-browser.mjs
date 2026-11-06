import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const executable = `${process.env.LOCALAPPDATA}/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-win64/chrome-headless-shell.exe`;
const browser = spawn(executable, ['--remote-debugging-port=9337', '--no-sandbox', '--disable-gpu', 'about:blank'], { windowsHide:true, stdio:'ignore' });
const delay = ms => new Promise(r=>setTimeout(r,ms));
let socket;
try {
 let tabs;
 for(let i=0;i<50;i++){ try{ tabs=await (await fetch('http://127.0.0.1:9337/json')).json(); break;}catch{await delay(100);} }
 assert.ok(tabs,'Headless browser starts');
 socket=new WebSocket(tabs[0].webSocketDebuggerUrl); await new Promise(r=>socket.addEventListener('open',r,{once:true}));
 let serial=0; const pending=new Map();
 socket.addEventListener('message',event=>{const data=JSON.parse(event.data); if(data.id){const p=pending.get(data.id);pending.delete(data.id);if(data.error) p.reject(Error(JSON.stringify(data.error))); else p.resolve(data.result);}});
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++serial; pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
 await send('Page.enable'); await send('Runtime.enable');
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await send('Page.navigate',{url:'http://127.0.0.1:3001/'}); await delay(6500); console.log(await evaluate('({url:location.href,title:document.title,text:document.body.innerText.slice(0,200)})')); 
 await evaluate(`document.querySelector('#work').scrollIntoView();`); await delay(1000);
 await fs.mkdir('docs/carousel-verification',{recursive:true});
 for(const w of (process.argv.includes('--quick') ? [] : [320,390,768,1024,1440,1920])){
  await send('Emulation.setDeviceMetricsOverride',{width:w,height:1000,deviceScaleFactor:1,mobile:w<768});
  await delay(300);
  await evaluate(`document.querySelector('.carousel-stage').scrollIntoView({block:'center'})`); await delay(300);
  const result=await evaluate(`(()=>{const c=document.querySelector('[data-active="true"]');const p=c.querySelector('.carousel-editorial p'); const l=c.querySelector('.carousel-links');return {width:innerWidth,scroll:document.documentElement.scrollWidth,cards:document.querySelectorAll('.carousel-card').length,links:[...c.querySelectorAll('a')].map(a=>({href:a.href,target:a.target,rel:a.rel})),descriptionBottom:p.getBoundingClientRect().bottom,linksTop:l.getBoundingClientRect().top,cardBottom:c.getBoundingClientRect().bottom,linksBottom:l.getBoundingClientRect().bottom,transform:document.querySelectorAll('.carousel-card')[1].style.transform}})()`);
  assert.equal(result.cards,4); assert.ok(result.scroll<=result.width,`no overflow at ${w}: ${result.scroll}/${result.width}`);
  assert.ok(result.descriptionBottom<=result.linksTop+2,`copy fits at ${w}`);assert.ok(result.linksBottom<=result.cardBottom,`links fit at ${w}`);
  assert.ok(result.transform.includes('rotateY(60deg)')); assert.ok(result.links.every(a=>a.target==='_blank'&&a.rel.includes('noopener')));
  for(const name of ['VEYRA','APTLY','Nikot-e-Metro','Finora']) {
   await evaluate(`document.querySelector('[aria-label="Show ${name}"]').click()`);await delay(900);
   const fit=await evaluate(`(()=>{const c=document.querySelector('[data-active="true"]');return {p:c.querySelector('.carousel-editorial p').getBoundingClientRect().bottom,l:c.querySelector('.carousel-links').getBoundingClientRect().top,b:c.getBoundingClientRect().bottom,lb:c.querySelector('.carousel-links').getBoundingClientRect().bottom}})()`);
   assert.ok(fit.p<=fit.l+2 && fit.lb<=fit.b,`${name} content fits at ${w}: ${JSON.stringify(fit)}`);
  }
  for(const theme of ['light','dark']){
   await evaluate(`document.documentElement.dataset.theme='${theme}'`);await delay(600);
   const shot=await send('Page.captureScreenshot',{format:'png'});await fs.writeFile(`docs/carousel-verification/${w}-${theme}.png`,Buffer.from(shot.data,'base64'));
  }
  console.log(`PASS ${w}px: four cards, 3D depth, copy/link fit, no page overflow, light/dark screenshots`);
 }
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await delay(200);
 const active=()=>evaluate(`document.querySelector('[data-active="true"] h3').textContent`);
 await evaluate(`document.querySelector('.carousel-stage').scrollIntoView({block:'center'})`);await delay(500);
 const edge=await evaluate(`(()=>{const r=document.querySelector('.carousel-stage').getBoundingClientRect();return {x:r.x+1,y:r.y+100,center:r.x+r.width/2}})()`);
 await send('Input.dispatchMouseEvent',{type:'mousePressed',x:edge.x,y:edge.y,button:'left',clickCount:1});
 await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:edge.x-3,y:edge.y,buttons:1});
 await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:edge.x-3,y:edge.y,button:'left',clickCount:1});
 await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:edge.center,y:edge.y,buttons:0});await delay(100);
 assert.equal(await evaluate(`document.querySelector('[data-active="true"]').style.transform`),'translate3d(0px, 0px, 0px) rotateY(0deg)','Release outside before drag threshold must not leave a pending gesture');
 console.log('PASS release outside before drag threshold');
 await evaluate(`document.querySelector('[aria-label="Next project"]').click()`);await delay(1000);assert.equal(await active(),'VEYRA');
 await evaluate(`document.querySelector('[aria-label="Previous project"]').click()`);await delay(1000);assert.equal(await active(),'Finora');
 await evaluate(`document.querySelector('.carousel-stage').focus()`);
 await send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39});await delay(1000);assert.equal(await active(),'VEYRA');
 await evaluate(`document.querySelector('.carousel-preview-next').click()`);await delay(1000);assert.equal(await active(),'APTLY');
 await evaluate(`document.querySelector('[aria-label="Show Finora"]').click();document.querySelector('.carousel-stage').scrollIntoView({block:'center'})`);await delay(1000);
 const box=await evaluate(`(()=>{let r=document.querySelector('.carousel-stage').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+170}})()`);
 await send('Input.dispatchMouseEvent',{type:'mousePressed',x:box.x,y:box.y,button:'left',clickCount:1});
 for(let i=1;i<=10;i++){await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:box.x-i*30,y:box.y,button:'left',buttons:1});await delay(20);}
 await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:box.x-300,y:box.y,button:'left',clickCount:1});await delay(1200);assert.notEqual(await active(),'Finora');
 console.log('PASS previous/next, keyboard, click preview, mouse drag and snap');
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 await evaluate(`document.querySelector('[aria-label="Next project"]').click()`);await delay(100);
 assert.ok(await evaluate(`document.querySelector('[data-active="true"]').style.transform==='translate3d(0px, 0px, 0px)'`));
 console.log('PASS reduced-motion navigation');
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
 await send('Emulation.setDeviceMetricsOverride',{width:390,height:1000,deviceScaleFactor:1,mobile:true});
 await send('Emulation.setTouchEmulationEnabled',{enabled:true});
 await evaluate(`document.querySelector('[aria-label="Show Finora"]').click();document.querySelector('.carousel-stage').scrollIntoView({block:'center'})`);await delay(1000);
 const touch=await evaluate(`(()=>{let r=document.querySelector('.carousel-stage').getBoundingClientRect();return {x:r.x+r.width/2+70,y:r.y+150}})()`);
 await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:touch.x,y:touch.y}]});
 for(let i=1;i<=8;i++){await send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:touch.x-i*24,y:touch.y}]});await delay(25);}
 await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await delay(1200);assert.notEqual(await active(),'Finora');
 console.log('PASS touch swipe and snap');
 const before=await active();
 assert.equal(await evaluate(`document.querySelectorAll('.carousel-card:not([inert])').length`),1,'Only active slide is in keyboard/accessibility navigation');
 for (const linkIndex of [0,1]) {
 const link=await evaluate(`(()=>{const a=document.querySelectorAll('[data-active="true"] a')[${linkIndex}];let r=a.getBoundingClientRect();return {x:r.x+15,y:r.y+15,href:a.href}})()`);
 const originalTargets=(await send('Target.getTargets')).targetInfos;
 await send('Input.dispatchMouseEvent',{type:'mousePressed',x:link.x,y:link.y,button:'left',clickCount:1});
 await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:link.x,y:link.y,button:'left',clickCount:1});await delay(500);
 const added=(await send('Target.getTargets')).targetInfos.filter(t=>!originalTargets.some(o=>o.targetId===t.targetId));
 assert.ok(added.length>0,'Project link opens a new tab');assert.equal(await active(),before,'Link click leaves cylinder position unchanged');
 for(const t of added)await send('Target.closeTarget',{targetId:t.targetId});
 }
 console.log('PASS real Live Demo and Source clicks open tabs without rotating; inactive cards are inert');
} finally {socket?.close();browser.kill();}
