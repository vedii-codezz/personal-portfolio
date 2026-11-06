import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { createRequire } from 'node:module';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import ts from 'typescript';

const require = createRequire(import.meta.url);
function load(file) {
  const exports = {};
  const localRequire = name => {
    if (!name.startsWith('.') && !name.startsWith('@/')) return require(name);
    const target = name.startsWith('@/') ? name.slice(2) : path.join(path.dirname(file), name);
    return load(['.ts', '.tsx'].map(extension => target + extension).find(candidate => fs.existsSync(candidate)));
  };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, { exports, require: localRequire });
  return exports;
}
const approved = [
  ['Programming Languages', ['Python', 'JavaScript', 'HTML5', 'CSS3', 'C', 'Java']],
  ['Frontend & Creative Development', ['GSAP', 'Framer Motion', 'Spline']],
  ['AI / ML & Backend', ['Generative AI', 'Gemini API', 'Multi-Agent Systems', 'NumPy', 'FastAPI']],
  ['Tools, Data & Deployment', ['Git', 'GitHub', 'VS Code', 'Vercel', 'Kaggle']],
];
const { techStack } = load('data/tech-stack.ts');
assert.deepEqual(JSON.parse(JSON.stringify(techStack.map(category => [category.title, category.technologies]))), approved);
assert.deepEqual(Array.from(techStack, category => category.number), ['01', '02', '03', '04']);
const stack = renderToStaticMarkup(createElement(load('components/TechStack.tsx').TechStack));
assert.equal((stack.match(/data-stack-badge=/g) ?? []).length, 19);
assert.equal((stack.match(/<h3 /g) ?? []).length, 4);
assert.ok(stack.includes('id="stack"') && stack.includes('id="stack-title"'));
for (const [, names] of approved) for (const name of names) assert.ok(stack.includes(`>${name}</span>`));
const contact = renderToStaticMarkup(createElement(load('components/ContactCTA.tsx').ContactCTA));
assert.ok(contact.includes('id="contact"') && contact.includes('id="contact-title"'));
assert.ok(contact.includes('href="mailto:bedantikamondal28@gmail.com"'));
for (const url of ['https://github.com/vedii-codezz', 'https://www.linkedin.com/in/bedantikamondal2007/']) {
  assert.ok(contact.includes(`href="${url}" target="_blank" rel="noopener noreferrer"`));
}
assert.equal((contact.match(/<a /g) ?? []).length, 3);
assert.equal((contact.match(/<h2 /g) ?? []).length, 1);
assert.ok(!contact.includes('<form'));
const page = fs.readFileSync('app/page.tsx', 'utf8');
assert.ok(page.indexOf('<MyStory />') < page.indexOf('<TechStack />'));
assert.ok(page.indexOf('<TechStack />') < page.indexOf('<ContactCTA />'));
assert.ok(page.indexOf('<ContactCTA />') < page.indexOf('<footer'));
for (const anchor of ['stack', 'contact']) assert.ok(page.includes(`href="#${anchor}"`));
console.log('Closing sections passed: server-rendered HTML, exact 19 technologies, four ordered categories, headings, page order, navigation anchors, and all three contact destinations.');

