import * as fs from 'fs';
import { readdir } from 'fs/promises';
import * as path from 'node:path';

try{
  const files= await readdir('.\\03-files-in-folder\\secret-folder', {withFileTypes: true});
  for (const file of files){
    const extName= path.extname(file.name).slice(1, path.extname(file.name).length);
    const fileName= file.name.slice(0, file.name.length-extName.length-1)
    fs.stat(`.\\03-files-in-folder\\secret-folder\\${file.name}`, (err, stats)=>{
      if(file.isFile())console.log(fileName+' - '+extName+' - '+stats.size+' bytes')
    })
  }
} catch (err) {
  console.log(err);
}