import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { projects } from '../data/projects.ts';
const baseline=process.argv.includes('--baseline');
const browser=spawn(`${process.env.LOCALAPPDATA}/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-win64/chrome-headless-shell.exe`,['--remote-debugging-port=9339','--no-sandbox','--disable-gpu','about:blank'],{windowsHide:true,stdio:'ignore'});
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let socket;
try {
 let tabs;for(let i=0;i<50;i++){try{tabs=await(await fetch('http://127.0.0.1:9339/json')).json();break;}catch{await delay(100);}}
 assert.ok(tabs,'Chromium starts');socket=new WebSocket(tabs[0].webSocketDebuggerUrl);await new Promise(resolve=>socket.addEventListener('open',resolve,{once:true}));
 let serial=0;const pending=new Map();const errors=[];
 socket.addEventListener('message',event=>{const data=JSON.parse(event.data);if(data.method==='Runtime.exceptionThrown')errors.push(data.params.exceptionDetails);if(data.id){const request=pending.get(data.id);pending.delete(data.id);if(data.error)request.reject(Error(JSON.stringify(data.error)));else request.resolve(data.result);}});
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>{const result=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw Error(JSON.stringify(result.exceptionDetails));return result.result.value;};
 const until=async expression=>{for(let i=0;i<100;i++){if(await evaluate(expression))return;await delay(100);}throw Error(`Timed out: ${expression}`);};
 await send('Page.enable');await send('Runtime.enable');
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
 await send('Page.navigate',{url:'http://127.0.0.1:3001/'});await until(`document.documentElement?.dataset.lotusLoading==='complete'&&!!document.querySelector('.carousel-card')`);
 const folder=`docs/${process.argv.includes('--luma')?'luma-verification':process.argv.includes('--ring')?'ring-carousel-verification':'compact-carousel-verification'}/${baseline?'before':'after'}`;await fs.mkdir(folder,{recursive:true});
 const results=[];
 for(const [width,height] of (process.argv.includes('--scroll-only')?[]:[[320,640],[390,844],[768,1024],[1366,768],[1440,900],[1920,1080]])){
  await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<768});await delay(150);
  await evaluate(`document.querySelector('#work').scrollIntoView({block:'start',behavior:'instant'})`);await delay(1000);
  const dimensions=await evaluate(`(()=>{const card=document.querySelector('[data-active="true"]'),s=document.querySelector('.carousel-stage'),head=document.querySelector('.work-heading'),eye=document.querySelector('#work .section-eyebrow'),controls=document.querySelector('.carousel-controls');const rect=e=>{const r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom,width:r.width,height:r.height}};return {card:rect(card),stage:rect(s),heading:rect(head),eyebrow:rect(eye),controls:rect(controls),pageWidth:document.documentElement.scrollWidth,viewport:innerWidth,side:document.querySelectorAll('.carousel-card')[1].style.transform}})()`);
  results.push({width,height,...dimensions});
  for(const theme of ['light','dark']){
   await evaluate(`document.documentElement.dataset.theme='${theme}'`);await delay(600);
   const shot=await send('Page.captureScreenshot',{format:'png'});await fs.writeFile(`${folder}/${width}x${height}-${theme}.png`,Buffer.from(shot.data,'base64'));
  }
  if(baseline){console.log(`BASELINE ${width}x${height}: card ${dimensions.card.width}x${dimensions.card.height}, stage ${dimensions.stage.height}, controls bottom ${Math.round(dimensions.controls.bottom)}`);continue;}
  assert.ok(dimensions.card.width<=280&&dimensions.card.height<=450,'Cards use compact actual dimensions');
  assert.ok(dimensions.pageWidth<=dimensions.viewport,'No horizontal page overflow');
  assert.ok(dimensions.side.includes(`rotateY(${360/projects.length}deg)`)&&dimensions.side.includes('translateZ('),'Neighbors retain complete ring placement');
  if(width===1440){assert.ok(dimensions.eyebrow.top>=0&&dimensions.controls.bottom<=height,'Eyebrow, heading, whole card, and controls fit together at 1440x900');}
  if(width===1366){assert.ok(dimensions.heading.top>=0&&dimensions.card.bottom<height+40,'Heading and most of carousel fit a 1366x768 laptop');}
  for(const name of projects.map(project=>project.name)){
   await evaluate(`document.querySelector('[aria-label="Show ${name}"]').click()`);await delay(1000);
   const fit=await evaluate(`(()=>{const c=document.querySelector('[data-active="true"]'),art=c.querySelector('.project-visual'),p=c.querySelector('.carousel-editorial p'),h=c.querySelector('h3'),links=c.querySelector('.carousel-links');const b=c.getBoundingClientRect(),l=links.getBoundingClientRect(),d=p.getBoundingClientRect(),t=h.getBoundingClientRect();const content=art.querySelector('.project-pointer').firstElementChild;const keyArt=content.children[1];return {copyFits:d.bottom<=l.top+1&&t.bottom<=d.top+1&&l.bottom<=b.bottom,titleFits:h.scrollWidth<=h.clientWidth,artFits:keyArt.offsetTop>=0&&keyArt.offsetTop+keyArt.offsetHeight<=art.clientHeight+1,artHeight:art.clientHeight,cardHeight:c.clientHeight,linkRects:[...links.querySelectorAll('a')].map(a=>{const r=a.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2,href:a.href}})}})()`);
   assert.ok(fit.copyFits,`${name} description and links fit at ${width}`);assert.ok(fit.titleFits,`${name} title fits at ${width}`);assert.ok(fit.artFits,`${name} key artwork fits at ${width}`);
   assert.ok(fit.artHeight/fit.cardHeight>=.49&&fit.artHeight/fit.cardHeight<=.53,'Artwork occupies approximately half the card');
   if(width===1440){const shot=await send('Page.captureScreenshot',{format:'png'});await fs.writeFile(`${folder}/${name}-artwork.png`,Buffer.from(shot.data,'base64'));}
  }
  await evaluate(`document.querySelector('[aria-label="Show Finora"]').click()`);await delay(1000);
  console.log(`PASS ${width}x${height}: compact dimensions, ${projects.length} complete cards/artworks, genuine 3D, no overflow, both themes`);
 }
 if(results.length) await fs.writeFile(`${folder}/measurements.json`,JSON.stringify(results,null,2)+'\n');
 if(!baseline){
  await send('Emulation.setDeviceMetricsOverride',{width:320,height:640,deviceScaleFactor:1,mobile:true});
  await send('Emulation.setTouchEmulationEnabled',{enabled:true});
  await evaluate(`document.querySelector('[aria-label="Show Finora"]').click();document.querySelector('#work').scrollIntoView({block:'start',behavior:'instant'})`);await delay(1000);
  const initialY=await evaluate('scrollY');
  const point=await evaluate(`(()=>{const r=document.querySelector('[data-active="true"] .project-visual').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+80}})()`);
  await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point]});
  for(let i=1;i<=8;i++){await send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:point.x,y:point.y-i*18}]});await delay(25);}
  await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await delay(500);
  assert.ok(await evaluate('scrollY')>initialY+70,'Vertical touch scrolling through the carousel stays available');
  assert.equal(await evaluate(`document.querySelector('[data-active="true"] h3').textContent`),'Finora','Vertical scrolling does not rotate the cylinder');
  const hit=await evaluate(`(()=>{const c=document.querySelector('[data-active="true"]'),r=c.getBoundingClientRect(),a=c.querySelector('a').getBoundingClientRect();return {start:r.right-12,end:a.x+a.width/2,y:a.y+a.height/2}})()`);
  const before=(await send('Target.getTargets')).targetInfos.map(t=>t.targetId);
  await send('Input.dispatchMouseEvent',{type:'mousePressed',x:hit.start,y:hit.y,button:'left',clickCount:1});
  for(let i=1;i<=8;i++){await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:hit.start+(hit.end-hit.start)*i/8,y:hit.y,buttons:1});await delay(20);}
  await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:hit.end,y:hit.y,button:'left',clickCount:1});await delay(1000);
  assert.ok((await send('Target.getTargets')).targetInfos.every(t=>before.includes(t.targetId)),'Dragging across the link row does not activate external navigation');
  console.log('PASS vertical touch scrolling and suppression of link-row drag navigation');
 }
 assert.deepEqual(errors,[],'No runtime exceptions');
} finally {socket?.close();browser.kill();}
