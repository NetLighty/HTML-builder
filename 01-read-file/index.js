import { ReadStream } from 'fs';

const stream= new ReadStream('HTML-builder\\01-read-file\\text.txt', {encoding: 'utf-8'});

stream.on('readable', function(){
  const data= stream.read();
  console.log(data);
});
