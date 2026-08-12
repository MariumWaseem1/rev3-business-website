const header=document.querySelector('.header'),menu=document.querySelector('.menu'),nav=document.querySelector('.header nav');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>24),{passive:true});
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);document.body.classList.toggle('menu-open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');document.body.classList.remove('menu-open');menu.setAttribute('aria-expanded','false')}));
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');reveal.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));
const industryData={hospitality:['Hospitality','Reduce booking admin, answer common questions instantly and keep your venue visible without adding more tasks to the rota.',['Automated bookings and FAQs','Review and social content','Customer follow-up campaigns']],healthcare:['Healthcare','Give patients faster answers while reducing front-desk pressure and protecting the human care experience.',['Appointment and FAQ assistants','Document and admin workflows','Patient follow-up automation']],retail:['Retail','Create better product content, support shoppers and automate the work behind every order.',['Product imagery and descriptions','Customer service assistants','Marketing and follow-up']],professional:['Professional services','Spend less time processing information and more time delivering expertise clients value.',['Document and email automation','Lead qualification','Internal knowledge assistants']],trades:['Trades','Capture every enquiry, quote faster and keep customers informed while your team stays on the job.',['Missed-call and enquiry capture','Quote workflow automation','Booking and follow-up']],education:['Education','Make information easier to find and repetitive administration easier to manage.',['FAQ and enrolment assistants','Document workflows','Internal knowledge support']],estate:['Real estate','Respond to buyers and sellers faster while keeping property marketing consistent.',['Lead qualification','Listing content and imagery','Viewing and follow-up automation']]};
const panel=document.querySelector('.industry-panel'),tabs=document.querySelectorAll('.industry-tabs button');tabs.forEach((tab,i)=>tab.addEventListener('click',()=>{tabs.forEach(t=>t.classList.remove('active'));tab.classList.add('active');const d=industryData[tab.dataset.industry];panel.animate([{opacity:.2,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:350});panel.querySelector('.panel-index').textContent=String(i+1).padStart(2,'0')+' / INDUSTRY';panel.querySelector('h3').textContent=d[0];panel.querySelector('p:not(.panel-index)').textContent=d[1];panel.querySelector('ul').innerHTML=d[2].map(x=>`<li>${x}</li>`).join('')}));
document.querySelectorAll('body *').forEach(el=>{if(el.children.length===0&&el.textContent.includes('—'))el.textContent=el.textContent.replaceAll('—',',')});

const servicesSection=document.querySelector('.services');
const serviceCards=[...servicesSection.querySelectorAll('.service')];
servicesSection.classList.add('interactive-services');
const problemSwitcher=document.createElement('div');
problemSwitcher.className='problem-switcher reveal';
problemSwitcher.setAttribute('role','tablist');
const problemLabels=[["01 / TIME","I don’t have enough time."],["02 / GROWTH","I need more customers."],["03 / ENQUIRIES","I can’t keep up with customer enquiries."]];
problemSwitcher.innerHTML=problemLabels.map((p,i)=>`<button type="button" role="tab" aria-selected="${i===0}" class="${i===0?'active':''}" data-service="${i}"><small>${p[0]}</small><strong>${p[1]}</strong><span>↗</span></button>`).join('');
const serviceProgress=document.createElement('div');serviceProgress.className='service-progress';serviceProgress.innerHTML='<i></i>';
servicesSection.querySelector('.section-head').after(problemSwitcher,serviceProgress);
serviceCards[0].classList.add('service-active');
problemSwitcher.querySelectorAll('button').forEach((button,index)=>button.addEventListener('click',()=>{
  problemSwitcher.querySelectorAll('button').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false')});
  button.classList.add('active');button.setAttribute('aria-selected','true');
  serviceCards.forEach((card,i)=>card.classList.toggle('service-active',i===index));
  serviceProgress.querySelector('i').style.transform=`translateX(${index*100}%)`;
}));
reveal.observe(problemSwitcher);

// Swiping the mobile problem cards updates the matching service automatically.
let serviceSwipeTimer;
problemSwitcher.addEventListener('scroll',()=>{
  clearTimeout(serviceSwipeTimer);
  serviceSwipeTimer=setTimeout(()=>{
    const buttons=[...problemSwitcher.querySelectorAll('button')];
    const centre=problemSwitcher.getBoundingClientRect().left+problemSwitcher.clientWidth/2;
    const nearest=buttons.reduce((best,button,index)=>{
      const box=button.getBoundingClientRect();
      const distance=Math.abs(box.left+box.width/2-centre);
      return distance<best.distance?{index,distance}:best;
    },{index:0,distance:Infinity});
    if(!buttons[nearest.index].classList.contains('active'))buttons[nearest.index].click();
  },90);
},{passive:true});

document.querySelectorAll('a span,button span').forEach(span=>{
  if(['↗','↓','→'].includes(span.textContent.trim()))span.remove();
});

// Keep the homepage focused. These repeated or placeholder sections can return
// when real client logos and verified case-study results are available.
document.querySelector('.trusted')?.remove();
document.querySelector('.use-cases')?.remove();
document.querySelector('.studies')?.remove();
