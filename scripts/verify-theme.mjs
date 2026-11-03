import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';

const source = fs.readFileSync('components/ThemeControl.tsx', 'utf8');
const code = ts.transpileModule(`${source}\nexport {select, subscribe, snapshot};`, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
function environment(saved, osDark, blocked = false) {
  const events = new Map();
  const media = { matches: osDark, addEventListener: (_, fn) => events.set('os', fn), removeEventListener: () => events.delete('os') };
  const context = { exports: {}, require: () => ({}), document: { documentElement: { dataset: {} } }, matchMedia: () => media,
    localStorage: { getItem: () => { if (blocked) throw Error('blocked'); return saved; }, setItem: (_, value) => { if (blocked) throw Error('blocked'); saved = value; } },
    Event: class { constructor(type) { this.type = type; } },
    window: { addEventListener: (name, fn) => events.set(name, fn), removeEventListener: name => events.delete(name), dispatchEvent: event => events.get(event.type)?.() } };
  vm.createContext(context); vm.runInContext(code, context);
  return { api: context.exports, context, media, events, saved: () => saved };
}
const layout = fs.readFileSync('app/layout.tsx', 'utf8');
const init = layout.match(/__html: `([^`]+)`/)[1];
for (const [saved, osDark, expected] of [[null, false, 'light'], [null, true, 'dark'], ['light', true, 'light'], ['dark', false, 'dark'], ['invalid', true, 'dark']]) {
  const env = environment(saved, osDark); vm.runInContext(init, env.context);
  assert.equal(env.context.document.documentElement.dataset.theme, expected, 'Pre-paint preference');
}
const env = environment(null, true);
const cleanup = env.api.subscribe(() => {});
assert.equal(env.api.snapshot(), 'system:dark');
env.media.matches = false; env.events.get('os')();
assert.equal(env.api.snapshot(), 'system:light');
env.api.select('dark'); assert.equal(env.saved(), 'dark');
env.media.matches = true; env.events.get('os')();
env.media.matches = false; env.events.get('os')();
assert.equal(env.api.snapshot(), 'dark:dark', 'Manual choice overrides OS');
const reload = environment(env.saved(), false); reload.api.subscribe(() => {});
assert.equal(reload.api.snapshot(), 'dark:dark', 'Manual selection survives reload');
env.api.select('system'); assert.equal(env.api.snapshot(), 'system:light');
env.media.matches = true; env.events.get('os')(); assert.equal(env.api.snapshot(), 'system:dark');
cleanup(); assert.equal(env.events.size, 0, 'All listeners cleaned up');
const blocked = environment(null, false, true); vm.runInContext(init, blocked.context); blocked.api.subscribe(() => {}); blocked.api.select('dark');
assert.equal(blocked.api.snapshot(), 'dark:dark', 'Manual choice works with blocked storage');
console.log('Theme checks passed: pre-paint, OS detection/change, manual override, persistence, System restoration, blocked storage, cleanup.');
