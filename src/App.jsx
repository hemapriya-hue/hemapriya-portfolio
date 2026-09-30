import React, { useEffect, useMemo, useRef, useState } from 'react'

const PROFILE = {
  name: 'Hemapriya', location: 'Chennai', degree: 'B.E. Computer Science and Engineering', college: 'Sri Sairam Engineering College', years: '2025–2029', cgpa: '9.7',
  summary: 'Computer Science and Engineering undergraduate with a strong interest in software development, artificial intelligence, and embedded systems. Enjoys building practical technology solutions through programming, computer vision, and IoT. Curious and hands-on learner with experience in technical projects, coding competitions, and research-oriented work.',
  motto: 'Still exploring and want to try everything.',
  skills: ['Python Programming','Computer Vision','IoT & Embedded Systems','C Programming','Problem Solving','Machine Learning'],
  projects: [
    { id:'fire', icon:'🔥', title:'Fire Detection & Alert System', type:'School AI Project', status:'SUCCESS', tech:'Python · YOLO · OpenCV · Pygame', text:'Computer-vision based fire detection system with automated audio alerts and notification support.' },
    { id:'mechanical', icon:'⚙', title:'Mechanical Parts Detection System', type:'College Exhibition', status:'SUCCESS', tech:'Python · YOLOv8 · OpenCV · Streamlit', text:'YOLOv8-based object detection system for identifying mechanical components with an interactive dashboard for visualization and confidence control.' },
    { id:'robot', icon:'🤖', title:'4-Wheel IoT Robot', type:'IIT School Program', status:'COMPLETED', tech:'Raspberry Pi Pico W · L298N · PWM', text:'Four-wheel robot using Raspberry Pi Pico W and L298N motor drivers, with motor control implemented through PWM.' }
  ],
  awards: ['Best Paper Award — ICPPM 2026','Reverse Coding — Tech Blaze National Symposium, 3rd Place','Participated in 2 hackathons'],
  certs: ['NPTEL — Developing Soft Skills and Personality','NPTEL — UN Sustainable Development Goals','NPTEL — Ethics in Engineering Practice','NPTEL — Programming, Data Structures and Algorithms Using Python','C Programming Training — EduPyramids, SINE, IIT Bombay'],
  interests: ['Drawing','Crochet','Cooking','Photography appreciation','Fashion','Anime / Donghua','Creative coding'],
  learning: ['Japanese','Blender','Ibis Paint']
}

const Icon = ({type}) => <span className="pixel-icon">{type}</span>

function Window({id,title,icon,children,onClose,active,onFocus,minimized,onMinimize,initial={}}){
  const [pos,setPos]=useState({x:initial.x ?? 190,y:initial.y ?? 80})
  const [size,setSize]=useState({w:initial.w ?? 620,h:initial.h ?? 420})
  const [max,setMax]=useState(false)
  const drag=useRef(null)
  useEffect(()=>{ if(!drag.current)return; const move=e=>{const d=drag.current; setPos({x:Math.max(0,d.ox+e.clientX-d.sx),y:Math.max(0,d.oy+e.clientY-d.sy)})}; const up=()=>{drag.current=null}; window.addEventListener('pointermove',move);window.addEventListener('pointerup',up);return()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up)}},[])
  if(minimized)return null
  const style=max?{left:0,top:0,width:'100%',height:'calc(100% - 34px)'}:{left:pos.x,top:pos.y,width:size.w,height:size.h}
  return <div className={'win95-window '+(active?'active':'')} style={style} onPointerDown={onFocus}>
    <div className="titlebar" onDoubleClick={()=>setMax(!max)} onPointerDown={e=>{if(max)return;drag.current={sx:e.clientX,sy:e.clientY,ox:pos.x,oy:pos.y}}}>
      <span><Icon type={icon}/>{title}</span><div className="window-controls"><button onClick={e=>{e.stopPropagation();onMinimize()}}>_</button><button onClick={e=>{e.stopPropagation();setMax(!max)}}>{max?'❐':'□'}</button><button onClick={e=>{e.stopPropagation();onClose()}}>×</button></div>
    </div>
    <div className="menu-strip"><span>File</span><span>Edit</span><span>View</span><span>Help</span></div>
    <div className="window-body">{children}</div>
  </div>
}

function About(){return <div className="paper"><h2>ABOUT HEMAPRIYA</h2><p className="lead">Hello! I'm Hemapriya.</p><p>{PROFILE.summary}</p><div className="info-grid"><div><b>EDUCATION</b><br/>{PROFILE.degree}<br/>{PROFILE.college}<br/>{PROFILE.years}</div><div><b>ACADEMIC STATUS</b><br/>CGPA: {PROFILE.cgpa}<br/>2nd Year Undergraduate<br/>Chennai</div></div><div className="quote">“{PROFILE.motto}”</div></div>}
function Projects(){return <div className="explorer"><div className="path">C:\HEMAPRIYA\PROJECTS</div>{PROFILE.projects.map(p=><div className="file-row" key={p.id}><Icon type={p.icon}/><div><b>{p.title}</b><small>{p.type} · {p.status}</small></div></div>)}<p className="hint">Double-click a project to inspect it.</p></div>}
function ProjectDetail({project}){return <div className="paper"><div className="status-line">PROJECT STATUS: <b>{project.status}</b></div><h2>{project.icon} {project.title}</h2><p><b>Context:</b> {project.type}</p><p><b>Technology:</b> {project.tech}</p><p>{project.text}</p><div className="demo-box"><div>PROJECT.DAT</div><div className="bar"><span style={{width:'100%'}}/></div><small>Archive loaded successfully.</small></div></div>}
function Skills(){return <div className="paper"><h2>SKILLS.EXE</h2>{PROFILE.skills.map((s,i)=><div className="skill" key={s}><span>{s}</span><div className="meter"><i style={{width:[88,84,82,78,90,76][i]+'%'}}/></div></div>)}<hr/><h3>CURRENTLY EXPLORING</h3>{PROFILE.learning.map(x=><span className="tag" key={x}>{x}</span>)}<p className="hint">Meters are a playful visual, not a formal proficiency rating.</p></div>}
function Achievements(){return <div className="paper"><h2>ACHIEVEMENTS.EXE</h2>{PROFILE.awards.map(a=><div className="award" key={a}>🏆 <b>{a}</b></div>)}<h3>CERTIFICATIONS</h3>{PROFILE.certs.map(c=><div className="cert" key={c}>📜 {c}</div>)}</div>}
function Interests(){return <div className="paper"><h2>HEMAPRIYA'S INTERESTS</h2><p>Not everything needs to be a portfolio artifact. Some things are simply things I enjoy exploring.</p><div className="interest-grid">{PROFILE.interests.map(i=><div key={i}><Icon type={i==='Drawing'?'🎨':i==='Crochet'?'🧶':i==='Cooking'?'🍳':i==='Photography appreciation'?'📷':i==='Fashion'?'👗':i==='Anime / Donghua'?'🎬':'💻'}/><span>{i}</span></div>)}</div><div className="private-note">ART.EXE<br/><br/>This folder is private.<br/>Some things are made for the creator, not the internet. ♡</div></div>}
function Resume(){return <div className="paper resume"><h1>HEMAPRIYA</h1><div>Computer Science & Engineering Undergraduate · Chennai</div><hr/><h3>PROFILE</h3><p>{PROFILE.summary}</p><h3>EDUCATION</h3><p><b>{PROFILE.degree}</b><br/>{PROFILE.college} · {PROFILE.years} · CGPA {PROFILE.cgpa}</p><h3>PROJECTS</h3>{PROFILE.projects.map(p=><p key={p.id}><b>{p.title}</b> — {p.tech}. {p.text}</p>)}<h3>SKILLS</h3><p>{PROFILE.skills.join(' · ')}</p></div>}
function Terminal({onCommand}){const [lines,setLines]=useState(['Microsoft(R) MS-DOS','C:\\HEMAPRIYA> type HELP.TXT','Type help for commands.']);const [cmd,setCmd]=useState('');const ref=useRef();const run=e=>{if(e.key!=='Enter')return;const c=cmd.trim().toLowerCase();let out=[];if(c==='help')out=['about  projects  skills  achievements','resume  interests  whoami  coffee','anime   clear   shutdown'];else if(c==='about')out=['Opening ABOUT_ME.TXT...'];else if(c==='projects')out=['3 project folders found.'];else if(c==='skills')out=[PROFILE.skills.join(' · ')];else if(c==='achievements')out=PROFILE.awards;else if(c==='resume')out=['Resume viewer requested.'];else if(c==='interests')out=[PROFILE.interests.join(' · ')];else if(c==='whoami')out=['Hemapriya. CSE student. Builder. Creative at heart.','STATUS: STILL EXPLORING.'];else if(c==='coffee')out=['COFFEE.EXE','████████████████ 100%','Productivity +12   Sleep -7'];else if(c==='anime')out=['WARNING: You were supposed to be studying.','Starting episode 1...'];else if(c==='clear'){setLines([]);setCmd('');return}else if(c===''){out=[]}else out=['Bad command or file name. Type HELP.'];setLines(v=>[...v,`C:\\HEMAPRIYA> ${cmd}`,...out]);setCmd('');setTimeout(()=>ref.current?.scrollIntoView({behavior:'smooth'}),0)};return <div className="terminal"><div className="terminal-output">{lines.map((l,i)=><div key={i}>{l}</div>)}<div><span>C:\HEMAPRIYA&gt; </span><input autoFocus value={cmd} onChange={e=>setCmd(e.target.value)} onKeyDown={run}/></div><div ref={ref}/></div></div>}
function Minesweeper(){const [cells,setCells]=useState(()=>Array.from({length:25},()=>({mine:false,open:false})).map((x,i)=>[2,9,17,23].includes(i)?{...x,mine:true}:x));const click=i=>setCells(v=>v.map((x,j)=>j===i?{...x,open:true}:x));return <div className="game"><div className="game-counter">MINES: 4</div><div className="mine-grid">{cells.map((c,i)=><button key={i} onClick={()=>click(i)} className={c.open?'open':''}>{c.open?(c.mine?'💣':'') : ''}</button>)}</div><p className="hint">Tiny demo version — click tiles.</p></div>}

function App(){
  const [boot,setBoot]=useState(true); const [start,setStart]=useState(false); const [sound,setSound]=useState(false); const [time,setTime]=useState(new Date()); const [windows,setWindows]=useState({}); const [active,setActive]=useState(null); const [top,setTop]=useState(10); const [chaos,setChaos]=useState(false)
  useEffect(()=>{const t=setInterval(()=>setTime(new Date()),1000);return()=>clearInterval(t)},[])
  useEffect(()=>{const t=setTimeout(()=>setBoot(false),2600);return()=>clearTimeout(t)},[])
  const open=(id,title,icon,content,initial)=>{setWindows(v=>({...v,[id]:{title,icon,content,initial,min:false,z:top+1}}));setTop(t=>t+1);setActive(id);setStart(false)}
  const close=id=>setWindows(v=>{const n={...v};delete n[id];return n})
  const focus=id=>{setTop(t=>t+1);setActive(id);setWindows(v=>({...v,[id]:{...v[id],z:top+1}}))}
  const minimize=id=>setWindows(v=>({...v,[id]:{...v[id],min:true}}))
  const openAbout=()=>open(
  'about',
  'About Me',
  '👩‍💻',
  <About/>,
  {
    x: window.innerWidth - 600,
    y: window.innerHeight - 400,
    w: 600,
    h: 375
  }
)
  useEffect(()=>{
  if(!boot){
    openAbout()
  }
},[boot])
  const openProjects=()=>open('projects','My Projects','📁',<Projects/>,{x:300,y:100,w:620,h:400})
  const openSkills=()=>open('skills','Skills.exe','🛠️',<Skills/>,{x:350,y:90,w:560,h:430})
  const openAch=()=>open('ach','Achievements.exe','🏆',<Achievements/>,{x:270,y:90,w:650,h:470})
  const openResume=()=>open('resume','Resume.txt','📄',<Resume/>,{x:220,y:60,w:700,h:520})
  const openInterests=()=>open('interests','Interests','🎨',<Interests/>,{x:390,y:120,w:580,h:440})
  const openTerminal=()=>open('terminal','MS-DOS Prompt','⌨️',<Terminal/>,{x:180,y:100,w:680,h:430})
  const openMine=()=>open('mine','Minesweeper','💣',<Minesweeper/>,{x:450,y:100,w:360,h:410})
  const openContact=()=>open(
  'mail',
  'Mail',
  '✉️',
  <div className="paper">
    <h2>CONTACT ME</h2>
    <p>Find me on the internet:</p>

    <div className="contact-card">
      <p>
        📧 <b>Email:</b>{' '}
        <a href="mailto:hemapriyal0805@gmail.com">
          hemapriyal0805@gmail.com
        </a>
      </p>

      <p>
        💻 <b>GitHub:</b>{' '}
        <a
          href="https://github.com/hemapriya-hue"
          target="_blank"
          rel="noreferrer"
        >
          github.com/hemapriya
        </a>
      </p>

      <p>
        💼 <b>LinkedIn:</b>{' '}
        <a
          href="https://www.linkedin.com/in/hemapriya l"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/Hemapriya L
        </a>
      </p>
    </div>

    <p className="hint">
      Click a link to open it.
    </p>
  </div>,
  {x:400,y:90,w:560,h:360}
)
  const openComputer=()=>open('computer','My Computer','💻',<div className="explorer"><div className="path">C:\HEMAPRIYA</div><div className="file-row" onDoubleClick={openProjects}><Icon type="📁"/><div><b>PROJECTS</b><small>3 items</small></div></div><div className="file-row" onDoubleClick={openResume}><Icon type="📄"/><div><b>RESUME.TXT</b><small>Text Document</small></div></div><div className="file-row" onDoubleClick={openInterests}><Icon type="📁"/><div><b>INTERESTS</b><small>Private folder</small></div></div></div>,{x:300,y:70,w:600,h:420})
  const menu=[['about','About Me','👩‍💻',openAbout],['projects','My Projects','📁',openProjects],['skills','Skills','🛠️',openSkills],['ach','Achievements','🏆',openAch],['resume','Resume','📄',openResume],['interests','Interests','🎨',openInterests],['terminal','MS-DOS Prompt','⌨️',openTerminal],['mail','Mail','✉️',openContact],['mine','Games','💣',openMine]]
  const visible=useMemo(()=>Object.entries(windows),[windows])
  if(boot)return <div className="boot-screen"><div className="boot-inner"><div>HEMAPRIYA SYSTEMS BIOS v1.95</div><div>Copyright (C) 1998 Hemapriya</div><br/><div>Memory Test ............... 640K OK</div><div>Keyboard .................. OK</div><div>Mouse ..................... OK</div><div>Detecting IDE ............. OK</div><br/><div>Loading HEMAPRIYA.EXE</div><div className="boot-bar"><span/></div><div>Starting Windows 95...</div></div></div>
  return <div className={'desktop '+(chaos?'chaos':'')} onClick={()=>start&&setStart(false)}>

    <div className="desktop-grid">
      <DesktopIcon icon="💻" text="My Computer" onDouble={openComputer}/><DesktopIcon icon="📁" text="My Projects" onDouble={openProjects}/><DesktopIcon icon="👩‍💻" text="About Me" onDouble={openAbout}/><DesktopIcon icon="🏆" text="Achievements" onDouble={openAch}/><DesktopIcon icon="📄" text="Resume" onDouble={openResume}/><DesktopIcon icon="🛠️" text="Skills" onDouble={openSkills}/><DesktopIcon icon="🎨" text="Interests" onDouble={openInterests}/><DesktopIcon icon="⌨️" text="Terminal" onDouble={openTerminal}/><DesktopIcon icon="🎮" text="Games" onDouble={openMine}/><DesktopIcon icon="✉️" text="Mail" onDouble={openContact}/><DesktopIcon icon="🗑️" text="Recycle Bin" onDouble={()=>open('bin','Recycle Bin','🗑️',<div className="paper"><h2>RECYCLE BIN</h2><div className="file-row">📄 <b>motivation.txt</b></div><div className="file-row">📄 <b>sleep_schedule.txt</b></div><div className="file-row">📄 <b>project_final_FINAL2.txt</b></div><p>3 objects</p></div>,{x:430,y:110,w:500,h:350})}/>
    </div>
    <div className="desktop-center"></div>
    {visible.map(([id,w])=><div key={id} style={{zIndex:w.z}}>{<Window id={id} title={w.title} icon={w.icon} onClose={()=>close(id)} onFocus={()=>focus(id)} active={active===id} minimized={w.min} onMinimize={()=>minimize(id)} initial={w.initial}>{w.content}</Window>}</div>)}
    {start&&<div className="start-menu" onClick={e=>e.stopPropagation()}><div className="start-side">Windows<br/>95</div><div className="start-items">{menu.map(([id,label,icon,fn])=><button key={id} onClick={fn}><span>{icon}</span>{label}</button>)}<div className="start-sep"/><button onClick={()=>setChaos(true)}><span>⚠️</span>Full Chaos Mode</button><button onClick={()=>window.location.reload()}><span>🔄</span>Restart</button></div></div>}
    <div className="taskbar"><button className="start-button" onClick={e=>{e.stopPropagation();setStart(v=>!v)}}>▣ <b>Start</b></button><div className="task-buttons">{visible.map(([id,w])=><button className={active===id&&!w.min?'task-active':''} key={id} onClick={()=>{if(w.min){setWindows(v=>({...v,[id]:{...v[id],min:false}}))};focus(id)}}>{w.icon} {w.title}</button>)}</div><div className="tray"><button onClick={()=>setSound(v=>!v)}>{sound?'🔊':'🔇'}</button><span>ENG</span><span>{time.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span></div></div>
    {chaos&&<div className="chaos-popup" onClick={()=>setChaos(false)}><div className="dialog"><div className="titlebar"><span>⚠️ Windows 95</span><button onClick={()=>setChaos(false)}>×</button></div><div className="dialog-body"><div className="big-error">!</div><div>HEMAPRIYA.EXE has detected a severe shortage of motivation.<br/><br/>Attempting repair...</div></div><button className="win-btn" onClick={()=>setChaos(false)}>OK</button></div></div>}
  </div>
}
function DesktopIcon({icon,text,onDouble}){return <div className="desktop-icon" onDoubleClick={onDouble}><div className="desktop-icon-art">{icon}</div><div>{text}</div></div>}
export default App
