import http from 'node:http';
import fs from 'node:fs/promises';
const files={'/':'index.html','/index.html':'index.html','/app.js':'app.js','/config.js':'config.js'};
http.createServer(async(req,res)=>{const path=new URL(req.url,'http://localhost').pathname;const file=files[path];if(!file){res.writeHead(404);res.end('Not found');return}try{res.writeHead(200,{'Content-Type':file.endsWith('.html')?'text/html; charset=utf-8':'text/javascript; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(await fs.readFile(new URL(file,import.meta.url)))}catch{res.writeHead(500);res.end('Cannot read site file')}}).listen(3000,'127.0.0.1',()=>console.log('Shanyraq: http://127.0.0.1:3000\nStop: Ctrl+C'));
