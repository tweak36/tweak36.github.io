// TWEAKFAILS site: tiny progressive enhancements only.
(function(){
  var d=document,root=d.documentElement;
  root.classList.remove('no-js');root.classList.add('js');

  // Mobile menu
  var btn=d.querySelector('.menu-btn'),nav=d.getElementById('site-nav');
  if(btn&&nav){
    btn.addEventListener('click',function(){
      var open=btn.getAttribute('aria-expanded')==='true';
      btn.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open);
    });
    nav.addEventListener('click',function(e){if(e.target.tagName==='A'){btn.setAttribute('aria-expanded','false');nav.classList.remove('open');}});
    d.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){btn.setAttribute('aria-expanded','false');nav.classList.remove('open');btn.focus();}});
  }

  // Featured screenshot switcher
  d.querySelectorAll('[data-switcher]').forEach(function(box){
    var main=box.querySelector('.main-shot img'),cap=box.querySelector('.main-shot figcaption');
    box.querySelectorAll('.strip button').forEach(function(b){
      b.addEventListener('click',function(){
        box.querySelectorAll('.strip button').forEach(function(o){o.setAttribute('aria-pressed','false');});
        b.setAttribute('aria-pressed','true');
        var img=b.querySelector('img');main.src=img.getAttribute('src');main.alt=img.alt;if(cap)cap.textContent=b.dataset.caption||'';
      });
    });
  });

  // Click-to-load YouTube (privacy-enhanced). Links work without JS.
  d.querySelectorAll('a.video[data-yt]').forEach(function(a){
    a.addEventListener('click',function(e){
      if(e.metaKey||e.ctrlKey||e.shiftKey)return;
      e.preventDefault();
      var f=d.createElement('iframe');
      f.src='https://www.youtube-nocookie.com/embed/'+a.dataset.yt+'?autoplay=1&rel=0';
      f.title=a.dataset.title||'YouTube video';
      f.allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.referrerPolicy='strict-origin-when-cross-origin';f.allowFullscreen=true;
      var box=d.createElement('div');box.className=a.className+' playing';box.appendChild(f);a.parentNode.replaceChild(box,a);f.focus();
    });
  });

  // Gentle reveal on scroll
  var els=d.querySelectorAll('.reveal');
  if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){io.observe(el);});
  }else{els.forEach(function(el){el.classList.add('in');});}
})();
