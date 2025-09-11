
import { useState, useEffect } from 'react';
import { useToast } from '@/components/toastContext'

export default function ProfilePage(){
  const [user, setUser] = useState(null);
  const { pushToast } = useToast()
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({name:'', email:'', phone:'', address:''});
  const [theme, setTheme] = useState('light');
  const [photo, setPhoto] = useState('');

  // handle image file selection and preview
  function onPickPhoto(e){
    const f = e.target.files && e.target.files[0];
    if(!f) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(f);
  }

  async function saveProfileWithPhoto(){
    const body = {...form, photo, joined: user?.joined, theme};
    await fetch('/api/users', { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify(body) });
    setUser(body);
    pushToast && pushToast('Profile saved');
  }


  useEffect(()=> {
    async function load(){
      try{
        const res = await fetch('/api/users');
        const data = await res.json();
        const u = data[0] || {};
        setUser(u);
        setForm({name:u.name||'', email:u.email||'', phone:u.phone||'', address:u.address||''});
      }catch(e){
        console.error(e);
      }
    }
    load();
  },[]);

  if(!user) return <div className="p-8">Loading...</div>;

  return (
    <main className="p-8 flex justify-center">
      <div className="w-full max-w-md bg-slate-800 text-white rounded-2xl shadow p-6">
        <div className="flex flex-col items-center gap-4">
          <img src="/images/profile-placeholder.svg" alt="profile" className="w-28 h-28 rounded-full" />
          {!editing ? (
            <>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">{user.phone}</p>
              <p className="text-sm text-gray-600">{user.address}</p>
              <p className="text-sm text-gray-600">Joined: <span className="font-mono">{user.joined}</span></p>
              <div className="mt-2">
                <label className="text-sm block">Theme</label>
                <select value={theme} onChange={e=>setTheme(e.target.value)} className="p-1 border rounded mt-1">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full mt-4">
  <div className="p-4 rounded-lg shadow bg-white dark:bg-slate-800">
    <div className="text-sm text-gray-500">Total Orders</div>
    <div className="text-2xl font-bold">12</div>
  </div>
  <div className="p-4 rounded-lg shadow bg-white dark:bg-slate-800">
    <div className="text-sm text-gray-500">Pending</div>
    <div className="text-2xl font-bold">3</div>
  </div>
</div>
<div className="mt-4 w-full flex gap-2">
                <button className="flex-1 py-2 rounded bg-blue-600 text-white" onClick={()=>setEditing(true)}>Edit Profile</button>
                <button className="flex-1 py-2 rounded border" onClick={()=>alert('Logged out')}>Logout</button>
              </div>
            </>
          ) : (
            <form className="w-full" encType="multipart/form-data" onSubmit={async (e)=>{e.preventDefault(); 
                // simulate save to server by calling API
                await fetch('/api/users', {method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(form)});
                setUser(form); setEditing(false);
              }}>
              <label className="block text-sm">Profile Picture</label>
<input type="file" accept="image/*" className="w-full p-2 border rounded mb-2" onChange={e=>setForm({...form, photo: URL.createObjectURL(e.target.files[0])})} />
<label className="block text-sm">Name</label>
              <input className="w-full p-2 border rounded mb-2" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
              <label className="block text-sm">Email</label>
              <input className="w-full p-2 border rounded mb-2" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
              <label className="block text-sm">Phone</label>
              <input className="w-full p-2 border rounded mb-2" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
              <label className="block text-sm">Address</label>
              <input className="w-full p-2 border rounded mb-2" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} />
              <div className="flex gap-2 mt-2">
                <button type="button" className="flex-1 py-2 rounded bg-green-600 text-white" onClick={saveProfileWithPhoto}>Save</button>
                <button type="button" className="flex-1 py-2 rounded border" onClick={()=>setEditing(false)}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
