const h=document.getElementById("projects-data");let i=JSON.parse(h?.getAttribute("data-projects")||"[]");const p=localStorage.getItem("eth_members_admin_list");if(p)try{const e=JSON.parse(p),n=["Lead de Eth Lima","Core Team","Coordinador de Tecnología","Coordinador de Logística","Coordinador de Alianzas","Coordinador de Comunicaciones","Lead del Proyecto","Voluntario"];i.forEach(t=>{t.members=e.filter(o=>o.eventIds&&o.eventIds.includes(t.id)).sort((o,r)=>{const d=n.indexOf(o.role),l=n.indexOf(r.role);return(d===-1?99:d)-(l===-1?99:l)})})}catch(e){console.error("Error parsing local members data",e)}const u=document.getElementById("accordion-list"),m=document.getElementById("team-placeholder"),a=document.getElementById("team-content");let s=null;const f={conference:"bg-blue-500/10 text-blue-400 border-blue-500/25",workshop:"bg-emerald-500/10 text-emerald-400 border-emerald-500/25",hackathon:"bg-amber-500/10 text-amber-400 border-amber-500/25",meetup:"bg-purple-500/10 text-purple-400 border-purple-500/25",bootcamp:"bg-indigo-500/10 text-indigo-400 border-indigo-500/25",cohorte:"bg-pink-500/10 text-pink-400 border-pink-500/25",buildathon:"bg-teal-500/10 text-teal-400 border-teal-500/25"},v={"Lead de Eth Lima":"text-amber-400","Core Team":"text-accent-2","Coordinador de Tecnología":"text-emerald-400","Coordinador de Logística":"text-orange-400","Coordinador de Alianzas":"text-purple-400","Coordinador de Comunicaciones":"text-pink-400","Lead del Proyecto":"text-cyan-400",Voluntario:"text-muted"};function w(e){switch(e){case"x":return"𝕏";case"instagram":return"📸";case"linkedin":return"💼";default:return"🔗"}}function x(){u&&(u.innerHTML="",i.forEach(e=>{const n=s===e.id,t=f[e.type?.toLowerCase()]||f.meetup,o=e.date?new Date(e.date+"T00:00").toLocaleDateString("es-PE",{day:"numeric",month:"short",year:"numeric"}):"TBD",r=document.createElement("div");r.className=`accordion-item rounded-2xl border border-white/5 bg-surface backdrop-blur-xl p-4 ${n?"active":""}`,r.innerHTML=`
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="font-mono text-[9px] px-2 py-0.5 rounded-full uppercase border ${t}">${e.type}</span>
              <span class="font-mono text-[9px] text-muted">${o}</span>
            </div>
            <h3 class="font-bold text-white text-sm leading-tight truncate">${e.title}</h3>
            <p class="font-mono text-[9px] text-muted mt-1 flex items-center gap-1">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${e.location||"Online"}
            </p>
          </div>
          <div class="flex flex-col items-end gap-1.5">
            <span class="font-mono text-[9px] text-accent font-bold">${e.members.length} 👤</span>
            <svg class="accordion-arrow w-4 h-4 text-muted transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
        </div>
      `,r.addEventListener("click",()=>{s===e.id?(s=null,x(),$()):(s=e.id,x(),g(e))}),u.appendChild(r)}))}function $(){m&&m.classList.remove("hidden"),a&&a.classList.add("hidden")}function g(e){if(!a)return;if(m&&m.classList.add("hidden"),a.classList.remove("hidden"),e.members.length===0){a.innerHTML=`
        <div class="rounded-3xl border border-white/5 bg-surface backdrop-blur-xl p-8">
          <div class="flex items-center gap-3 mb-6">
            ${e.image?`<img src="${e.image}" alt="" class="w-10 h-10 rounded-xl object-cover"/>`:""}
            <div>
              <h2 class="text-lg font-extrabold text-white">${e.title}</h2>
              <p class="font-mono text-[10px] text-muted">${e.date||"TBD"}</p>
            </div>
          </div>
          <div class="flex items-center justify-center p-12 rounded-2xl border border-white/5 bg-black/20">
            <p class="font-mono text-xs text-muted">// Equipo aún no asignado para este proyecto.</p>
          </div>
        </div>
      `;return}const n=e.members.map((t,o)=>{const r=v[t.role]||"text-muted",d=Object.entries(t.social||{}).filter(([b,c])=>c&&c.trim()!=="").map(([b,c])=>`<a href="${c}" target="_blank" rel="noopener" class="hover:scale-110 transition-transform text-sm" title="${b}">${w(b)}</a>`).join(""),l=t.photo?`<img src="${t.photo}" alt="${t.name}" class="member-photo w-full rounded-xl border border-white/10"/>`:`<div class="member-photo w-full rounded-xl border border-white/10 bg-surface-2 flex items-center justify-center text-3xl text-muted">${t.name.charAt(0).toUpperCase()}</div>`;return`
        <div class="member-card rounded-2xl border border-white/5 bg-surface backdrop-blur-xl p-4 flex flex-col items-center text-center gap-3 hover:border-accent/30 transition-all" style="animation-delay: ${o*80}ms">
          <div class="w-24 h-24 rounded-xl overflow-hidden">
            ${l}
          </div>
          <div class="flex flex-col gap-0.5">
            <span class="font-bold text-white text-sm">${t.name}</span>
            <span class="font-mono text-[10px] ${r} font-bold uppercase tracking-wider">${t.role}</span>
          </div>
          ${d?`<div class="flex items-center gap-2.5">${d}</div>`:""}
        </div>
      `}).join("");a.innerHTML=`
      <div class="rounded-3xl border border-white/5 bg-surface backdrop-blur-xl p-6 md:p-8">
        <div class="flex items-center gap-4 mb-6 pb-4 border-b border-white/5">
          ${e.image?`<img src="${e.image}" alt="" class="w-12 h-12 rounded-xl object-cover border border-white/10"/>`:""}
          <div class="flex-1">
            <h2 class="text-lg font-extrabold text-white">${e.title}</h2>
            <p class="font-mono text-[10px] text-muted mt-0.5">${e.location||"Online"} · ${e.date||"TBD"}</p>
          </div>
          <span class="font-mono text-[10px] text-accent-2 font-bold bg-accent/10 border border-accent/25 px-3 py-1 rounded-full">${e.members.length} miembros</span>
        </div>
        <p class="text-xs text-muted mb-6 leading-relaxed line-clamp-3">${(e.description||"").substring(0,200)}</p>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          ${n}
        </div>
      </div>
    `}x();i.length>0&&(s=i[0].id,x(),g(i[0]));
