import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, LockKeyhole, Sparkles, Heart, Wine, Dice5, Compass, CalendarDays, Trophy, MessageCircle, Flower2, Zap } from 'lucide-react';
const GAMES = [
  { to: '/game', emoji: '♥', label: 'Erotická hra', desc: '6 úrovní odvážnych úloh s časovačom', accent: '#c0405a' },
  { to: '/polohy', emoji: '🌸', label: 'Polohy', desc: '58 polôh s popisom, tipmi a filtrom', accent: '#5fb4aa' },
  { to: '/spin-bottle', emoji: '🍾', label: 'Fľaša', desc: 'Točenie fľašou s výzvami pre páry', accent: '#e0a060' },
  { to: '/truth-dare', emoji: '🎯', label: 'Pravda alebo Odvaha', desc: 'Klasická hra, 4 úrovne intenzity', accent: '#a080d0' },
  { to: '/dice', emoji: '🎲', label: 'Erotické kocky', desc: 'Miesto · Akcia · Trvanie · Intenzita', accent: '#80c0a0' },
  { to: '/challenge', emoji: '⚡', label: 'Výzvy', desc: '24 výziev od romantiky po extrémne', accent: '#f0c060' },
  { to: '/fantasy', emoji: '✨', label: 'Fantasy AI', desc: 'Scenáre vytvorené umelou inteligenciou', accent: '#c060a0' },
  { to: '/seven-days', emoji: '📅', label: '7-dňová výzva', desc: 'Tematické programy s progress trackingom', accent: '#6090e0' },
  { to: '/marathon', emoji: '🏆', label: 'Maratón', desc: 'Počítadlá, časovač, rekordy a ciele', accent: '#e08040' },
  { to: '/never-have-i', emoji: '🙈', label: 'Nikdy som...', desc: 'Výzvy od romantiky až po extrémne', accent: '#d06080' },
];


const ICONS=[Heart,Flower2,Wine,MessageCircle,Dice5,Zap,Sparkles,CalendarDays,Trophy,Compass];
const GROUPS=['Všetky zážitky','Na chvíľu','Na celý večer'];
export default function Home(){const [filter,setFilter]=useState(0);return <div className="adventure-home">
<header className="adventure-nav"><a href="/sk" target="_top" className="wordmark">deep<span>talks</span><small>INTÍMNE DOBRODRUŽSTVO</small></a><span className="private-label"><LockKeyhole size={13}/> Súkromná kolekcia</span></header>
<section className="home-hero"><div className="hero-copy"><p className="eyebrow"><span/> ČAS, KTORÝ PATRÍ VÁM</p><h1>Menej sveta.<br/><em>Viac vás.</em></h1><p className="hero-description">Odložte deň bokom. Vyberte si zážitok,<br className="desktop-break"/> nalaďte sa na seba a nechajte večer plynúť.</p><Link to="/game" className="primary-action">Začať dobrodružstvo <ArrowUpRight size={19}/></Link><a href="#collection" className="hero-secondary" onClick={e=>{e.preventDefault();document.getElementById('collection').scrollIntoView({behavior:'smooth'});}}>Preskúmať kolekciu ↓</a></div><div className="hero-art" aria-hidden="true"><div className="art-glow"/><div className="art-ring ring-back"/><div className="art-ring ring-front"/><div className="art-caption"><span>01 — 10</span><small>DESAŤ SPÔSOBOV BYŤ BLIŽŠIE</small></div><div className="art-note">spolu.</div></div></section>
<div className="editorial-line"><span>VY DVAJA.</span><span>VAŠE TEMPO.</span><span>VÁŠ VEČER.</span></div>
<section id="collection" className="collection"><div className="collection-heading"><div><p className="eyebrow">VYBERTE SI PODĽA NÁLADY</p><h2>Kam vás to dnes zavedie?</h2></div><span className="collection-count">10 zážitkov / jedna kolekcia</span></div><div className="collection-filters" aria-label="Dĺžka zážitku">{GROUPS.map((g,i)=><button key={g} aria-pressed={filter===i} onClick={()=>setFilter(i)}>{g}</button>)}</div>
<div className="experience-grid">{GAMES.map((game,i)=>{const Icon=ICONS[i];if(filter===1&&[0,7,8].includes(i)||filter===2&&![0,7,8].includes(i))return null;return <Link key={game.to} to={game.to} className={'experience-card '+(i===0?'featured':'')}><div className="card-top"><Icon size={25} strokeWidth={1.2}/><span>{String(i+1).padStart(2,'0')}</span></div><div><p className="card-category">{i===6?'AI SLUŽBA NEPRIPOJENÁ':i===0?'PODPISOVÝ ZÁŽITOK':'OBJAVUJTE SPOLU'}</p><h3>{game.label}</h3><p className="card-description">{game.desc}</p></div><span className="card-arrow"><ArrowUpRight size={20}/></span></Link>})}</div></section><footer className="adventure-footer"><span>Malý priestor. Veľké spojenie.</span><small>DeepTalks · Súkromná pracovná verzia</small></footer></div>;}
