
window.OJ = {
  toggleMenu(){document.body.classList.toggle('menu-open');},
  closeMenu(){document.body.classList.remove('menu-open');},
  openOrderModal(productName){
    const modal=document.getElementById('order-modal'); if(!modal) return;
    document.getElementById('modal-title').textContent=productName;
    document.getElementById('modal-template').value=`Ciao! Vorrei ordinare:
${productName}

Taglia: __
Personalizzazione (nome/numero): __`;
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
  },
  closeOrderModal(){
    const modal=document.getElementById('order-modal'); if(!modal) return;
    modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');
  },
  copyTemplate(){
    const el=document.getElementById('modal-template'); if(!el) return;
    el.select(); el.setSelectionRange(0,99999);
    if(navigator.clipboard && navigator.clipboard.writeText){navigator.clipboard.writeText(el.value);} else {document.execCommand('copy');}
  },
  initCatalog(){
    const search=document.getElementById('catalog-search');
    const buttons=document.querySelectorAll('.filter-btn');
    const cards=document.querySelectorAll('.product-card');
    const count=document.getElementById('catalog-count');
    if(!cards.length) return;
    let active='all';
    function apply(){
      const q=(search?search.value:'').trim().toLowerCase();
      let visible=0;
      cards.forEach(card=>{
        const okLeague=active==='all' || card.dataset.league===active;
        const okSearch=!q || card.dataset.search.includes(q);
        const show=okLeague && okSearch;
        card.style.display=show?'':'none';
        if(show) visible++;
      });
      if(count) count.textContent=`${visible} maglie`;
    }
    buttons.forEach(btn=>btn.addEventListener('click',()=>{
      buttons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      active=btn.dataset.filter;
      apply();
    }));
    if(search) search.addEventListener('input',apply);
    apply();
  },
  initReveal(){
    document.body.classList.add('js-ready');
    const items=document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){items.forEach(el=>el.classList.add('visible'));return;}
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add('visible');});
    },{threshold:0.12});
    items.forEach(el=>io.observe(el));
  }
};
document.addEventListener('click',e=>{
  if(e.target.classList.contains('mobile-backdrop')) OJ.closeMenu();
  if(e.target.id==='order-modal') OJ.closeOrderModal();
});
document.addEventListener('DOMContentLoaded',()=>{OJ.initCatalog(); OJ.initReveal();});


OJ.openContactModal = function(){
  const modal=document.getElementById('contact-modal');
  if(!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
};
OJ.closeContactModal = function(){
  const modal=document.getElementById('contact-modal');
  if(!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
};

document.addEventListener('click',e=>{
  if(e.target.id==='contact-modal') OJ.closeContactModal();
});

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.reviews-track').forEach(track=>{
    if(window.innerWidth <= 980) return;
    if(track.dataset.marqueeReady === '1') return;
    const items = Array.from(track.children);
    items.forEach(node => track.appendChild(node.cloneNode(true)));
    track.classList.add('is-animated');
    track.dataset.marqueeReady = '1';
  });
});
