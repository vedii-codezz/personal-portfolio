import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const callbacks=new Map(), visualCallbacks=new Map(), frames=new Map();
let id=0, observerCallback, disconnected=false;
const visual={width:375,height:720,scale:1,offsetLeft:0,offsetTop:0,
  addEventListener:(name,fn)=>visualCallbacks.set(name,fn),removeEventListener:name=>visualCallbacks.delete(name)};
const source={innerWidth:390,innerHeight:844,visualViewport:visual,document:{documentElement:{}},
  addEventListener:(name,fn)=>callbacks.set(name,fn),removeEventListener:name=>callbacks.delete(name),
  requestAnimationFrame:fn=>{frames.set(++id,fn);return id;},cancelAnimationFrame:key=>frames.delete(key)};
const context={exports:{},ResizeObserver:class{constructor(fn){observerCallback=fn;}observe(){}disconnect(){disconnected=true;}}};
vm.createContext(context);vm.runInContext(ts.transpileModule(fs.readFileSync('components/loader-viewport.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,context);
const updates=[];
const stop=context.exports.observeLoaderViewport(source,v=>updates.push({...v}));
assert.deepEqual(updates[0],{width:390,height:720,left:0,top:0},'Visible mobile height and reserved scrollbar gutter');
source.innerWidth=844; source.innerHeight=390; visual.width=844; visual.height=390;
callbacks.get('resize')();visualCallbacks.get('resize')();observerCallback();
assert.equal(frames.size,1,'Resize sources are coalesced into one measurement');
for(const [key,fn] of frames){frames.delete(key);fn();}
assert.deepEqual(updates[1],{width:844,height:390,left:0,top:0},'Rotation updates the same subscription');
visual.scale=2;visual.width=422;visual.height=195;visual.offsetLeft=90;visual.offsetTop=40;
visualCallbacks.get('scroll')();for(const [key,fn] of frames){frames.delete(key);fn();}
assert.deepEqual(updates[2],{width:422,height:195,left:90,top:40},'Pinch viewport follows its visible bounds');
callbacks.get('resize')();stop();
assert.equal(frames.size,0);assert.equal(callbacks.size,0);assert.equal(visualCallbacks.size,0);assert.equal(disconnected,true);
observerCallback();assert.equal(frames.size,0,'Observer cannot schedule after cleanup');
const fallback=context.exports.readLoaderViewport({...source,visualViewport:null});
assert.equal(fallback.width,844);assert.equal(fallback.height,390);
console.log('Viewport checks passed: visual viewport, rotation, zoom offsets, rAF coalescing, fallback and complete cleanup.');
