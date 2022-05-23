//const process= require('process');
import fs from 'fs';
import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

let writableStream = fs.createWriteStream('.\\02-write-file\\text.txt');
/* rl.question('Write your text pls', (answer)=>{
  console.log(answer);
}); */
console.log('---Start---');
rl.on('line', (input) => {
  if(input==='exit'){
    rl.close();
  }else{
    writableStream.write(input);
  }
  //console.log(`Received: ${input}`);
});
process.on('exit', ()=>{
  console.log('---End---');
  //process.exit();
});
