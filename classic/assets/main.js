(function(){
  var y=document.getElementById('yr'); if(y) y.textContent=new Date().getFullYear();
  var nav=document.getElementById('nav'), b=document.getElementById('burger');
  if(b) b.onclick=function(){nav.classList.toggle('open')};
  if(nav) nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open')})});
  try{if('scrollRestoration' in history) history.scrollRestoration='manual';}catch(e){}
  function toTarget(){var h=decodeURIComponent(location.hash.slice(1));var el=h&&document.getElementById(h);if(el){el.scrollIntoView();}else{window.scrollTo(0,0);}}
  toTarget(); window.addEventListener('load',function(){toTarget();setTimeout(toTarget,120);});
  // image fallback: keep layout if an image fails to load
  
  // hero slider
  var slides=document.querySelectorAll('.slide'), dots=document.querySelectorAll('.dots button'), i=0, t;
  function go(n){ if(!slides.length) return; slides[i].classList.remove('on'); dots[i]&&dots[i].classList.remove('on'); i=(n+slides.length)%slides.length; slides[i].classList.add('on'); dots[i]&&dots[i].classList.add('on'); }
  function auto(){ clearInterval(t); t=setInterval(function(){go(i+1)},6000); }
  dots.forEach(function(d,k){d.onclick=function(){go(k);auto()}}); if(slides.length>1) auto();
  // product gallery thumbs
  document.querySelectorAll('.pd-gal').forEach(function(g){var m=g.querySelector('.main');g.querySelectorAll('.thumbs img').forEach(function(th){th.onclick=function(){m.src=th.dataset.big;g.querySelectorAll('.thumbs img').forEach(function(x){x.classList.remove('on')});th.classList.add('on')}})});
  // purity grade tabs
  document.querySelectorAll('.gradebox').forEach(function(box){box.querySelectorAll('.gtab').forEach(function(t){t.onclick=function(){box.querySelectorAll('.gtab,.gpane').forEach(function(x){x.classList.toggle('on',x.dataset.g===t.dataset.g)})}})});
  // reveal on scroll
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)})}else{document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in')})}
  // inquiry form -> mailto
  var f=document.getElementById('inq');
  if(f){ var q=new URLSearchParams(location.search).get('p'); if(q){var s=f.querySelector('select');[].forEach.call(s.options,function(o){if(o.value===q)s.value=q})}
    f.onsubmit=function(e){e.preventDefault();var d=new FormData(f);
    var body='联系人：'+d.get('name')+'\n电话：'+d.get('tel')+'\n公司：'+d.get('co')+'\n意向产品：'+d.get('prod')+'\n纯度/规格/用量：'+d.get('msg');
    location.href='mailto:'+f.dataset.mail+'?subject='+encodeURIComponent('官网询价 - '+d.get('prod'))+'&body='+encodeURIComponent(body);
    document.getElementById('ok').style.display='block';};
  }
})();
