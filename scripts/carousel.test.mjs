import test from 'node:test';
import assert from 'node:assert/strict';
import { ringRadius, bendTiles, advanceRing, releaseTarget, nearestProject, wrapIndex, angularFocus } from '../components/carousel-geometry.ts';

test('angular focus is crisp at the camera and progressively softens with wrapped distance',()=>{
 assert.deepEqual(angularFocus(0), { blur:0, opacity:1 });
 assert.deepEqual(angularFocus(360), angularFocus(0));
 assert.deepEqual(angularFocus(-72), angularFocus(72));
 assert.ok(angularFocus(30).blur < angularFocus(72).blur);
 assert.ok(angularFocus(72).blur < angularFocus(144).blur);
 assert.ok(angularFocus(72).opacity > angularFocus(144).opacity);
 assert.ok(angularFocus(72,true).blur < angularFocus(72).blur);
 assert.ok(angularFocus(72,true).opacity > angularFocus(72).opacity);
});

test('five projects loop in both directions across repeated revolutions',()=>{
 for(let turn=-20;turn<=20;turn++) for(let index=0;index<5;index++) {
  assert.equal(nearestProject(-72*index+turn*360,5),index);
 }
 assert.ok(ringRadius(5,270,58)>ringRadius(5,270,25));
});

test('four curved cards use a complete 90-degree ring and arc-based radius',()=>{
 assert.ok(Math.abs(ringRadius(4,270,25,1)-187.8028)<.001);
 assert.equal(nearestProject(-90,4),1);
 assert.equal(nearestProject(-360,4),0);
 assert.equal(nearestProject(90,4),3);
 assert.equal(wrapIndex(-1,4),3);
});
test('eight overlapping artwork strips bend with opposite edge angles and recessed corners',()=>{
 const tiles=bendTiles(270,187.8028,1);
 assert.equal(tiles.length,8);
 assert.equal(tiles[0].start,0);
 assert.equal(tiles[7].end,270);
 assert.ok(tiles[0].angle<-30&&tiles[7].angle>30);
 assert.ok(tiles[0].z<-25&&tiles[7].z<-25);
 assert.ok(tiles[0].end>tiles[1].start,'subpixel seams overlap');
 assert.equal(bendTiles(270,187.8028,0).length,1);
});
test('time-based spring reaches a snapped angle without idle drift at different refresh rates',()=>{
 for(const dt of [1/30,1/60,1/144]){
  let state={angle:0,velocity:-120,target:-90};
  for(let time=0;time<3;time+=dt)state={...advanceRing(state,dt),target:-90};
  assert.ok(Math.abs(state.angle+90)<.01);
  assert.ok(Math.abs(state.velocity)<.03);
 }
 const idle=advanceRing({angle:-90,velocity:0,target:-90},1/60);
 assert.equal(idle.angle,-90);assert.equal(idle.velocity,0);
});
test('release projection preserves momentum and snaps in the throw direction',()=>{
 assert.equal(releaseTarget(-35,0,90,.6),0);
 assert.equal(releaseTarget(-35,-120,90,.6),-90);
 assert.equal(releaseTarget(35,120,90,.6),90);
 assert.equal(releaseTarget(-25,-120,90,0),0);
});
