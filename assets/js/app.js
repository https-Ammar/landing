const questions = Array.from(document.querySelectorAll('.question'));
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const restartBtn = document.getElementById('restartBtn');
const helpBtn = document.getElementById('helpBtn');
let current = 0;

function updateProgress(){
  const pct = Math.round(((current) / 2) * 100); // Fixed denominator to 2
  progressFill.style.width = pct + '%';
  progressText.textContent = pct + '%';
  document.getElementById('progressBar')?.setAttribute('aria-valuenow', String(pct));
}

function showQuestion(index){
  questions.forEach((q,i)=>{
    if(i === index){
      q.classList.remove('q-hidden'); q.classList.add('q-visible');
      q.setAttribute('aria-hidden','false');
    } else {
      q.classList.add('q-hidden'); q.classList.remove('q-visible');
      q.setAttribute('aria-hidden','true');
    }
  });
  current = index + 1;
  updateProgress();
  const visible = questions[index];
  if(visible){
    const btn = visible.querySelector('.answer-btn');
    if(btn) btn.focus();
  }
}

function handleAnswerClick(e){
  const btn = e.currentTarget;
  const parent = btn.closest('.question');
  
  parent.querySelectorAll('.answer-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  
  const next = btn.getAttribute('data-next');
  setTimeout(()=>{
    if(next === 'finish'){
      window.location.href = 'https://www.google.com';
    } else {
      const idx = questions.findIndex(q=>q.id === next);
      if(idx >= 0) showQuestion(idx);
    }
  },260);
}

questions.forEach(q=>{
  q.querySelectorAll('.answer-btn').forEach(btn=>{
    btn.addEventListener('click', handleAnswerClick);
    
    btn.addEventListener('keydown', (ev)=>{
      if(ev.key === 'Enter' || ev.key === ' '){
        ev.preventDefault();
        btn.click();
      }
    });
  });
});

restartBtn.addEventListener('click', ()=>{
  questions.forEach(q=>q.querySelectorAll('.answer-btn').forEach(b=>b.classList.remove('selected')));
  showQuestion(0);
});

helpBtn.addEventListener('click', ()=>{
  alert('Send your request or contact us via the contact page.');
});


showQuestion(0);