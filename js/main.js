(()=>{
  const y=document.getElementById('y'); if(y) y.textContent=new Date().getFullYear();
  const nav=document.getElementById('nav'), fab=document.querySelector('.wa-float');
  const onScroll=()=>{const s=scrollY>8;nav.classList.toggle('scrolled',s);fab&&fab.classList.toggle('show',scrollY>window.innerHeight*.7)};
  addEventListener('scroll',onScroll,{passive:true}); onScroll();
  // mobile menu
  const btn=document.querySelector('.menu-btn'), menu=document.getElementById('menu');
  const close=()=>{menu.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-label','Abrir menú')};
  btn.addEventListener('click',()=>{const o=menu.classList.toggle('open');btn.setAttribute('aria-expanded',o);btn.setAttribute('aria-label',o?'Cerrar menú':'Abrir menú')});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  // reveal
  const els=[...document.querySelectorAll('.reveal')];
  // stagger siblings
  els.forEach(el=>{const p=el.parentElement;const sib=[...p.children].filter(c=>c.classList.contains('reveal'));const i=sib.indexOf(el);if(i>0)el.style.setProperty('--d',Math.min(i*0.07,.42)+'s')});
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce||!('IntersectionObserver' in window)||location.search.includes('shot')){els.forEach(e=>e.classList.add('in'));return}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  els.forEach(el=>io.observe(el));
  // count-up stats
  const nums=document.querySelectorAll('[data-count]');
  const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,end=+el.dataset.count,t0=performance.now(),dur=1100;
    const tick=t=>{const k=Math.min((t-t0)/dur,1);el.textContent=Math.round(end*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);cio.unobserve(el)}),{threshold:.6});
  nums.forEach(n=>cio.observe(n));
})();
