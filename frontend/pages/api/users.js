
import fs from 'fs';
import path from 'path';
export default function handler(req, res){
  const file = path.join(process.cwd(),'data','users.json');
  if(req.method === 'GET'){
    const data = JSON.parse(fs.readFileSync(file,'utf8')||'[]');
    res.status(200).json(data);
  } else if(req.method === 'POST'){
    const body = req.body;
    let data = JSON.parse(fs.readFileSync(file,'utf8')||'[]');
    if(data.length===0) data=[body]; else data[0]=body;
    fs.writeFileSync(file, JSON.stringify(data,null,2));
    res.status(200).json({ok:true});
  } else res.status(405).end();
}
