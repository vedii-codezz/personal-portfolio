import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { projects } from '../data/projects.ts';
const browser=spawn(`${process.env.LOCALAPPDATA}/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-win64/chrome-headless-shell.exe`,['--remote-debugging-port=9340','--no-sandbox','--disable-gpu','about:blank'],{windowsHide:true,stdio:'ignore'});
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const step=360/projects.length;
let socket;
try {
 let tabs;for(let i=0;i<50;i++){try{tabs=await(await fetch('http://127.0.0.1:9340/json')).json();break;}catch{await delay(100);}}
 assert.ok(tabs);socket=new WebSocket(tabs[0].webSocketDebuggerUrl);await new Promise(resolve=>socket.addEventListener('open',resolve,{once:true}));
 let serial=0;const pending=new Map(),errors=[];
 socket.addEventListener('message',event=>{const message=JSON.parse(event.data);if(message.method==='Runtime.exceptionThrown')errors.push(message.params.exceptionDetails);if(message.id){const request=pending.get(message.id);pending.delete(message.id);if(message.error)request.reject(Error(JSON.stringify(message.error)));else request.resolve(message.result);}});
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
 const until=async expression=>{for(let i=0;i<100;i++){if(await evaluate(expression))return;await delay(100);}throw Error(`Timed out: ${expression}; ${JSON.stringify(await evaluate(`({motion:document.querySelector('.circular-carousel')?.dataset.motion,reduced:document.querySelector('.circular-carousel')?.dataset.reducedMotion,hidden:document.hidden,y:scrollY,angle:document.querySelector('.carousel-cylinder')?.style.transform})`))}`);};
 const click=async selector=>{const p=await evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(selector)}),r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);await send('Input.dispatchMouseEvent',{type:'mousePressed',...p,button:'left',clickCount:1});await send('Input.dispatchMouseEvent',{type:'mouseReleased',...p,button:'left',clickCount:1});};
 const idle=()=>until(`document.querySelector('.circular-carousel').dataset.motion==='idle'`);
 await send('Page.enable');await send('Runtime.enable');
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
 await send('Page.navigate',{url:'http://127.0.0.1:3001/'});await until(`document.documentElement?.dataset.lotusLoading==='complete'&&document.querySelector('.circular-carousel')?.dataset.ringReady==='true'`);
 const output=process.argv.includes('--luma')?'docs/luma-verification':'docs/ring-carousel-verification';
 await fs.mkdir(output,{recursive:true});
 if(process.argv.includes('--reference')){
  await send('Page.navigate',{url:'https://reactbits.dev/components/circular-carousel'});await delay(6000);
  console.log(await evaluate(`({title:document.title,text:document.body.innerText.slice(0,1000)})`));
  const shot=await send('Page.captureScreenshot',{format:'png'});await fs.writeFile('docs/ring-carousel-verification/official-reference.png',Buffer.from(shot.data,'base64'));
 } else {
 await evaluate(`document.querySelector('#work').scrollIntoView({block:'start',behavior:'instant'})`);await delay(80);
 const rising=await evaluate(`document.querySelector('.carousel-card').style.transform`);
 assert.ok(/translateY\((?!0px)[\d.]+px\)/.test(rising),'A visible rise entrance is playing');
 const entrance=await send('Page.captureScreenshot',{format:'png'});await fs.writeFile(`${output}/entrance.png`,Buffer.from(entrance.data,'base64'));await idle();
 assert.equal(await evaluate(`document.querySelectorAll('.carousel-art-tile:not([data-back])').length`),projects.length*8);
 assert.equal(await evaluate(`document.querySelectorAll('.circular-carousel a').length`),projects.length*2,'Exactly one pair of live links per project');
 assert.equal(await evaluate(`document.querySelectorAll('.circular-carousel h3').length`),projects.length,'Titles are not duplicated into strips');
 assert.equal(await evaluate(`document.querySelectorAll('.carousel-tiled-surface a,.carousel-tiled-surface h3,.circular-carousel canvas').length`),0);
 assert.deepEqual(await evaluate(`[...document.querySelectorAll('.carousel-card')].map(card=>[...card.querySelectorAll('a')].map(a=>a.href))`),projects.map(p=>[p.live,p.github]));
 const bends=await evaluate(`[...document.querySelectorAll('.carousel-card:first-child .carousel-art-tile:not([data-back])')].map(e=>e.style.transform)`);
 assert.ok(bends[0].includes('rotateY(-')&&!bends[7].includes('rotateY(-'));
 assert.ok(await evaluate(`document.querySelector('.carousel-camera').style.transform.includes('translate3d')&&document.querySelector('.carousel-cylinder').style.transform.includes('rotateY')`));
 console.log('PASS rise entrance, real ring/camera, eight-strip curvature, unique titles/links and preserved destinations');
 await click('[aria-label="Next project"]');await delay(100);
 const interrupt=await evaluate(`(()=>{const r=document.querySelector('.carousel-stage').getBoundingClientRect();return {x:r.x+10,y:r.y+10}})()`);
 await send('Input.dispatchMouseEvent',{type:'mousePressed',...interrupt,button:'left',clickCount:1});
 await send('Input.dispatchMouseEvent',{type:'mouseReleased',...interrupt,button:'left',clickCount:1});await delay(1700);await idle();
 assert.equal(await evaluate(`document.querySelector('.carousel-cylinder').style.transform`),`rotateY(${-step}deg)`,'A stationary press during a spring does not cancel snapping');
 await click('[aria-label="Show Finora"]');await idle();
 await click('[aria-label="Next project"]');await delay(100);
 await send('Input.dispatchMouseEvent',{type:'mousePressed',...interrupt,button:'left',clickCount:1});
 await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:interrupt.x,y:interrupt.y+30,buttons:1});
 await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:interrupt.x,y:interrupt.y+30,button:'left',clickCount:1});await delay(1700);await idle();
 assert.equal(await evaluate(`document.querySelector('.carousel-cylinder').style.transform`),`rotateY(${-step}deg)`,'A vertical gesture during a spring does not cancel snapping');
 await click('[aria-label="Show Finora"]');await idle();
 console.log('PASS stationary press and vertical-gesture interruption preserve snapping');
 await click('[aria-label="Next project"]');await idle();assert.equal(await evaluate(`document.querySelector('[data-active="true"] h3').textContent`),'VEYRA');
 await click('[aria-label="Show Finora"]');await idle();
 const neighbor=await evaluate(`(()=>{const tiles=[...document.querySelectorAll('.carousel-card:not([data-active="true"]) .carousel-art-tile:not([data-back])')];for(const tile of tiles){const r=tile.getBoundingClientRect();const x=r.x+r.width/2,y=r.y+r.height*.25;const hit=document.elementFromPoint(x,y),card=hit?.closest('.carousel-card');if(card&&card.dataset.active==='false'&&hit.closest('[data-art-tile]'))return {x,y,id:card.dataset.project};}return null})()`);
 assert.ok(neighbor,'A neighboring curved card has a visible pointer target');
 await send('Input.dispatchMouseEvent',{type:'mousePressed',x:neighbor.x,y:neighbor.y,button:'left',clickCount:1});await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:neighbor.x,y:neighbor.y,button:'left',clickCount:1});await idle();
 assert.equal(await evaluate(`document.querySelector('[data-active="true"]').dataset.project`),neighbor.id,'Clicking the actual curved neighbor focuses it');
 const before=await evaluate(`({rotation:document.querySelector('.carousel-cylinder').style.transform,y:scrollY})`);
 const wheel=await evaluate(`(()=>{const r=document.querySelector('.carousel-stage').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+100}})()`);
 await send('Input.dispatchMouseEvent',{type:'mouseWheel',...wheel,deltaX:90,deltaY:0});await delay(200);await idle();
 assert.notEqual(await evaluate(`document.querySelector('.carousel-cylinder').style.transform`),before.rotation);assert.equal(await evaluate('scrollY'),before.y);
 console.log('PASS physical control clicks, curved-neighbor click-to-focus and horizontal trackpad input');
 await click('[aria-label="Show Finora"]');await idle();
 await evaluate(`window.scrollTo({top:0,behavior:'instant'})`);await until(`document.querySelector('.circular-carousel').dataset.motion==='paused'`);
 const stopped=await evaluate(`document.querySelector('.carousel-cylinder').style.transform`);
 await evaluate(`document.querySelector('[aria-label="Next project"]').click()`);await delay(250);assert.equal(await evaluate(`document.querySelector('.carousel-cylinder').style.transform`),stopped,'Offscreen ring does not run animation frames');
 await evaluate(`document.querySelector('#work').scrollIntoView({block:'start',behavior:'instant'})`);await idle();assert.notEqual(await evaluate(`document.querySelector('.carousel-cylinder').style.transform`),stopped);
 console.log('PASS offscreen pause and resume');
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await delay(100);
 for(const project of projects){await click(`[aria-label="Show ${project.name}"]`);await delay(50);assert.equal(await evaluate(`document.querySelector('[data-active="true"]').dataset.project`),project.slug);assert.equal(await evaluate(`document.querySelector('.carousel-camera').style.transform`),'none');assert.equal(await evaluate(`document.querySelectorAll('.carousel-live:not([inert])').length`),1);}
 assert.deepEqual(errors,[],'No runtime exceptions');console.log(`PASS reduced-motion navigation to all ${projects.length} projects and one focusable live card`);
 if(process.argv.includes('--luma')){
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await until(`document.querySelector('.circular-carousel').dataset.reducedMotion==='false'`);
  await delay(100);
  await evaluate(`document.querySelector('#work').scrollIntoView({block:'start',behavior:'instant'})`);
  await click('[aria-label="Show Finora"]');await idle();
  for(let index=1;index<=projects.length;index++){
   await click('[aria-label="Next project"]');await idle();
   assert.equal(await evaluate(`document.querySelector('[data-active="true"]').dataset.project`),projects[index%projects.length].slug);
  }
  await click('[aria-label="Previous project"]');await idle();
  assert.equal(await evaluate(`document.querySelector('[data-active="true"]').dataset.project`),'luma','Reverse wrap reaches LUMA');
  assert.equal(await evaluate(`document.querySelector('.work-count').textContent.trim()`),'05 / PROJECTS');
  assert.deepEqual(await evaluate(`[...document.querySelector('[data-active="true"] .carousel-links').children].map(a=>a.href)`),['https://luma-rust-beta.vercel.app/','https://github.com/vedii-codezz/luma']);
  for(const theme of ['light','dark']){
   await evaluate(`document.documentElement.dataset.theme='${theme}'`);await delay(600);
   const shot=await send('Page.captureScreenshot',{format:'png'});await fs.writeFile(`${output}/LUMA-${theme}.png`,Buffer.from(shot.data,'base64'));
  }
  for(const index of [0,1]){
   const beforeTargets=(await send('Target.getTargets')).targetInfos.map(t=>t.targetId);
   await click(`.carousel-card[data-active="true"] .carousel-links a:nth-child(${index+1})`);await delay(400);
   const targets=(await send('Target.getTargets')).targetInfos.filter(t=>!beforeTargets.includes(t.targetId));
   assert.ok(targets.length,'LUMA link opens a real new tab');
   assert.equal(await evaluate(`document.querySelector('[data-active="true"]').dataset.project`),'luma','LUMA links do not rotate the ring');
   for(const target of targets)await send('Target.closeTarget',{targetId:target.targetId});
  }
  console.log('PASS five 72-degree positions, LUMA/Finora forward and reverse wraps, count05, real LUMA Demo/Source clicks, both-theme captures');
 }
 }
} finally {socket?.close();browser.kill();}
