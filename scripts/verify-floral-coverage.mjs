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
const inside = (p, a, b, c) => {
  const cross = (p, a, b) => (p[0]-b[0])*(a[1]-b[1])-(a[0]-b[0])*(p[1]-b[1]);
  const values = [cross(p,a,b),cross(p,b,c),cross(p,c,a)];
  return values.every(v=>v>=-1e-6)||values.every(v=>v<=1e-6);
};
for (const [width,height] of [[390,844],[768,1024],[1440,900],[1920,1080],[3440,1440],[2560,720]]) {
  const result = context.exports.floralCoverage(width,height);
  assert.ok(result.radius >= Math.hypot(width/2,height/2), 'Expansion reaches the farthest corner');
  for(let x=0;x<=width;x+=width/20) for(let y=0;y<=height;y+=height/20) {
    assert.ok(result.panels.some(p=>inside([x,y],[width/2,height/2],p.start,p.end)), `No floral gap at ${x},${y} in ${width}x${height}`);
  }
}
console.log('Floral coverage checks passed: corners and viewport grid covered at mobile, tablet, desktop, and ultrawide sizes.');
