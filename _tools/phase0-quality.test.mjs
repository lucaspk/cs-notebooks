import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {validateChapter} from './validate-chapter.mjs';
const repo=fileURLToPath(new URL('../',import.meta.url));
test('all 24 enriched chapters have valid resources, labeled exercises and a single final answer collapse',()=>{
 let count=0;
 for(const book of ['math_disc','vv_eng','paradigms']){
  for(const slug of fs.readdirSync(path.join(repo,book,'capitulos')).filter(s=>/^\d{2}-/.test(s))){
   const dir=path.join(repo,book,'capitulos',slug);
   const html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
   assert.deepEqual(validateChapter(dir),[],book+'/'+slug);
   assert.equal((html.match(/<section\b/g)||[]).length,(html.match(/<\/section>/g)||[]).length,slug);
   assert.equal((html.match(/class="chapter-gabarito"/g)||[]).length,1,slug);
   assert.ok(!html.includes('class="model-answer"'),slug);
   assert.match(html,/data-practice-field="design-transfer"/);
   // Literal DOM bindings in chapter apps must refer to a source HTML element.
   const app=fs.readFileSync(path.join(dir,'app.js'),'utf8');
   for(const match of app.matchAll(/(?:\$|getElementById)\('([^']+)'\)/g)){
    const id=match[1];
    if(id==='lab-host') continue;
    if(!app.includes('innerHTML')) assert.ok(html.includes('id="'+id+'"'),slug+': '+id);
   }
   count++;
  }
 }
 assert.equal(count,24);
});
