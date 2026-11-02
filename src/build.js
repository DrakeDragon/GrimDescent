const fs=require('fs');const d=__dirname;
const css=fs.readFileSync(d+'/style.css','utf8');
const js=['data.js','data2.js','data3.js','data4.js','data5.js','data6.js','data7.js','data8.js','data9.js','data10.js','data11.js','data12.js','quips.js','core.js','battle.js','ui.js','stage2.js'].map(f=>fs.readFileSync(d+'/'+f,'utf8')).join('\n');
let html=fs.readFileSync(d+'/template.html','utf8');
html=html.replace('/*CSS*/',()=>css).replace('/*JS*/',()=>js.replace(/<\/script>/g,'<\\/script>'));
fs.writeFileSync(d+'/index.html',html);fs.writeFileSync(d+'/_bundle.js',js);console.log('built',html.length,'bytes');
