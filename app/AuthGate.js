'use client';
import {useEffect,useState} from 'react';
import {supabase,supabaseConfigured} from '../lib/supabase';

export default function AuthGate({children}){
 const [session,setSession]=useState(undefined),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[mode,setMode]=useState('signin'),[msg,setMsg]=useState(''),[busy,setBusy]=useState(false);
 useEffect(()=>{if(!supabaseConfigured){setSession(null);return}supabase.auth.getSession().then(({data})=>setSession(data.session));const {data:{subscription}}=supabase.auth.onAuthStateChange((_e,s)=>setSession(s));return()=>subscription.unsubscribe()},[]);
 async function submit(e){e.preventDefault();setBusy(true);setMsg('');const fn=mode==='signup'?supabase.auth.signUp({email,password}):supabase.auth.signInWithPassword({email,password});const {data,error}=await fn;if(error)setMsg(error.message);else if(mode==='signup'&&!data.session)setMsg('Account created. Check your email to confirm it, then sign in.');setBusy(false)}
 if(session===undefined)return <div className="authPage"><div className="authCard"><div className="authMark">U</div><p>Connecting securely…</p></div></div>;
 if(!supabaseConfigured)return <div className="authPage"><div className="authCard"><div className="authMark">U</div><h1>Utecht Growth Intelligence</h1><p>Database connection is not available in this deployment.</p></div></div>;
 if(!session)return <div className="authPage"><form className="authCard" onSubmit={submit}><div className="authMark">U</div><div className="authEyebrow">UTECHT INSURANCE UNDERWRITERS</div><h1>Growth Intelligence</h1><p>Secure access to commercial P&amp;C growth operations.</p><label>Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/></label><label>Password<input type="password" required minLength="6" value={password} onChange={e=>setPassword(e.target.value)} autoComplete={mode==='signup'?'new-password':'current-password'}/></label>{msg&&<div className="authMsg">{msg}</div>}<button className="authPrimary" disabled={busy}>{busy?'PLEASE WAIT…':mode==='signup'?'CREATE ACCOUNT':'SIGN IN'}</button><button type="button" className="authSwitch" onClick={()=>{setMode(mode==='signup'?'signin':'signup');setMsg('')}}>{mode==='signup'?'Already have an account? Sign in':'First time? Create an account'}</button></form></div>;
 return children;
}
