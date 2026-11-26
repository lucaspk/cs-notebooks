'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
test('adaptador funciona no Node e no browser sem require',()=>{
 const node=require('./model.js');
 const context=vm.createContext({});
 for(const file of ['../../lib/foundations.js','model.js']) vm.runInContext(fs.readFileSync(path.join(__dirname,file),'utf8'),context);
 for(const model of [node,context.DsaLab]){ const r=model.linear([4,9,4,2], 4); assert.equal(r.index, 0); }
});
