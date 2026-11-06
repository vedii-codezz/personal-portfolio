import test from 'node:test';
import assert from 'node:assert/strict';
import { cylinderPosition, snapTarget, wrapIndex } from '../components/carousel-geometry.ts';

test('rotation wraps in both directions without losing the four-project order', () => {
  assert.equal(wrapIndex(-1, 4), 3);
  assert.equal(wrapIndex(5, 4), 1);
});
test('front card is centered and neighbors occupy a curved depth plane', () => {
  const front = cylinderPosition(0, 0, 4, 360, 25);
  const right = cylinderPosition(1, 0, 4, 360, 25);
  const left = cylinderPosition(3, 0, 4, 360, 25);
  assert.equal(front.x, 0);
  assert.equal(front.z, 0);
  assert.ok(right.x > 300 && right.z < -100 && right.angle > 0);
  assert.ok(left.x < -300 && left.z < -100 && left.angle < 0);
});
test('release momentum is bounded to one extra project and snaps to whole cards', () => {
  assert.equal(snapTarget(.3, 0, .6), 0);
  assert.equal(snapTarget(.7, 0, .6), 1);
  assert.equal(snapTarget(.3, 10, .6), 1);
  assert.equal(snapTarget(-.3, -10, .6), -1);
});
