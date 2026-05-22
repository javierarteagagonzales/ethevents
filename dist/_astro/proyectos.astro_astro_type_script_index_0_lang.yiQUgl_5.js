const h=document.getElementById("projects-data");let a=JSON.parse(h?.getAttribute("data-projects")||"[]");const v=sessionStorage.getItem("eth_admin_logged")==="true",p=v?localStorage.getItem("eth_members_admin_list"):null;if(p)try{const e=JSON.parse(p);e.forEach(t=>{t.eventIds&&!t.events&&(t.events=t.eventIds.map(o=>({eventId:o,role:t.role||"Voluntario"})))});const s=["Lead de Eth Lima","Core Team","Coordinador de Tecnología","Coordinador de Logística","Coordinador de Alianzas","Coordinador de Comunicaciones","Lead del Proyecto","Voluntario"];a.forEach(t=>{t.members=e.filter(o=>o.events&&o.events.some(r=>r.eventId===t.id)).map(o=>{const r=o.events.find(n=>n.eventId===t.id);return{...o,eventRole:r?r.role:o.role}}).sort((o,r)=>{const n=s.indexOf(o.eventRole),l=s.indexOf(r.eventRole);return(n===-1?99:n)-(l===-1?99:l)})})}catch(e){console.error("Error parsing local members data",e)}const x=document.getElementById("project-list"),u=document.getElementById("team-placeholder"),d=document.getElementById("team-content");let c=null;const g={conference:"bg-blue-500/10 text-blue-400 border-blue-500/25",workshop:"bg-emerald-500/10 text-emerald-400 border-emerald-500/25",hackathon:"bg-amber-500/10 text-amber-400 border-amber-500/25",meetup:"bg-purple-500/10 text-purple-400 border-purple-500/25",bootcamp:"bg-indigo-500/10 text-indigo-400 border-indigo-500/25",cohorte:"bg-pink-500/10 text-pink-400 border-pink-500/25",buildathon:"bg-teal-500/10 text-teal-400 border-teal-500/25"},w={"Lead de Eth Lima":"text-amber-400","Core Team":"text-accent-2","Coordinador de Tecnología":"text-emerald-400","Coordinador de Logística":"text-orange-400","Coordinador de Alianzas":"text-purple-400","Coordinador de Comunicaciones":"text-pink-400","Lead del Proyecto":"text-cyan-400",Voluntario:"text-muted"};function $(e){switch(e){case"x":return"𝕏";case"instagram":return"📸";case"linkedin":return"💼";default:return"🔗"}}function b(){x&&(x.innerHTML="",a.forEach(e=>{const s=c===e.id,t=g[e.type?.toLowerCase()]||g.meetup,o=e.date?new Date(e.date+"T00:00").toLocaleDateString("es-PE",{day:"numeric",month:"short",year:"numeric"}):"TBD",r=document.createElement("div");r.className=`project-item w-full rounded-2xl border border-white/5 bg-surface backdrop-blur-xl p-4 sm:p-5 ${s?"active":""}`,r.innerHTML=`
        <div class="flex flex-col h-full gap-3">
          <div class="flex items-center gap-2">
            <span class="font-mono text-[9px] px-2 py-0.5 rounded-full uppercase border ${t}">${e.type}</span>
            <span class="font-mono text-[9px] text-muted bg-white/5 px-2 py-0.5 rounded-full">${o}</span>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-white text-sm md:text-base leading-tight line-clamp-2 mb-1.5">${e.title}</h3>
            <p class="font-mono text-[10px] text-muted flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span class="truncate">${e.location||"Online"}</span>
            </p>
          </div>
          <div class="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
            <span class="font-mono text-[10px] text-muted flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-accent/50"></span> ${e.members.length} miembros</span>
            <div class="arrow-icon w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-muted transition-all duration-300">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </div>
        </div>
      `,r.addEventListener("click",()=>{c!==e.id&&(c=e.id,b(),f(e),window.innerWidth<1024&&document.getElementById("team-panel")?.scrollIntoView({behavior:"smooth",block:"start"}))}),x.appendChild(r)}))}function f(e){if(!d)return;if(u&&u.classList.add("hidden"),d.classList.remove("hidden"),e.members.length===0){d.innerHTML=`
        <div class="rounded-3xl border border-accent/20 bg-gradient-to-br from-[#0c1020]/90 to-[#07090e]/90 backdrop-blur-xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(98,126,234,0.05)] animate-fade-in">
          <div class="flex items-center gap-3 mb-6">
            ${e.image?`<img src="${e.image}" alt="" class="w-10 h-10 rounded-xl object-cover flex-shrink-0 border border-white/10"/>`:""}
            <div class="min-w-0">
              <h2 class="text-base sm:text-lg font-extrabold text-white leading-tight">${e.title}</h2>
              <p class="font-mono text-[10px] text-muted mt-1">${e.date||"TBD"}</p>
            </div>
          </div>
          <div class="flex items-center justify-center p-12 rounded-2xl border border-white/5 bg-black/20">
            <p class="font-mono text-xs text-muted">// Equipo aún no asignado para este proyecto.</p>
          </div>
        </div>
      `;return}const s=e.members.map((t,o)=>{const r=w[t.eventRole||t.role]||"text-muted",n=Object.entries(t.social||{}).filter(([m,i])=>i&&i.trim()!=="").map(([m,i])=>`<a href="${i}" target="_blank" rel="noopener" class="hover:scale-110 transition-transform text-sm" title="${m}">${$(m)}</a>`).join(""),l=t.photo?`<img src="${t.photo}" alt="${t.name}" class="member-photo w-full rounded-xl border border-white/10"/>`:`<div class="member-photo w-full rounded-xl border border-white/10 bg-surface-2 flex items-center justify-center text-3xl text-muted">${t.name.charAt(0).toUpperCase()}</div>`;return`
        <div class="member-card rounded-2xl border border-white/5 bg-surface backdrop-blur-xl p-3 sm:p-4 flex flex-col items-center text-center gap-2 sm:gap-3 hover:border-accent/30 transition-all" style="animation-delay: ${o*80}ms">
          <div class="w-16 h-16 sm:w-24 sm:h-24 rounded-xl overflow-hidden relative group flex-shrink-0">
            ${l}
            <div class="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm p-1 text-[8px] font-mono font-bold uppercase tracking-widest text-white/90 translate-y-full group-hover:translate-y-0 transition-transform">
              Área: ${t.area||"General"}
            </div>
          </div>
          <div class="flex flex-col gap-0.5 min-w-0 w-full">
            <span class="font-bold text-white text-[11px] sm:text-sm">${t.name}</span>
            <span class="font-mono text-[9px] sm:text-[10px] ${r} font-bold uppercase tracking-wider line-clamp-2">${t.eventRole||t.role}</span>
          </div>
          ${n?`<div class="flex items-center gap-2">${n}</div>`:""}
        </div>
      `}).join("");d.innerHTML=`
      <div class="rounded-3xl border border-accent/20 bg-gradient-to-br from-[#0c1020]/90 to-[#07090e]/90 backdrop-blur-xl p-5 sm:p-6 md:p-8 shadow-[0_8px_32px_rgba(98,126,234,0.08)]">
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 pb-4 border-b border-white/5">
          <div class="flex items-center gap-3 flex-1 min-w-0">
            ${e.image?`<img src="${e.image}" alt="" class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-white/10 flex-shrink-0"/>`:""}
            <div class="min-w-0">
              <h2 class="text-base sm:text-lg font-extrabold text-white leading-tight">${e.title}</h2>
              <p class="font-mono text-[9px] sm:text-[10px] text-muted mt-0.5">${e.location||"Online"} · ${e.date||"TBD"}</p>
            </div>
          </div>
          <div class="flex-shrink-0 self-start sm:self-auto">
            <span class="font-mono text-[9px] sm:text-[10px] text-accent-2 font-bold bg-accent/10 border border-accent/25 px-3 py-1.5 rounded-full inline-block">${e.members.length} miembros</span>
          </div>
        </div>
        <p class="text-xs text-muted mb-6 leading-relaxed line-clamp-3">${(e.description||"").substring(0,200)}</p>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4">
          ${s}
        </div>
      </div>
    `}b();a.length>0&&(c=a[0].id,b(),f(a[0]));
