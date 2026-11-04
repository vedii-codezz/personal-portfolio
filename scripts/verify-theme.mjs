import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

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
assert.throws(() => env.api.select('system'), /light or dark/, 'Only two explicit theme choices');
env.media.matches = true; env.events.get('os')(); assert.equal(env.api.snapshot(), 'dark:dark');
cleanup(); assert.equal(env.events.size, 0, 'All listeners cleaned up');
const blocked = environment(null, false, true); vm.runInContext(init, blocked.context); blocked.api.subscribe(() => {}); blocked.api.select('dark');
assert.equal(blocked.api.snapshot(), 'dark:dark', 'Manual choice works with blocked storage');
const require = createRequire(import.meta.url);
const server = { exports: {}, require: name => name.endsWith('.css') ? {} : require(name) };
vm.createContext(server); vm.runInContext(code, server);
const markup = renderToStaticMarkup(React.createElement(server.exports.ThemeControl));
assert.equal((markup.match(/<button/g) ?? []).length, 1, 'Only one interactive pill is rendered');
assert.ok(markup.includes('role="switch"') && markup.includes('aria-checked="false"'), 'Accessible two-state switch renders without browser globals');
assert.ok(!markup.includes('<details') && !markup.includes('<summary'), 'No dropdown remains');
assert.ok((markup.match(/class="theme-lotus-petal"/g) ?? []).length > 1, 'Lotus petals can transform individually');
console.log('Theme checks passed: pre-paint, OS fallback/change, two explicit choices, manual override, persistence, blocked storage, cleanup.');
