import {useState} from 'react'
import {BANK,TRUST,IMG} from './content.js'
const qrs=import.meta.glob('./assets/upi-qr.*',{eager:true,import:'default'}); const upiQr=Object.values(qrs)[0] // drop upi-qr.png into src/assets to show it
function Copy({v,label}){const [ok,set]=useState(false);return <button className="copy" aria-label={'Copy '+label} onClick={()=>{navigator.clipboard?.writeText(v);set(true);setTimeout(()=>set(false),1600)}}>{ok?'Copied':'Copy'}</button>}
export default function Donate(){return <main className="donate"><div className="wrap">
 <a className="back" href="#/">← Back to home</a>
 <h1 className="rise">Donate</h1><p className="lead rise" style={{'--d':'120ms'}}>Thank you. Every gift keeps a home, a classroom and a kitchen running.</p>
 <div className="dgrid">
  <section className="dcard rise" style={{'--d':'200ms'}}><h2>Bank transfer</h2><dl>{BANK.map(([k,v])=><div className="row" key={k}><dt>{k}</dt><dd>{v}</dd>{(k==='Account number'||k==='IFSC code')&&<Copy v={v} label={k}/>}</div>)}</dl></section>
  <section className="dcard gp rise" style={{'--d':'320ms'}}><h2>Google Pay / PhonePe</h2><p className="phone">{TRUST.phone}</p><Copy v={TRUST.tel} label="phone number"/>{upiQr&&<img className="upi" src={upiQr} alt="UPI QR code"/>}
   <a className="btn wa" href={`https://wa.me/${TRUST.wa}`} target="_blank" rel="noreferrer">Message us on WhatsApp</a></section>
 </div></div></main>}
