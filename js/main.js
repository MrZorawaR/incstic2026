// ===================== INCSTIC-2027 shared behaviour =====================

// ---- nav scroll shadow ----
const nav = document.getElementById('nav');
if(nav){
  window.addEventListener('scroll', ()=>{ nav.classList.toggle('scrolled', window.scrollY > 20); });
}

// ---- desktop dropdown (click to open, click outside to close) ----
document.querySelectorAll('.has-dropdown').forEach(item=>{
  const btn = item.querySelector('.nav-drop-btn');
  if(!btn) return;
  btn.addEventListener('click', (e)=>{
    e.stopPropagation();
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.has-dropdown').forEach(i=>i.classList.remove('open'));
    if(!isOpen) item.classList.add('open');
  });
});
document.addEventListener('click', ()=>{
  document.querySelectorAll('.has-dropdown').forEach(i=>i.classList.remove('open'));
});

// ---- mobile menu ----
const burger = document.getElementById('burger');
const closeBurger = document.getElementById('closeBurger');
const mobileMenu = document.getElementById('mobileMenu');
if(burger && mobileMenu){
  burger.addEventListener('click', ()=> mobileMenu.classList.add('open'));
}
if(closeBurger && mobileMenu){
  closeBurger.addEventListener('click', ()=> mobileMenu.classList.remove('open'));
}
document.querySelectorAll('.mobile-drop > .mobile-toggle').forEach(t=>{
  t.addEventListener('click', ()=>{
    const parent = t.closest('.mobile-drop');
    parent.classList.toggle('open');
    parent.querySelector('.mobile-sub').classList.toggle('open');
  });
});
document.querySelectorAll('.mobile-menu a:not(.mobile-toggle)').forEach(a=>{
  a.addEventListener('click', ()=> mobileMenu && mobileMenu.classList.remove('open'));
});

// ---- reveal on scroll ----
const revealer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); revealer.unobserve(e.target); } });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealer.observe(el));

// ---- generic segmented tabs (used on committee page) ----
document.querySelectorAll('.seg').forEach(seg=>{
  seg.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      seg.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const group = seg.dataset.group;
      document.querySelectorAll(`.cpanel[data-group="${group}"]`).forEach(p=>p.classList.remove('active'));
      document.getElementById(btn.dataset.panel).classList.add('active');
    });
  });
});

// ---- generic list search (used on committee page) ----
document.querySelectorAll('[data-search-target]').forEach(input=>{
  input.addEventListener('input', ()=>{
    const q = input.value.toLowerCase().trim();
    const targetList = document.getElementById(input.dataset.searchTarget);
    if(!targetList) return;
    let visible = 0;
    targetList.querySelectorAll('.num-item').forEach(it=>{
      const match = !q || it.dataset.search.includes(q);
      it.classList.toggle('hide', !match);
      if(match) visible++;
    });
    const counter = document.getElementById(input.dataset.searchCount);
    if(counter) counter.textContent = visible + ' result' + (visible===1?'':'s');
  });
});

// ---- track accordion (Call for Papers page) ----
document.querySelectorAll('.track-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.track-item');
    item.classList.toggle('open');
  });
});
