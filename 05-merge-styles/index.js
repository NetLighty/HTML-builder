import * as fs from 'fs';
import * as path from 'node:path';

function readStyles(){
  let filesContent=[]
  let cssFilesNumber=0;
  const pathToStyles= '.\\05-merge-styles\\styles';
  fs.readdir(pathToStyles, {withFileTypes: true}, (err, files)=>{
    if(err) throw err
    for(let file of files){
      if(file.isFile && path.extname(file.name)==='.css'){
        cssFilesNumber++
      }
    }
    for(let file of files){
      if(file.isFile && path.extname(file.name)==='.css'){
        fs.readFile(`${pathToStyles}\\${file.name}`, 'utf8', function(err, fileContent){
          if(err) throw err;
          filesContent.push(fileContent)
          console.log(filesContent.length)
          if(filesContent.length===cssFilesNumber){
            createBundle(filesContent.join('\n'));
          }
        });
      }
    }
  })
}
function createBundle(filesContent){
  const pathToBundle='.\\05-merge-styles\\project-dist\\bundle.css';
    fs.writeFile(`${pathToBundle}`, filesContent, (err)=>{
      if(err) throw err;
      console.log('add style')
    })
}

readStyles();