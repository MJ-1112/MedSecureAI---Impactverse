
import fs from 'fs';
import path from 'path';
export default function handler(req, res){
  const file = path.join(process.cwd(),'data','stock.json');
  if(req.method === 'GET'){
    const data = JSON.parse(fs.readFileSync(file,'utf8')||'[]');
    res.status(200).json(data);
  } else if(req.method === 'POST'){
    const body = req.body;
    let data = JSON.parse(fs.readFileSync(file,'utf8')||'[]');
    data.push(body);
    fs.writeFileSync(file, JSON.stringify(data,null,2));
    res.status(200).json({ok:true});
  } else if(req.method === 'PUT'){
    // adjust stock: expect body { sku, delta }
    const body = req.body || {};
    const sku = body.sku;
    const delta = Number(body.delta||0);
    let data = JSON.parse(fs.readFileSync(file,'utf8')||'[]');
    data = data.map(item=> {
      if(item.sku === sku) {
        item.stock = Number(item.stock||0) + delta;
        if(item.stock < 0) item.stock = 0;
      }
      return item;
    });
    fs.writeFileSync(file, JSON.stringify(data,null,2));
    res.status(200).json({ok:true});
  } else if(req.method === 'DELETE'){
    const sku = req.query.sku;
    let data = JSON.parse(fs.readFileSync(file,'utf8')||'[]');
    data = data.filter(item=>item.sku !== sku);
    fs.writeFileSync(file, JSON.stringify(data,null,2));
    res.status(200).json({ok:true});
  } else res.status(405).end();
}
