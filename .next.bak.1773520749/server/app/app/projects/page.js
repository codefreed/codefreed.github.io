(()=>{var e={};e.id=453,e.ids=[453],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},84770:e=>{"use strict";e.exports=require("crypto")},80665:e=>{"use strict";e.exports=require("dns")},17702:e=>{"use strict";e.exports=require("events")},92048:e=>{"use strict";e.exports=require("fs")},32615:e=>{"use strict";e.exports=require("http")},32694:e=>{"use strict";e.exports=require("http2")},98216:e=>{"use strict";e.exports=require("net")},19801:e=>{"use strict";e.exports=require("os")},55315:e=>{"use strict";e.exports=require("path")},35816:e=>{"use strict";e.exports=require("process")},76162:e=>{"use strict";e.exports=require("stream")},82452:e=>{"use strict";e.exports=require("tls")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},93985:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>l,routeModule:()=>m,tree:()=>c}),r(69630),r(66597),r(42417),r(35866);var a=r(23191),s=r(88716),i=r(37922),o=r.n(i),n=r(95231),d={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>n[e]);r.d(t,d);let c=["",{children:["app",{children:["projects",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,69630)),"/workspaces/codefreed.github.io/app/app/projects/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,66597)),"/workspaces/codefreed.github.io/app/app/layout.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,42417)),"/workspaces/codefreed.github.io/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,35866,23)),"next/dist/client/components/not-found-error"]}],l=["/workspaces/codefreed.github.io/app/app/projects/page.tsx"],p="/app/projects/page",u={require:r,loadChunk:()=>Promise.resolve()},m=new a.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/app/projects/page",pathname:"/app/projects",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},69839:(e,t,r)=>{Promise.resolve().then(r.bind(r,78882))},78882:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>f});var a=r(10326),s=r(17577),i=r(90434),o=r(35047),n=r(85999),d=r(52438),c=r(30901),l=r(90772),p=r(28946),u=r(23878),m=r(51989);function f(){let[e,t]=(0,s.useState)([]),[r,f]=(0,s.useState)(!1),{user:g}=(0,p.a)(),h=(0,o.useRouter)(),{files:b,loadProject:x}=(0,m.i)(),j=g?.uid??"guest",v=async()=>{try{f(!0);let r=await (0,u.$L)(j,`Project ${e.length+1}`,b);t(e=>[r.project,...e]),n.Am.success("Project created")}catch{n.Am.error("Project creation failed")}finally{f(!1)}},y=async e=>{let t=await (0,u.Cb)(e);if(!t){n.Am.error("Project not found");return}x({projectId:t.project.id,projectName:t.project.name,files:t.files,versions:t.versions,messages:t.messages}),h.push("/app")};return a.jsx(d.V,{children:(0,a.jsxs)(c.O,{className:"h-full",children:[(0,a.jsxs)("div",{className:"mb-4 flex items-center justify-between",children:[a.jsx("h1",{className:"text-xl font-semibold",children:"Projects"}),(0,a.jsxs)("div",{className:"flex gap-2",children:[a.jsx(l.z,{onClick:v,disabled:r,children:"New Project"}),a.jsx(i.default,{href:"/app",children:a.jsx(l.z,{variant:"secondary",children:"Back to Builder"})})]})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[e.map(e=>(0,a.jsxs)("button",{className:"glass w-full rounded-2xl p-3 text-left",onClick:()=>y(e.id),type:"button",children:[a.jsx("div",{className:"font-medium",children:e.name}),a.jsx("div",{className:"text-xs text-slate-600 dark:text-slate-300",children:e.id})]},e.id)),e.length?null:a.jsx("p",{className:"text-sm text-slate-600 dark:text-slate-300",children:"No projects yet. Create one to get started."})]})]})})}},23878:(e,t,r)=>{"use strict";r.d(t,{$L:()=>g,Cb:()=>b,NK:()=>v,Ux:()=>x,dw:()=>h,rW:()=>j});var a=r(76),s=r(22665),i=r(58996);let o="codedai-projects",n="local-project";function d(e,t,r=45e3){let a;return Promise.race([e.finally(()=>{a&&clearTimeout(a)}),new Promise((e,s)=>{a=setTimeout(()=>{s(Error(`${t} timed out after ${Math.round(r/1e3)}s. Check Firebase rules and your connection, then try again.`))},r)})])}async function c(e,t,r){if(!t.length)return;let s=Math.ceil(t.length/400);for(let i=0;i<t.length;i+=400){let o=(0,a.qs)(e);for(let e of t.slice(i,i+400))e(o);let n=Math.floor(i/400)+1,c=s>1?` (${n}/${s})`:"";await d(o.commit(),`${r}${c}`)}}function l(e,t=Date.now()){return"number"==typeof e?e:e&&"object"==typeof e&&"toMillis"in e&&"function"==typeof e.toMillis?e.toMillis():t}function p(e){return e.trim()||"Untitled Project"}function u(e){let t=m(),r=t.findIndex(t=>t.project.id===e.project.id);r>=0?t[r]=e:t.unshift(e),f(t)}function m(){let e=localStorage.getItem(o);if(!e)return[];try{return JSON.parse(e)}catch{return[]}}function f(e){localStorage.setItem(o,JSON.stringify(e))}async function g(e,t,r){let o=Date.now(),n={id:(0,s.Z)(),ownerId:e,name:p(t),createdAt:o,updatedAt:o,currentVersionId:"init"},l={project:n,files:r,versions:[{id:"init",createdAt:o,commitMessage:"Initial scaffold",files:r}],messages:[]},m=(0,i.Ht)();if(m)try{await d((0,a.pl)((0,a.JU)(m.db,"projects",n.id),{ownerId:e,name:n.name,createdAt:(0,a.Bt)(),updatedAt:(0,a.Bt)(),currentVersionId:"init"}),"Creating Firebase project"),await c(m.db,[e=>e.set((0,a.JU)(m.db,"projects",n.id,"versions","init"),{createdAt:(0,a.Bt)(),commitMessage:"Initial scaffold",files:r})],"Saving initial project version")}catch{}return u(l),l}async function h(e){let t=(0,i.Ht)(),r=Date.now(),o=e.projectId===n,l=o?(0,s.Z)():e.projectId,m=p(e.name),f={id:"init",createdAt:r,commitMessage:"Initial scaffold",files:e.files},g=e.versions.length?e.versions:[f],h=g[g.length-1],b={project:{id:l,ownerId:e.ownerId,name:m,createdAt:g[0]?.createdAt??r,updatedAt:r,currentVersionId:h?.id},files:e.files,versions:g,messages:[...e.messages].sort((e,t)=>e.createdAt-t.createdAt)};if(t){let r=(0,a.JU)(t.db,"projects",l);try{o&&await d((0,a.pl)(r,{ownerId:e.ownerId,name:m,createdAt:(0,a.Bt)(),updatedAt:(0,a.Bt)(),currentVersionId:h?.id??null},{merge:!0}),"Creating Firebase project");let s=[];for(let i of(o||s.push(t=>t.set(r,{ownerId:e.ownerId,name:m,updatedAt:(0,a.Bt)(),currentVersionId:h?.id??null},{merge:!0})),b.versions))s.push(e=>e.set((0,a.JU)(t.db,"projects",l,"versions",i.id),{createdAt:i.createdAt,commitMessage:i.commitMessage,files:i.files}));for(let e of b.messages)s.push(r=>r.set((0,a.JU)(t.db,"projects",l,"chats","main","messages",e.id),{role:e.role,content:e.content,createdAt:e.createdAt,versionIdApplied:e.versionIdApplied??null,diffSummary:e.diffSummary??[]}));await c(t.db,s,"Saving project to Firebase")}catch{}}return u(b),b}async function b(e){let t=m().find(t=>t.project.id===e),r=(0,i.Ht)();if(!r)return t??null;try{let s=(0,a.JU)(r.db,"projects",e),i=await (0,a.QT)(s);if(!i.exists())return t??null;let o=await (0,a.PL)((0,a.hJ)(r.db,"projects",e,"versions")),n=await (0,a.PL)((0,a.hJ)(r.db,"projects",e,"chats","main","messages")),d=o.docs.map(e=>({id:e.id,...e.data()})).map(e=>e).map(e=>({id:String(e.id),createdAt:l(e.createdAt),commitMessage:String(e.commitMessage??"Update files"),files:e.files??{}})).sort((e,t)=>e.createdAt-t.createdAt),c=d[d.length-1],p=n.docs.map(e=>{let t=e.data();return{id:e.id,role:t.role,content:t.content,createdAt:l(t.createdAt),versionIdApplied:t.versionIdApplied,diffSummary:t.diffSummary}}).sort((e,t)=>e.createdAt-t.createdAt);return{project:{id:i.id,ownerId:i.data().ownerId,name:i.data().name,createdAt:l(i.data().createdAt),updatedAt:l(i.data().updatedAt),currentVersionId:i.data().currentVersionId},files:c?.files??t?.files??{},versions:d.length?d:t?.versions??[],messages:p.length?p:t?.messages??[]}}catch{return t??null}}async function x(e,t,r,o){let c=(0,s.Z)(),l={id:c,createdAt:Date.now(),commitMessage:t,files:r},p=(0,i.Ht)();if(p&&e!==n)try{let s=(0,a.qs)(p.db);s.set((0,a.JU)(p.db,"projects",e,"versions",c),{createdAt:(0,a.Bt)(),commitMessage:t,files:r}),s.update((0,a.JU)(p.db,"projects",e),{currentVersionId:c,updatedAt:(0,a.Bt)()}),o&&s.set((0,a.JU)(p.db,"projects",e,"chats","main","messages",o.id),{role:o.role,content:o.content,createdAt:(0,a.Bt)(),versionIdApplied:o.versionIdApplied,diffSummary:o.diffSummary??[]}),await d(s.commit(),"Syncing project changes")}catch{}let u=m(),g=u.findIndex(t=>t.project.id===e);return g>=0&&(u[g].versions.push(l),u[g].files=r,o&&u[g].messages.push(o),u[g].project.updatedAt=Date.now(),u[g].project.currentVersionId=c),f(u),c}async function j(e,t){let r=(0,i.Ht)();if(r&&e!==n)try{await d((0,a.pl)((0,a.JU)(r.db,"projects",e,"chats","main","messages",t.id),{role:t.role,content:t.content,createdAt:(0,a.Bt)()}),"Syncing chat message")}catch{}let s=m(),o=s.findIndex(t=>t.project.id===e);o>=0&&s[o].messages.push(t),f(s)}async function v(e,t){let r=(0,i.Ht)();if(localStorage.setItem("codedai-firebase-config",JSON.stringify(t)),r&&e)try{await (0,a.pl)((0,a.JU)(r.db,"users",e,"settings","firebase"),{config:t,savedAt:(0,a.Bt)()})}catch{}}},51989:(e,t,r)=>{"use strict";let a;r.d(t,{i:()=>u});var s=r(17577);let i=e=>{let t;let r=new Set,a=(e,a)=>{let s="function"==typeof e?e(t):e;if(!Object.is(s,t)){let e=t;t=(null!=a?a:"object"!=typeof s||null===s)?s:Object.assign({},t,s),r.forEach(r=>r(t,e))}},s=()=>t,i={setState:a,getState:s,getInitialState:()=>o,subscribe:e=>(r.add(e),()=>r.delete(e))},o=t=e(a,s,i);return i},o=e=>e?i(e):i,n=e=>e,d=e=>{let t=o(e),r=e=>(function(e,t=n){let r=s.useSyncExternalStore(e.subscribe,s.useCallback(()=>t(e.getState()),[e,t]),s.useCallback(()=>t(e.getInitialState()),[e,t]));return s.useDebugValue(r),r})(t,e);return Object.assign(r,t),r};var c=r(22665);let l={"app/layout.tsx":`import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`,"app/globals.css":`:root {
  color-scheme: dark;
  --bg: #07111f;
  --bg-accent: #0f1f38;
  --surface: rgba(10, 19, 35, 0.72);
  --surface-strong: rgba(15, 27, 49, 0.88);
  --border: rgba(148, 163, 184, 0.18);
  --text: #e5eefc;
  --muted: #9fb0ca;
  --brand: #7dd3fc;
  --brand-strong: #38bdf8;
  --glow: rgba(56, 189, 248, 0.32);
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  min-height: 100%;
  font-family: "Inter", "Segoe UI", sans-serif;
  background:
    radial-gradient(circle at top left, rgba(56, 189, 248, 0.16), transparent 30%),
    radial-gradient(circle at top right, rgba(129, 140, 248, 0.16), transparent 26%),
    linear-gradient(180deg, var(--bg), var(--bg-accent));
  color: var(--text);
}

body {
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
}

.page-shell {
  min-height: 100vh;
  padding: 56px 20px;
}

.hero-card {
  width: min(960px, 100%);
  margin: 0 auto;
  padding: 48px;
  border-radius: 32px;
  background: linear-gradient(180deg, rgba(15, 27, 49, 0.92), rgba(8, 15, 28, 0.9));
  border: 1px solid var(--border);
  box-shadow: 0 30px 80px rgba(2, 8, 23, 0.45);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(125, 211, 252, 0.12);
  color: var(--brand);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero-title {
  margin: 20px 0 16px;
  font-size: clamp(2.8rem, 7vw, 5.8rem);
  line-height: 0.94;
  letter-spacing: -0.05em;
}

.hero-copy {
  max-width: 640px;
  margin: 0;
  color: var(--muted);
  font-size: 1.05rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.primary-button,
.secondary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1px solid transparent;
  transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
}

.primary-button {
  background: linear-gradient(135deg, var(--brand), var(--brand-strong));
  color: #03111f;
  box-shadow: 0 14px 40px var(--glow);
}

.secondary-button {
  background: rgba(148, 163, 184, 0.08);
  border-color: var(--border);
  color: var(--text);
}

.primary-button:hover,
.secondary-button:hover {
  transform: translateY(-1px);
}

.feature-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-top: 36px;
}

.feature-card {
  padding: 20px;
  border-radius: 22px;
  background: var(--surface);
  border: 1px solid var(--border);
}

.feature-card h2 {
  margin: 0 0 8px;
  font-size: 1rem;
}

.feature-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
}

@media (max-width: 720px) {
  .hero-card {
    padding: 28px 22px;
  }
}
`,"app/page.tsx":`export default function Page() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="eyebrow">CodedAI starter</div>
        <h1 className="hero-title">Start chatting and shape the site from here.</h1>
        <p className="hero-copy">
          Describe the business, the vibe, and what the page should do. The builder can expand this into a fuller
          layout with real styling and supporting files.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#build">
            Generate the site
          </a>
          <a className="secondary-button" href="#ideas">
            Explore ideas
          </a>
        </div>
        <div className="feature-grid">
          <article className="feature-card">
            <h2>Polished foundation</h2>
            <p>The preview now starts with real CSS so new projects do not look raw and unfinished.</p>
          </article>
          <article className="feature-card">
            <h2>Versioned changes</h2>
            <p>Each AI pass can add or revise files while keeping a history of what changed.</p>
          </article>
          <article className="feature-card">
            <h2>Faster iteration</h2>
            <p>Use the chat to restyle, restructure, or refine the experience without hand-editing everything.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
`},p={id:"init",createdAt:Date.now(),commitMessage:"Initial scaffold",files:l},u=(a=(e,t)=>({projectId:"local-project",projectName:"Untitled Project",files:l,versions:[p],messages:[],isSaving:!1,setProjectName:t=>e({projectName:t}),loadProject:({projectId:t,projectName:r,files:a,versions:s,messages:i})=>{e({projectId:t,projectName:r,files:a,versions:s,messages:i})},setSaving:t=>e({isSaving:t}),markSaved:()=>e({lastSavedAt:Date.now()}),addUserMessage:t=>{let r=(0,c.Z)(),a={id:r,role:"user",content:t,createdAt:Date.now()};return e(e=>({messages:[...e.messages,a]})),r},applyAiResponse:r=>{let a=t(),{next:s,diffSummary:i}=function(e,t){let r={...e},a=[];for(let e of t){if("delete"===e.type){delete r[e.path],a.push(`Deleted ${e.path}`);continue}let t=Object.prototype.hasOwnProperty.call(r,e.path);r[e.path]=e.content??"",a.push(`${t?"Updated":"Created"} ${e.path}`)}return{next:r,diffSummary:a}}(a.files,r.file_ops),o=(0,c.Z)(),n={id:o,createdAt:Date.now(),commitMessage:r.commit_message,files:s},d={id:(0,c.Z)(),role:"assistant",content:r.assistant_message,createdAt:Date.now(),versionIdApplied:o,diffSummary:i};return e({files:s,versions:[...a.versions,n],messages:[...a.messages,d]}),{versionId:o,diffSummary:i}},rollbackVersion:r=>{let a=t().versions.find(e=>e.id===r);a&&e({files:a.files})},resetProject:()=>{e({projectId:"local-project",projectName:"Untitled Project",files:l,versions:[{...p,createdAt:Date.now()}],messages:[],isSaving:!1,lastSavedAt:void 0})}}))?d(a):d},69630:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});let a=(0,r(68570).createProxy)(String.raw`/workspaces/codefreed.github.io/app/app/projects/page.tsx#default`)}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[948,75,404,898,617],()=>r(93985));module.exports=a})();