import * as fs from 'fs';

function createFilesCopyDir(){
  fs.mkdir('.\\04-copy-directory\\files-copy',{recursive: true}, (err)=>{
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
          fs.mkdir(`${path.replace('files','files-copy')}\\${file}`, {recursive: true}, (err)=>{
            if(err) throw err;
            copyFiles(`${path}\\${file}`);
          })
         }else{
             fs.copyFile(`${path}\\${file}`, `${path.replace('files','files-copy')}\\${file}`, (err)=>{
               if(err) throw err;
             })
         }
      });
   }
  })
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
deleteFilesCopy('.\\04-copy-directory\\files-copy')
copyFiles('.\\04-copy-directory\\files');
