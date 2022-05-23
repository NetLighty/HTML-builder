import * as fs from 'fs';
import * as path from 'node:path';

//index.html
function createProjectsDist(){
  fs.mkdir('.\\06-build-page\\project-dist', {recursive: true} , (err)=>{
    if(err) throw err;
  })
}
function createIndexHtml(){
  const pathToComponents='.\\06-build-page\\components';
  const pathToProjectDistIndexHtml= '.\\06-build-page\\project-dist\\index.html'
  let indexHtmlContent='';
  let templateFilesNumber=0;
  let templates={};

  fs.readFile('.\\06-build-page\\template.html', 'utf-8', (err, fileContent)=>{
    if(err) throw err;
    indexHtmlContent=fileContent
    fs.readdir(pathToComponents, {withFileTypes: true}, (err, files)=>{
      if(err) throw err;
      for(let file of files){
        if(file.isFile && path.extname(file.name)==='.html'){
          templateFilesNumber++
        }
      }
      for(let file of files){
        if(file.isFile && path.extname(file.name)==='.html'){
          fs.readFile(`${pathToComponents}\\${file.name}`, 'utf8', (err, fileContent)=>{
            if(err) throw err;
            templates[file.name.replace('.html', '')]=fileContent
            //console.log(Object.keys(templates).length)
            if(Object.keys(templates).length===templateFilesNumber){
              for(let template in templates){
                indexHtmlContent=indexHtmlContent.replace(`{{${template}}}`, templates[template])
              }
              //console.log(indexHtmlContent)
              fs.writeFile(`${pathToProjectDistIndexHtml}`, indexHtmlContent, (err)=>{
                if(err) throw err;
                console.log('index.html created!')
              })
            }
          })
        }
      }
    })
  })
}
function replaceTags(templates){

}
createProjectsDist();
createIndexHtml();

//styles
function readStyles(){
  let filesContent=[]
  let cssFilesNumber=0;
  const pathToStyles= '.\\06-build-page\\styles';
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
          if(filesContent.length===cssFilesNumber){
            createBundle(filesContent.join('\n'));
          }
        });
      }
    }
  })
}
function createBundle(filesContent){
  const pathToBundle='.\\06-build-page\\project-dist\\style.css';
    fs.writeFile(`${pathToBundle}`, filesContent, (err)=>{
      if(err) throw err;
      console.log('add style.css!')
    })
}

readStyles();

//assets
function createFilesCopyDir(){
  fs.mkdir('.\\06-build-page\\project-dist\\assets',{recursive: true}, (err)=>{
    if(err) throw err;
  })
}
function copyFiles(path){
  fs.readdir(`${path}`, (err, files)=>{
    if(err) throw err;
    for (let file of files){
      fs.stat(`${path}\\${file}`, (errStat, status) => {
         if(errStat) throw errStat;

         if(status.isDirectory()){
          fs.mkdir(`${path.replace('assets','project-dist\\assets')}\\${file}`, {recursive: true}, (err)=>{
            if(err) throw err;
            copyFiles(`${path}\\${file}`);
          })
         }else{
             fs.copyFile(`${path}\\${file}`, `${path.replace('assets','project-dist\\assets')}\\${file}`, (err)=>{
               if(err) throw err;
             })
         }
      });
   }
  })
  console.log('assets updated!')
}
function deleteFilesCopy(path){
  fs.readdir(`${path}`, (err, files)=>{
    if(err) throw err;
    for (let file of files){
      fs.stat(`${path}\\${file}`, (errStat, status) => {
         if(errStat) throw errStat;

         if(status.isDirectory()){
          deleteFilesCopy(`${path}\\${file}`);
         }else{
             fs.unlink(`${path}\\${file}`, (err)=>{
              if(err) throw err;
             });
         }
      });
   }
  })
}

createFilesCopyDir();
deleteFilesCopy('.\\06-build-page\\project-dist\\assets');
copyFiles('.\\06-build-page\\assets');