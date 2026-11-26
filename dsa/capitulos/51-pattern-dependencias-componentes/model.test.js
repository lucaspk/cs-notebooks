'use strict';
const {test}=require('node:test');const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');const vm=require('node:vm');
function browser(){
 const context=vm.createContext({});
 for(const file of ['../../lib/foundations.js','../../lib/patterns.js','../../lib/graphs.js','../../lib/patterns4.js','model.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,file),'utf8'),context);
 return context;
}
test('modelo carrega no Node e em scripts clássicos sem require',()=>{
 for(const model of [require('./model.js'),browser().DsaLab]){assert.equal(model.dependencies(4,"0 1,1 2,0 2","components").count,2);}
});
test('app liga controles rotulados ao modelo e produz tabela consistente',()=>{
 const context=browser();let config;
 context.PlaygroundComponents={mount(host,options){assert.equal(host,'#chapter-lab');config=options;}};
 vm.runInContext(fs.readFileSync(path.join(__dirname,'app.js'),'utf8'),context);
 assert.ok(config);const state=Object.fromEntries(config.fields.map(f=>{assert.ok(f.label);return [f.id,f.value];}));
 const rows=config.evaluate(state);assert.ok(rows.length>0);for(const row of rows)assert.equal(row.length,config.columns.length);
});
