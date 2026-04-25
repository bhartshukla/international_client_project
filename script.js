/* Navbar scroll */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  navbar.classList.toggle('scrolled',window.scrollY>20);
},{passive:true});

/* Mobile menu */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-overlay');
function toggleMobile(open){
  hamburger.classList.toggle('active',open);
  mobileMenu.classList.toggle('open',open);
  mobileOverlay.classList.toggle('open',open);
  document.body.style.overflow=open?'hidden':'';
}
hamburger.addEventListener('click',()=>toggleMobile(!mobileMenu.classList.contains('open')));
mobileOverlay.addEventListener('click',()=>toggleMobile(false));
document.querySelectorAll('.mobile-nav-link[data-target]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const t=document.getElementById(btn.dataset.target);
    if(t) t.classList.toggle('open');
  });
});

/* GSAP Scroll Animations */
(function(){
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init);
  } else { init(); }

  function init(){
    if(!window.gsap||!window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    if(window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

    const dur=1, ease='power3.out', tog='play none none reverse';

    function reveal(sel,{trig,y=60,x=0,delay=0,stagger=0,start='top 85%'}={}){
      const els=[...document.querySelectorAll(sel)];
      if(!els.length) return;
      const trigger=trig||els[0].closest('section,div')||els[0];
      gsap.fromTo(els,{y,x,opacity:0},{
        y:0,x:0,opacity:1,duration:dur,ease,delay,stagger,
        scrollTrigger:{trigger,start,toggleActions:tog}
      });
    }

    /* Video section */
    reveal('.eyebrow',{trig:'#video-section',y:30,start:'top 80%'});
    reveal('.video-headline',{trig:'#video-section',y:70,start:'top 80%'});
    reveal('.video-desc',{trig:'#video-section',y:50,start:'top 80%'});
    reveal('.video-actions > *',{trig:'#video-section',y:40,stagger:0.12,start:'top 80%'});
    reveal('.stat-item',{trig:'.video-stats',y:25,stagger:0.15,start:'top 92%'});

    /* Hero main */
    reveal('.hero-overline',{trig:'#hero',y:30,start:'top 85%'});
    reveal('.hero-headline',{trig:'#hero',y:60,start:'top 85%'});
    reveal('.hero-desc',{trig:'#hero',y:40,start:'top 85%'});
    reveal('.hero-actions > *',{trig:'#hero',y:30,stagger:0.12,start:'top 85%'});
    gsap.fromTo('.hero-visual',{x:60,opacity:0},{x:0,opacity:1,duration:1.1,ease,scrollTrigger:{trigger:'#hero',start:'top 85%',toggleActions:tog}});
    reveal('.hero-badge, .hero-badge-2',{trig:'.hero-visual',y:20,stagger:0.18,start:'top 90%'});

    /* Assets */
    reveal('.assets-header h2',{trig:'.assets-section',y:60,start:'top 85%'});
    reveal('.assets-intro',{trig:'.assets-section',y:40,start:'top 85%'});
    reveal('.asset-info-item',{trig:'.assets-info-grid',y:50,stagger:0.1,start:'top 85%'});
    reveal('.asset-card',{trig:'.assets-cards',y:70,stagger:0.13,start:'top 85%'});

    /* Growth */
    gsap.fromTo('.growth-left > *',{x:-50,opacity:0},{
      x:0,opacity:1,duration:1,ease,stagger:0.12,
      scrollTrigger:{trigger:'#growth',start:'top 80%',toggleActions:tog}
    });
    reveal('.growth-point',{trig:'.growth-points',y:40,stagger:0.1,start:'top 85%'});
    gsap.fromTo('.growth-right',{x:50,opacity:0},{x:0,opacity:1,duration:1.1,ease,scrollTrigger:{trigger:'#growth',start:'top 80%',toggleActions:tog}});

    /* Combined */
    gsap.fromTo('.bio-side > *',{x:-45,opacity:0},{x:0,opacity:1,duration:1,ease,stagger:0.1,scrollTrigger:{trigger:'#combined',start:'top 80%',toggleActions:tog}});
    reveal('.bio-card',{trig:'.bio-cards',y:50,stagger:0.1,start:'top 88%'});
    gsap.fromTo('.why-side > *',{x:45,opacity:0},{x:0,opacity:1,duration:1,ease,stagger:0.1,scrollTrigger:{trigger:'#combined',start:'top 80%',toggleActions:tog}});
    reveal('.why-item',{trig:'.why-list',y:35,stagger:0.09,start:'top 88%'});

    /* CTA */
    reveal('.cta-content h2',{trig:'.cta-section',y:60,start:'top 80%'});
    reveal('.cta-content p',{trig:'.cta-section',y:40,start:'top 80%'});
    reveal('.cta-actions > *',{trig:'.cta-section',y:30,stagger:0.12,start:'top 80%'});

    /* Outro */
    reveal('.outro-label,.outro-headline,.outro-desc',{trig:'#outro',y:50,stagger:0.12,start:'top 85%'});
    gsap.fromTo('.outro-video',{x:60,opacity:0},{x:0,opacity:1,duration:1.2,ease,scrollTrigger:{trigger:'#outro',start:'top 82%',toggleActions:tog}});
  }
}());