const questions = Array.from(document.querySelectorAll('.question'));
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const restartBtn = document.getElementById('restartBtn');
const helpBtn = document.getElementById('helpBtn');
let current = 0;

/**
 * Updates the progress bar and text based on the current question index.
 */
function updateProgress(){
  const pct = Math.round(((current) / questions.length) * 100);
  progressFill.style.width = pct + '%';
  progressText.textContent = pct + '%';
  document.getElementById('progressBar')?.setAttribute('aria-valuenow', String(pct));
}

/**
 * Shows the question at the specified index and hides all others.
 * @param {number} index - The index of the question to show (0-based).
 */
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
  current = index + 1; // Update current count for progress
  updateProgress();
  const visible = questions[index];
  if(visible){
    // Focus the first answer button for accessibility
    const btn = visible.querySelector('.answer-btn');
    if(btn) btn.focus();
  }
}

/**
 * Handles the click event for an answer button.
 * @param {Event} e - The click event.
 */
function handleAnswerClick(e){
  const btn = e.currentTarget;
  const parent = btn.closest('.question');
  
  // Deselect all buttons in the current question and select the clicked one
  parent.querySelectorAll('.answer-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  
  const next = btn.getAttribute('data-next');

  setTimeout(()=>{
    if(next === 'finish'){
      // Redirect to the final page
      window.location.href = 'https://www.google.com';
    } else {
      // Find and show the next question
      const idx = questions.findIndex(q=>q.id === next);
      if(idx >= 0) showQuestion(idx);
    }
  },260); // Delay for the selection animation
}

// Attach event listeners to all answer buttons
questions.forEach(q=>{
  q.querySelectorAll('.answer-btn').forEach(btn=>{
    btn.addEventListener('click', handleAnswerClick);
    
    // Allow Enter or Space key press to select the answer for accessibility
    btn.addEventListener('keydown', (ev)=>{
      if(ev.key === 'Enter' || ev.key === ' '){
        ev.preventDefault();
        btn.click();
      }
    });
  });
});

// Event listener for the Restart button
restartBtn.addEventListener('click', ()=>{
  // Clear all selections
  questions.forEach(q=>q.querySelectorAll('.answer-btn').forEach(b=>b.classList.remove('selected')));
  showQuestion(0); // Go back to the first question
});

// Event listener for the Help button
helpBtn.addEventListener('click', ()=>{
  alert('Send your request or contact us via the contact page.');
});

// Initialize the quiz by showing the first question
showQuestion(0);