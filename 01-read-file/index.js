import { ReadStream } from 'fs';

const stream= new ReadStream('.\\01-read-file\\text.txt', {encoding: 'utf-8'});

stream.on('readable', function(){
  const data= stream.read();
  if(data) console.log(data);
});
