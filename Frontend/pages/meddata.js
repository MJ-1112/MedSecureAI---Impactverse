
import { useEffect, useState } from 'react';

export default function MedData(){
  const [meds, setMeds] = useState([]);
  const [form, setForm] = useState({sku:'', name:'', stock:0, dosage:'', top_orders:0});
  const [sort, setSort] = useState('name-asc');

  useEffect(()=>{ load(); }, []);
  async function load(){
    const res = await fetch('/api/stock');
    const data = await res.json();
    setMeds(data);
  }
  async function addM(){
  }
  async function adjustStock(sku, delta){
    await fetch('/api/stock', {method:'PUT', headers:{'content-type':'application/json'}, body: JSON.stringify({sku, delta})});
    load();
  }
  function incStock(sku){ adjustStock(sku, 1); }
  function decStock(sku){ adjustStock(sku, -1); }
  async function addM(){
    await fetch('/api/stock', {method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(form)});
    setForm({sku:'', name:'', stock:0, dosage:'', top_orders:0});
    load();
  }
  async function del(sku){
    await fetch('/api/stock?sku='+encodeURIComponent(sku), {method:'DELETE'});
    load();
  }
  function sortedList(){
    const copy = [...meds];
    if(sort==='name-asc') copy.sort((a,b)=>a.name.localeCompare(b.name));
    if(sort==='name-desc') copy.sort((a,b)=>b.name.localeCompare(a.name));
    if(sort==='stock-asc') copy.sort((a,b)=>a.stock - b.stock);
    if(sort==='stock-desc') copy.sort((a,b)=>b.stock - a.stock);
    if(sort==='toporders') copy.sort((a,b)=>b.top_orders - a.top_orders).reverse();
    return copy;
  }

  return (
    <main className={`p-6 bg-transparent`}>
      <h1 className="text-2xl font-semibold mb-4">Med Data</h1>
      <div className="mb-4 flex gap-2">
        <input placeholder="SKU" value={form.sku} onChange={e=>setForm({...form, sku:e.target.value})} className="p-2 border rounded"/>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="p-2 border rounded"/>
        <input placeholder="Stock" type="number" value={form.stock} onChange={e=>setForm({...form, stock:parseInt(e.target.value||0)})} className="p-2 border rounded w-24"/>
        <input placeholder="Dosage" value={form.dosage} onChange={e=>setForm({...form, dosage:e.target.value})} className="p-2 border rounded w-32"/>
        <button onClick={addM} className="px-4 py-2 bg-green-600 text-white rounded">Add</button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <label>Sort:</label>
        <select value={sort} onChange={e=>setSort(e.target.value)} className="p-2 border rounded">
          <option value="name-asc">A - Z</option>
          <option value="name-desc">Z - A</option>
          <option value="stock-asc">Stock Asc</option>
          <option value="stock-desc">Stock Desc</option>
          <option value="toporders">Top Orders</option>
        </select>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left">
            <th className="p-2">SKU</th><th>Name</th><th>Stock</th><th>Dosage</th><th>Top Orders</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedList().map(m=>(
            <tr key={m.sku} className="border-t">
              <td className="p-2">{m.sku}</td>
              <td className="p-2">{m.name}</td>
              <td className="p-2 flex items-center gap-2"><button onClick={()=>decStock(m.sku)} className="px-2 py-1 rounded bg-slate-700 text-white hover:bg-slate-600">-</button><span className="w-8 text-center">{m.stock}</span><button onClick={()=>incStock(m.sku)} className="px-2 py-1 rounded bg-slate-700 text-white hover:bg-slate-600">+</button></td>
              <td className="p-2">{m.dosage}</td>
              <td className="p-2">{m.top_orders}</td>
              <td className="p-2">
                <button onClick={()=>del(m.sku)} className="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
