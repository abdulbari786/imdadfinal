import {useEffect,useRef,useState} from 'react'
import {IMG,TRUST,STATS,CAUSES,TIMELINE,PRESS,GOV,NGO,GALLERY} from './content.js'
import Donate from './Donate.jsx'
const RM=typeof matchMedia!=='undefined'&&matchMedia('(prefers-reduced-motion:reduce)').matches
function useSeen(th=.2){const r=useRef(),[s,set]=useState(false);useEffect(()=>{if(!r.current)return;const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){set(true);io.disconnect()}},{threshold:th});io.observe(r.current);return()=>io.disconnect()},[th]);return [r,s]}
function Reveal({v='up',d=0,className='',children,as:T='div'}){const [r,s]=useSeen(.12);return <T ref={r} className={`rv rv-${v} ${s?'in':''} ${className}`} style={{'--d':d+'ms'}}>{children}</T>}
const Rule=()=>{const [r,s]=useSeen(.5);return <div ref={r} className={`rule ${s?'in':''}`}/>}
function Count({n,s=''}){const [r,seen]=useSeen(.4),[v,set]=useState(0);useEffect(()=>{if(!seen)return;if(RM){set(n);return}const t0=performance.now();let f;const step=t=>{const p=Math.min(1,(t-t0)/1800);set(Math.round(n*(1-Math.pow(1-p,3))));if(p<1)f=requestAnimationFrame(step)};f=requestAnimationFrame(step);return()=>cancelAnimationFrame(f)},[seen,n]);return <b ref={r}>{(seen?v:n).toLocaleString('en-IN')}{s}</b>}
function Lightbox({list,i,go,close}){useEffect(()=>{const k=e=>{if(e.key==='Escape')close();if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(-1)};addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[go,close]);
 if(i==null)return null;return <div className="lb" role="dialog" aria-modal="true" aria-label="Enlarged photo" onClick={close}><div className="lbi" onClick={e=>e.stopPropagation()}><button className="x" autoFocus onClick={close} aria-label="Close">×</button><img src={list[i][0]} alt={list[i][1]}/><p>{list[i][1]}</p>{list.length>1&&<div className="gn"><button className="btn o" onClick={()=>go(-1)}>Previous</button><button className="btn o" onClick={()=>go(1)}>Next</button></div>}</div></div>}
const Donor=({className=''})=><a className={`btn pulse ${className}`} href="#/donate">Donate Now</a>
function Home(){
 const [lb,setLb]=useState({list:GALLERY,i:null}),[menu,setMenu]=useState(false)
 const open=(list,i)=>setLb({list,i}),go=d=>setLb(l=>({...l,i:(l.i+d+l.list.length)%l.list.length}))
 const docs=(a)=>a.map((d,i)=><Reveal key={d.t} d={i*90} v={i%2?'right':'left'} className="doc"><button className="dimg" onClick={()=>open(a.map(x=>[x.img,x.t]),i)} aria-label={'Enlarge '+d.t}><img src={d.img} alt={d.t} loading="lazy"/></button><div><span className="tag">{d.tag}</span><h3>{d.t}</h3><p>{d.s}</p></div></Reveal>)
 return <>
 <header><div className="wrap bar"><a className="brand" href="#top"><img src={IMG.logo} alt="IFT logo"/><span>Imdad-ul-Fuqaraa<br/>Trust</span></a>
  <Donor className="mini"/><button className="mb" aria-expanded={menu} onClick={()=>setMenu(!menu)}>Menu</button>
  <nav className={menu?'open':''} onClick={()=>setMenu(false)}>{[['causes','Our Causes'],['story','Our Story'],['impact','Impact'],['gallery','Gallery'],['proof','Transparency'],['contact','Contact']].map(([h,t])=><a key={h} href={'#'+h}>{t}</a>)}<Donor/></nav></div></header>
 <main id="top">
 <section className="hero"><div className="wrap hg"><div>
  <div>
  <p className="eyebrow rise">Helping families since 2019</p>
  <h1 className="rise" style={{'--d':'120ms'}}>Your small help can change a whole life.</h1>
  <p className="lead rise" style={{'--d':'240ms'}}>
    We give children and women food, education and a safe place to grow. Join us today.
  </p>
  <div className="cta rise" style={{'--d':'360ms'}}>
    <Donor/>
    <a className="btn o" href="#causes">See Our Work</a>
  </div>
</div></div>
  <div className="collage"><figure className="p1 pop" style={{'--d':'150ms'}}><img src={IMG.school} alt="Students in school uniform lined up in rows"/><figcaption>IFT Mission High School</figcaption></figure>
   <figure className="p2 pop" style={{'--d':'300ms'}}><img src={IMG.top30} alt="Femhonour Top 30 Visionary Women award poster for founder Azmath Unnisa"/><figcaption>Top 30 Visionary Women, 2026</figcaption></figure>
   <figure className="p3 pop" style={{'--d':'450ms'}}><img src={IMG.women} alt="Women holding tailoring certificates"/><figcaption>Women Skills Hub</figcaption></figure></div></div>
  <div className="ticker" aria-hidden="true"><div>{[0,1].map(k=><span key={k}>Home for girls · School · Women's skills · Food relief · Healthcare · Genuine service for mankind · </span>)}</div></div></section>

 <section id="impact" className="navy"><div className="wrap"><Reveal as="h2">Reported impact</Reveal><div className="stats">{STATS.map((s,i)=><Reveal key={s.l} d={i*120} className="stat"><Count n={s.n} s={s.s}/><span>{s.l}</span></Reveal>)}</div>
  <p className="src">Source: the trust's 2026 report. Reported figures, not live totals.</p></div></section>

 <section id="causes" className="sec"><div className="wrap"><Rule/><Reveal as="h2">Where your gift goes</Reveal>
  {CAUSES.map((c,i)=><Reveal key={c.t} v={i%2?'right':'left'} className={`cause ${i%2?'flip':''}`}>
   <div className={`ph ${c.fit||''} ${c.text?'tx':''}`}>{c.text?<span>{c.text}</span>:<img src={c.img} alt={c.t} loading="lazy"/>}</div>
   <div><h3>{c.t}</h3><p><b>Need:</b> {c.need}</p><p><b>We do:</b> {c.do}</p><Donor className="sm"/></div></Reveal>)}</div></section>

 <section className="giveband"><div className="wrap"><Reveal><h2>This trust runs on donations.</h2><p>Give once or every month. Every rupee goes to work.</p><Donor className="lt"/></Reveal></div></section>

 <section id="story" className="sec"><div className="wrap"><Rule/><Reveal as="h2">Our story</Reveal>
  <div className="tl">{TIMELINE.map(([y,t],i)=><Reveal key={y} d={i*130}><b>{y}</b><p>{t}</p></Reveal>)}</div>
  <div className="side"><Reveal v="left" className="fimg"><img src={IMG.founder} alt="Azmath Unnisa, founder and chairperson"/></Reveal>
   <Reveal v="right"><h3>Azmath Unnisa</h3><p className="role">Founder and Chairperson</p><p>She started with rations and school help in 2019, then opened a home for girls. Femhonour named her a Top 30 Visionary Woman in 2026.</p><blockquote>"My mission is to serve humanity with compassion, uplift the underprivileged, and bring hope to those in need."</blockquote></Reveal></div></div></section>

 <section className="sec tint"><div className="wrap"><Rule/><Reveal as="h2">In the press</Reveal>
  {PRESS.map((p,i)=><Reveal key={p.t} v={i%2?'right':'left'} className={`side ${i%2?'flip':''}`}><button className="dimg tall" onClick={()=>open(PRESS.map(x=>[x.img,x.t]),i)} aria-label={'Enlarge '+p.t}><img src={p.img} alt={p.t} loading="lazy"/></button><div><h3>{p.t}</h3><p>{p.s}</p></div></Reveal>)}</div></section>

 <section id="proof" className="sec"><div className="wrap"><Rule/><Reveal as="h2">Recognition</Reveal>
  <p className="note">Pledges, appreciation, awards and courses. These are not registration or tax approvals. Registration: {TRUST.reg}.</p>
  <h3 className="grp">From government bodies</h3><div className="docs">{docs(GOV)}</div>
  <h3 className="grp">From NGOs and organisations</h3><div className="docs">{docs(NGO)}</div></div></section>

 <section id="gallery" className="sec tint"><div className="wrap"><Rule/><Reveal as="h2">Life at IFT</Reveal>
  <div className="gal">{GALLERY.map((g,i)=><Reveal key={g[1]} d={i*70} className="gi"><button onClick={()=>open(GALLERY,i)} aria-label={'Enlarge '+g[1]}><img src={g[0]} alt={g[1]} loading="lazy"/><span>{g[1]}</span></button></Reveal>)}</div>
  <div className="side vid"><Reveal v="left"><video controls muted playsInline preload="none" poster={IMG.poster} src="/women-skills-hub.mp4"/></Reveal><Reveal v="right"><h3>Certificates being signed</h3><p>Women Skills Hub tailoring certificates, prepared by hand.</p><a className="btn o" href={TRUST.ig} target="_blank" rel="noreferrer">More on Instagram</a></Reveal></div></div></section>

 <section className="sec"><div className="wrap"><Rule/><Reveal as="h2">Next: a permanent campus</Reveal><p className="lead">The proposed "Way to Jannah" campus would bring a home, school, skills training and care together.</p>
  <div className="chips">{['Home for girls','Classrooms','Skills training','Health and relief'].map((c,i)=><Reveal key={c} d={i*100} className="chip">{c}</Reveal>)}</div></div></section>

 <section className="sec tint"><div className="wrap"><Rule/><Reveal as="h2">Other ways to help</Reveal>
  <div className="help">{[['Volunteer','Give time or a skill.'],['Partner','Work with us.'],['Visit','Arrange a visit.'],['Ask','Learn current needs.']].map(([t,s],i)=><Reveal key={t} d={i*90}><a className="k" href={`https://wa.me/${TRUST.wa}?text=${encodeURIComponent(t+' enquiry')}`} target="_blank" rel="noreferrer"><h3>{t}</h3><p>{s}</p></a></Reveal>)}</div></div></section>
 </main>
 <footer id="contact"><div className="wrap"><Reveal as="h2">Be part of what happens next.</Reveal>
  <div className="fg"><Reveal><p><b>{TRUST.name}</b></p><p>{TRUST.address}</p><p><a href={`tel:${TRUST.tel}`}>{TRUST.phone}</a></p><p><a href={`mailto:${TRUST.email}`}>{TRUST.email}</a></p><Donor className="lt"/></Reveal>
   <Reveal d={120} className="qrs"><a href={`https://wa.me/${TRUST.wa}`} target="_blank" rel="noreferrer"><img src={IMG.qrWa} alt="QR code for WhatsApp chat"/><span>WhatsApp</span></a><a href={TRUST.ig} target="_blank" rel="noreferrer"><img src={IMG.qrIg} alt="QR code for Instagram"/><span>Instagram</span></a></Reveal></div>
  <p className="fine">© Imdad-ul-Fuqaraa Trust · {TRUST.reg} · Privacy and refund information to be added.</p></div></footer>
 <a className="wafab" href={`https://wa.me/${TRUST.wa}?text=${encodeURIComponent('Assalamu alaikum, I would like to know more about the trust.')}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><svg viewBox="0 0 32 32" width="30" height="30" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.9L3 29l6.300-2A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.400 19.700l-.4-.2-3.700 1.200 1.200-3.600-.3-.4A10.600 10.600 0 0 1 16 5.400zm-4 5.200c-.3 0-.7.100-1 .5-.4.400-1.300 1.300-1.300 3.100s1.400 3.600 1.600 3.900c.2.200 2.600 4.100 6.400 5.600 3.200 1.200 3.800.9 4.500.9.700-.1 2.200-.9 2.500-1.800.3-.9.300-1.600.2-1.800-.1-.2-.4-.3-.8-.5l-2.300-1.100c-.3-.1-.6-.2-.8.200-.2.300-.9 1.100-1.100 1.300-.2.200-.4.300-.7.100-.4-.2-1.500-.6-2.800-1.700-1-.9-1.700-2-1.900-2.400-.2-.3 0-.5.200-.7l.5-.6c.2-.2.200-.4.400-.6.100-.3.100-.5 0-.7l-1-2.400c-.3-.6-.5-.5-.7-.5z"/></svg></a>
 <Lightbox list={lb.list} i={lb.i} go={go} close={()=>setLb(l=>({...l,i:null}))}/></>}
export default function App(){const get=()=>location.hash.startsWith('#/donate')?'donate':'home',[p,setP]=useState(get)
 useEffect(()=>{const h=()=>{const n=get();setP(n);if(n==='donate'||location.hash==='#/')scrollTo(0,0)};addEventListener('hashchange',h);return()=>removeEventListener('hashchange',h)},[])
 return p==='donate'?<><header><div className="wrap bar"><a className="brand" href="#/"><img src={IMG.logo} alt="IFT logo"/><span>Imdad-ul-Fuqaraa<br/>Trust</span></a></div></header><Donate/></>:<Home/>}
