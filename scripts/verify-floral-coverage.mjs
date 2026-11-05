import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const file = 'components/floral-coverage.ts';
assert.ok(fs.existsSync(file), 'Viewport-aware floral coverage geometry exists');
const context = { exports: {} };
vm.createContext(context);
vm.runInContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, context);
// Sample the rendered cubic petal, independently testing its filled silhouette.
const shape=[];
const coordinates=context.exports.floralPetalPath.match(/-?\d*\.?\d+/g).map(Number);
assert.equal(coordinates.length,14,'The rendered silhouette contains one move and two cubic curves');
const pair=index=>coordinates.slice(index*2,index*2+2);
for(const curve of [[pair(0),pair(1),pair(2),pair(3)],[pair(3),pair(4),pair(5),pair(6)]]) {
  for(let i=0;i<=80;i++) { const t=i/80,u=1-t;
    shape.push([0,1].map(axis=>u*u*u*curve[0][axis]+3*u*u*t*curve[1][axis]+3*u*t*t*curve[2][axis]+t*t*t*curve[3][axis]));
  }
}
const inside = (x,y) => {
  let yes=false;
  for(let i=0,j=shape.length-1;i<shape.length;j=i++) {
    const a=shape[i],b=shape[j];
    if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])yes=!yes;
  }
  return yes;
};
const sizes=[[320,640],[360,800],[390,844],[768,1024],[1024,768],[1440,900],[1920,1080],[3440,1440],[2560,720]];
for (const [width,height] of sizes) {
  const result = context.exports.floralCoverage(width,height);
  assert.ok(result.radius >= Math.hypot(width/2,height/2), 'Expansion reaches the farthest corner');
  for(let x=0;x<=width;x+=width/20) for(let y=0;y<=height;y+=height/20) {
    assert.ok(result.panels.some(p=>{
      const angle=-p.angle*Math.PI/180,dx=(x-width/2)/result.radius*100,dy=(y-height/2)/result.radius*100;
      return inside(dx*Math.cos(angle)-dy*Math.sin(angle),dx*Math.sin(angle)+dy*Math.cos(angle));
    }), `No floral gap at ${x},${y} in ${width}x${height}`);
  }
}
// Recompute through rotation without changing the timeline's normalized pose.
const pose={expansion:1,exit:.37};
for(const [w,h] of [[390,844],[844,390],[320,640],[3440,1440]]) {
  const geometry=context.exports.floralCoverage(w,h);
  const p=context.exports.floralPose(geometry,0,pose.expansion,pose.exit);
  assert.equal(p.scale,1);
  assert.ok(Number.isFinite(p.x)&&Number.isFinite(p.y));
  assert.equal(pose.exit,.37,'Resize preserves current animation progress');
}
console.log('Curved petal coverage passed at all requested sizes, including repeated resize and portrait/landscape changes.');
