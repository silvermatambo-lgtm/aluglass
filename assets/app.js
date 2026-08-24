(() => {
  const S = window.SITE;
  const $ = (q, r=document) => r.querySelector(q), $$=(q,r=document)=>[...r.querySelectorAll(q)];
  document.documentElement.style.setProperty('--primary',S.colors.primary);document.documentElement.style.setProperty('--secondary',S.colors.secondary);document.documentElement.style.setProperty('--accent',S.colors.accent);document.documentElement.style.setProperty('--dark',S.colors.dark);
  const wa = m => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(m)}`;
  const page = document.body.dataset.page || 'home';
  const nav = S.nav.map(([l,h])=>`<a class="${page===l.toLowerCase()?'active':''}" href="${h}">${l}</a>`).join('');
  $('#siteHeader').innerHTML=`<header class="header"><a class="brand" href="/"><img src="${S.logo}" alt="${S.name} logo"><span><strong>${S.shortName}</strong><small>${S.slogan}</small></span></a><nav class="desktopNav">${nav}</nav><button id="menuBtn" class="menuBtn" aria-label="Menu">☰</button></header><div id="mobileMenu" class="mobileMenu">${nav}</div>`;
  $('#menuBtn').onclick=()=>$('#mobileMenu').classList.toggle('open');
  $('#siteFooter').innerHTML=`<footer><div class="footerGrid"><div><h3>${S.name}</h3><p>${S.description}</p></div><div><h4>Contact</h4><p>${S.phoneDisplay}<br>${S.email}<br>${S.website}<br>${S.address}</p></div><div><h4>Quick Links</h4>${S.nav.map(([l,h])=>`<a href="${h}">${l}</a>`).join('')}</div></div><div class="footerBottom">© ${new Date().getFullYear()} ${S.name}. Website designed by <a target="_blank" href="${S.footer.designerUrl}">${S.footer.designerName}</a> | ${S.footer.designerPhoneDisplay}</div></footer>`;
  // Populate client content from the single master config file.
  $$('.js-name').forEach(el=>el.textContent=S.name);$$('.js-slogan').forEach(el=>el.textContent=S.slogan);$$('.js-description').forEach(el=>el.textContent=S.description);$$('.js-about-heading').forEach(el=>el.textContent=S.about.heading);$$('.js-about-intro').forEach(el=>el.textContent=S.about.intro);
  if($('#aboutParagraphs')) $('#aboutParagraphs').innerHTML=S.about.paragraphs.map(p=>`<p class="leadSmall">${p}</p>`).join('');
  if($('#valuesGrid')) $('#valuesGrid').innerHTML=S.about.values.map((v,i)=>`<article class="card lift"><div class="cardIcon">0${i+1}</div><h3>${v}</h3><p>Professional standards, reliable communication and a customer-first approach are built into every project.</p></article>`).join('');
  if($('#servicesGrid')) $('#servicesGrid').innerHTML=S.services.map((x,i)=>`<article class="card serviceCard lift"><div class="cardIcon">${String(i+1).padStart(2,'0')}</div><h3>${x.title}</h3><p>${x.text}</p><a target="_blank" href="${wa('Hello '+S.name+', I am interested in '+x.title+'.')}">Enquire on WhatsApp →</a></article>`).join('');
  if($('#servicesPreview')) $('#servicesPreview').innerHTML=S.services.slice(0,4).map((x,i)=>`<article class="card lift"><div class="cardIcon">0${i+1}</div><h3>${x.title}</h3><p>${x.text}</p></article>`).join('');
  $$('.stats').forEach(el=>el.innerHTML=S.stats.map(x=>`<div class="stat"><div class="counterNum" data-value="${x.value}" data-suffix="${x.suffix}">0${x.suffix}</div><span>${x.label}</span></div>`).join(''));
  if($('#galleryGrid')) $('#galleryGrid').innerHTML=S.gallery.map(x=>`<figure class="galleryItem"><img src="${x.url}" alt="${x.alt}" loading="lazy"><figcaption>${x.alt}</figcaption></figure>`).join('');
  if($('#galleryPreview')) $('#galleryPreview').innerHTML=S.gallery.slice(0,6).map(x=>`<figure class="galleryItem"><img src="${x.url}" alt="${x.alt}" loading="lazy"><figcaption>${x.alt}</figcaption></figure>`).join('');
  if($('#faqList')) $('#faqList').innerHTML=S.faqs.map(f=>`<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('');
  $$('.waQuote').forEach(a=>a.href=wa('Hello '+S.name+', I would like a quote.'));$$('.telLink').forEach(a=>a.href='tel:'+S.phoneTel);
  if($('#contactDetails')) $('#contactDetails').innerHTML=`<p><b>Phone:</b> ${S.phoneDisplay}</p><p><b>Email:</b> ${S.email}</p><p><b>Website:</b> ${S.website}</p><p><b>Address:</b> ${S.address}</p>`;
  const form=$('#contactForm'); if(form) form.onsubmit=e=>{e.preventDefault();const fd=new FormData(form);open(wa(`Website enquiry\nName: ${fd.get('name')}\nPhone: ${fd.get('phone')}\nService: ${fd.get('service')}\nMessage: ${fd.get('message')}`),'_blank')};
  if($('#serviceSelect')) $('#serviceSelect').innerHTML='<option value="" disabled selected>Select a service</option>'+S.services.map(x=>`<option>${x.title}</option>`).join('');
  // Service worker
  if('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(()=>{});
  let deferredPrompt=null; window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;});
  const isStandalone=()=>matchMedia('(display-mode: standalone)').matches||window.navigator.standalone;
  const install=async()=>{if(isStandalone())return alert('This website is already installed.');if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;return;}if(/iphone|ipad|ipod/i.test(navigator.userAgent)){showInstallHelp();return;}alert("Use your browser menu and choose 'Install app' or 'Add to Home screen'. On Safari use Share → Add to Home Screen.");};
  window.ultraInstall=install;
  const showInstallHelp=()=>{const m=document.createElement('div');m.className='modalShade';m.innerHTML=`<div class="installHelp"><div class="installIcon">⇩</div><h3>Install this website</h3><p><b>iPhone/iPad:</b> open in Safari, tap Share, then <b>Add to Home Screen</b>.<br><br><b>Android/Windows:</b> choose <b>Install app</b> or <b>Add to Home screen</b> from the browser menu.</p><button class="btn primary">Got it</button></div>`;document.body.appendChild(m);m.onclick=e=>{if(e.target===m||e.target.closest('button'))m.remove()};};
  setTimeout(()=>{if(isStandalone())return;const n=document.createElement('div');n.className='installNudge';n.innerHTML=`<span class="installSymbol">⇩</span><div><b>Install this website</b><small>Keep it on your device like an app.</small></div><button class="nudgeInstall">Install</button><button class="nudgeClose">×</button>`;document.body.appendChild(n);$('.nudgeInstall',n).onclick=install;$('.nudgeClose',n).onclick=()=>n.remove();},25000);
  // Ultra Max 2 premium mobile controls + interactive compact chat
  const uiIcons={
    home:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 11.2 12 4l8.5 7.2v8.1a1.2 1.2 0 0 1-1.2 1.2h-4.8v-6.1h-5v6.1H4.7a1.2 1.2 0 0 1-1.2-1.2Z"/></svg>`,
    services:`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.4"/><rect x="14" y="3.5" width="6.5" height="6.5" rx="1.4"/><rect x="3.5" y="14" width="6.5" height="6.5" rx="1.4"/><rect x="14" y="14" width="6.5" height="6.5" rx="1.4"/></svg>`,
    gallery:`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.1" cy="9" r="1.5"/><path d="m5.4 17 4.1-4.2 3.1 3 2.3-2.4 3.7 3.6"/></svg>`,
    whatsapp:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 11.7A8.2 8.2 0 0 1 8 18.9l-4 1 1.1-3.9a8.2 8.2 0 1 1 15.1-4.3Z"/><path d="M8.3 8.1c.2-.4.4-.4.7-.4h.4c.2 0 .4.1.5.4l.7 1.7c.1.3.1.5-.1.7l-.6.8c-.2.2-.1.4 0 .6.8 1.4 1.8 2.4 3.3 3.1.3.1.5.1.7-.1l.8-1c.2-.2.4-.3.7-.2l1.8.8c.3.1.4.3.4.6 0 .4-.2 1.3-.7 1.8-.5.5-1.3.8-2.1.8-1.1 0-2.7-.4-4.7-1.7-2.7-1.8-4.4-4.4-4.5-4.6-.1-.2-1.1-1.5-1.1-2.9 0-1.4.7-2.1 1-2.4Z"/></svg>`,
    install:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5v10.7"/><path d="m8.4 10.8 3.6 3.7 3.6-3.7"/><path d="M5 17.3v2.2a1.1 1.1 0 0 0 1.1 1.1h11.8a1.1 1.1 0 0 0 1.1-1.1v-2.2"/></svg>`,
    close:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg>`,
    send:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 4 16 8-16 8 3-8Z"/><path d="M7 12h13"/></svg>`
  };
  const mobilePage=page==='home'?'home':page;
  document.body.insertAdjacentHTML('beforeend',`
    <button id="chatOpen" class="chatButton pulse" aria-label="Open WhatsApp assistant">
      ${uiIcons.whatsapp}<span class="chatBadge">1</span>
    </button>
    <a class="backTop" href="#top" aria-label="Back to top">↑</a>
    <nav class="mobileFooter" aria-label="Mobile navigation">
      <a href="/" class="${mobilePage==='home'?'active':''}"><span class="footerIcon">${uiIcons.home}</span><span class="footerLabel">Home</span></a>
      <a href="/services.html" class="${mobilePage==='services'?'active':''}"><span class="footerIcon">${uiIcons.services}</span><span class="footerLabel">Services</span></a>
      <a href="/gallery.html" class="${mobilePage==='gallery'?'active':''}"><span class="footerIcon">${uiIcons.gallery}</span><span class="footerLabel">Gallery</span></a>
      <a target="_blank" href="${wa('Hello '+S.name)}"><span class="footerIcon waIcon">${uiIcons.whatsapp}</span><span class="footerLabel">WhatsApp</span></a>
      <button id="installMobile"><span class="footerIcon">${uiIcons.install}</span><span class="footerLabel">Install</span></button>
    </nav>`);
  $('#installMobile').onclick=install;

  $('#chatOpen').onclick=()=>{
    let box=$('#chatBox');
    if(box){box.remove();return;}
    $('.chatBadge')?.remove();
    box=document.createElement('div');
    box.id='chatBox';
    box.className='chatBox compact';
    box.innerHTML=`
      <div class="chatHead">
        <div class="chatIdentity">
          <span class="chatAvatar">${uiIcons.whatsapp}</span>
          <div><b>${S.shortName} Assistant</b><small><span class="onlineDot"></span> Online enquiry assistant</small></div>
        </div>
        <button id="chatClose" class="chatClose" aria-label="Close">${uiIcons.close}</button>
      </div>
      <div class="chatMessages">
        <div class="bubble bot">${S.chat.welcome}</div>
        <div class="bubble bot subtle">Choose an option below to get started.</div>
      </div>
      <div class="quickReplies">${S.chat.options.map(o=>`<button>${o}</button>`).join('')}</div>`;
    document.body.appendChild(box);
    $('#chatClose',box).onclick=()=>box.remove();

    let service='',name='',details='';
    const messages=$('.chatMessages',box);
    function add(from,text){
      messages.insertAdjacentHTML('beforeend',`<div class="bubble ${from}">${text}</div>`);
      messages.scrollTop=messages.scrollHeight;
    }
    function ask(ph,cb){
      const old=$('.chatInput',box);if(old)old.remove();
      const w=document.createElement('div');
      w.className='chatInput';
      w.innerHTML=`<input autocomplete="off" placeholder="${ph}"><button aria-label="Send">${uiIcons.send}</button>`;
      box.appendChild(w);
      const inp=$('input',w);
      const send=()=>{const v=inp.value.trim();if(!v)return;add('user',v);w.remove();cb(v)};
      $('button',w).onclick=send;
      inp.onkeydown=e=>e.key==='Enter'&&send();
      inp.focus();
    }
    $$('.quickReplies button',box).forEach(b=>b.onclick=()=>{
      service=b.textContent;
      add('user',service);
      add('bot','Great. What is your name?');
      $('.quickReplies',box).remove();
      ask('Your name...',v=>{
        name=v;
        add('bot',`Thanks ${name}. Please describe what you need, your location, and preferred timing.`);
        ask('Project details...',v2=>{
          details=v2;
          add('bot',S.chat.closing);
          const a=document.createElement('a');
          a.className='chatContinue';
          a.target='_blank';
          a.href=wa(`Hello ${S.name}.\nName: ${name}\nEnquiry: ${service}\nDetails: ${details}`);
          a.innerHTML=`${uiIcons.whatsapp}<span>Continue on WhatsApp</span>`;
          box.appendChild(a);
        });
      });
    });
  };
  // Reveal animations
  const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});$$('.reveal').forEach(el=>obs.observe(el));
  // Counters
  $$('.counterNum').forEach(el=>{const val=+el.dataset.value,suffix=el.dataset.suffix||'';let ran=false;const o=new IntersectionObserver(([e])=>{if(!e.isIntersecting||ran)return;ran=true;const st=performance.now(),dur=1400;function tick(now){const t=Math.min(1,(now-st)/dur),n=Math.round(val*(1-Math.pow(1-t,3)));el.textContent=n+suffix;if(t<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)},{threshold:.5});o.observe(el)});
  // Typewriter utility
  window.typewriter=(el,items,speed=45,pause=1200)=>{let i=0,pos=0,del=false;function go(){const full=items[i%items.length];el.innerHTML=full.slice(0,pos)+'<span class="cursor">|</span>';if(!del&&pos===full.length){del=true;return setTimeout(go,pause)}if(del&&pos===0){del=false;i=(i+1)%items.length}pos+=del?-1:1;setTimeout(go,del?25:speed)}go()};
  // Hero slider only where hero exists — stable, visible Ultra Max 2 slider
  const hero=$('#homeHero');
  if(hero){
    let s=0, heroTimer=null, typeRun=0;
    const title=$('#heroTitle'), type=$('#heroType'), dots=$('.dots',hero);
    const heroTypewriter=(items)=>{
      const run=++typeRun; let i=0,pos=0,deleting=false;
      function step(){
        if(run!==typeRun || !type.isConnected) return;
        const full=items[i%items.length];
        type.innerHTML=full.slice(0,pos)+'<span class="cursor">|</span>';
        if(!deleting && pos===full.length){deleting=true;return setTimeout(step,1050)}
        if(deleting && pos===0){deleting=false;i=(i+1)%items.length}
        pos+=deleting?-1:1; setTimeout(step,deleting?24:42);
      }
      step();
    };
    const paint=(idx)=>{
      s=(idx+S.hero.length)%S.hero.length; const h=S.hero[s];
      hero.style.backgroundImage=`linear-gradient(90deg,rgba(3,18,42,.72) 0%,rgba(3,18,42,.48) 52%,rgba(3,18,42,.18) 100%),url('${h.image}')`;
      hero.style.backgroundSize='cover'; hero.style.backgroundPosition='center'; hero.style.backgroundRepeat='no-repeat';
      title.textContent=h.heading; title.classList.remove('heroEnter'); void title.offsetWidth; title.classList.add('heroEnter');
      type.innerHTML=''; heroTypewriter(h.phrases);
      $$('.dots button',hero).forEach((b,i)=>b.classList.toggle('active',i===s));
    };
    dots.innerHTML=S.hero.map((_,i)=>`<button type="button" data-i="${i}" aria-label="Show hero slide ${i+1}"></button>`).join('');
    $$('.dots button',hero).forEach(b=>b.onclick=()=>{paint(+b.dataset.i);clearInterval(heroTimer);heroTimer=setInterval(()=>paint(s+1),5600)});
    paint(0); heroTimer=setInterval(()=>paint(s+1),5600);
  }
  $$('.pageType').forEach(el=>window.typewriter(el,[el.dataset.text,'Professional • Reliable • Responsive']));
})();
