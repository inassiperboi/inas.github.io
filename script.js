/**
 * Quiz "Seberapa Kenal Kamu Sama Inas?"
 * Cute Pastel Pink & Yellow Kawaii Theme
 */

// 1. Data Pertanyaan & Kunci Jawaban
const quizData = [
  {
    id: 1,
    category: "Warna Favorit 🎨",
    question: "Jika disuruh memilih, kira-kira warna apa yang akan Inas pilih?",
    options: ["pink", "orange", "kuning", "navy"],
    answer: "pink",
    note: "Pink selalu jadi warna paling favorit di hati Inas! 🌸"
  },
  {
    id: 2,
    category: "Makanan Pilihan 🍜",
    question: "Jika disuruh memilih, kira-kira makanan apa yang akan Inas pilih?",
    options: ["mie ayam", "bebek bumbu hitam", "lontong mie", "lontong kupang"],
    answer: "lontong kupang",
    note: "Lontong kupang emang juaranya selera Inas! 🤤"
  },
  {
    id: 3,
    category: "Minuman Segar 🧋",
    question: "Jika disuruh memilih, kira-kira minuman apa yang akan Inas pilih?",
    options: ["es teh jasmine", "es teh vanilla", "matcha", "thai tea"],
    answer: "es teh jasmine",
    note: "Aroma wangi es teh jasmine gak pernah salah! 🍃"
  },
  {
    id: 4,
    category: "Jajanan Favorit 🍟",
    question: "Jika disuruh memilih, kira-kira jajanan apa yang akan Inas pilih?",
    options: ["onion ring", "kentang goreng", "kebab", "burger"],
    answer: "onion ring",
    note: "Onion ring yang renyah dan gurih selalu jadi incaran! 🧅✨"
  },
  {
    id: 5,
    category: "Aktivitas Santai 🛋️",
    question: "Jika disuruh memilih, kira-kira apa yang akan Inas pilih?",
    options: [
      "jalan2 ke mall",
      "santai dirumah sambil ngemil2",
      "nonton bioskop",
      "traveling"
    ],
    answer: "santai dirumah sambil ngemil2",
    note: "Paling nyaman emang me-time santai di rumah sambil ngemil! 🛋️🍰"
  },
  {
    id: 6,
    category: "Fisik & Ciri 📏",
    question: "Berapa tinggi badan Inas?",
    options: ["150cm", "154cm", "155cm", "156cm"],
    answer: "155cm",
    note: "Pas 155cm yang imut dan proporsional! ✨"
  },
  {
    id: 7,
    category: "Berat Badan ⚖️",
    question: "Berapa berat badan Inas?",
    options: ["59kg", "59,5kg", "60kg", "61kg"],
    answer: "61kg",
    note: "61kg dong! Jangan sampai salah tebak yaa 🙈"
  },
  {
    id: 8,
    category: "Kebiasaan Tidur 💤",
    question: "Inas gak bisa tidur kalau gak ada...",
    options: ["guling", "bantal", "boneka", "selimut"],
    answer: "guling",
    note: "Wajib banget peluk guling biar tidurnya nyenyak! 🛏️"
  },
  {
    id: 9,
    category: "Hal Yang Ditakuti 😱",
    question: "Apa yang paling ditakuti Inas?",
    options: ["cicak", "kecoa", "anjing", "belalang"],
    answer: "cicak",
    note: "Melihat cicak langsung bikin Inas histeris & merinding! 🦎💨"
  },
  {
    id: 10,
    category: "Koleksi Impian 💄",
    question: "Apa yang akan Inas koleksi?",
    options: ["skin and bodycare", "tas", "sepatu", "pakaian"],
    answer: "skin and bodycare",
    note: "Skin and bodycare adalah jalan ninjanya Inas! Glowing terus ✨"
  }
];

// 2. State Management
let currentQuestionIndex = 0;
let userAnswers = []; // Record of { questionId, chosen, isCorrect }
let playerName = "Teman Baik";
let soundEnabled = true;

// Web Audio API Sound Synthesizer (Cute sound effects with no external files needed)
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'correct') {
      // Cheerful Arpeggio (C6, E6, G6, C7)
      const freqs = [1046.50, 1318.51, 1567.98, 2093.00];
      freqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);
        gain.gain.setValueAtTime(0, now + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.15, now + index * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.26);
      });
    } else if (type === 'wrong') {
      // Cute Sad "wah wah" tone (low sliding pitch)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.4);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.46);
    } else if (type === 'click') {
      // Crisp gentle pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === 'victory') {
      // Festive Fanfare
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.12, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.36);
      });
    }
  } catch (e) {
    console.warn("Audio play error:", e);
  }
}

// 3. DOM Elements
const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');

const playerNameInput = document.getElementById('playerNameInput');
const startBtn = document.getElementById('startBtn');
const soundToggle = document.getElementById('soundToggle');
const soundIcon = document.getElementById('soundIcon');
const soundText = document.getElementById('soundText');

const currentQNumberBadge = document.getElementById('currentQNumberBadge');
const currentCorrectCount = document.getElementById('currentCorrectCount');
const progressBar = document.getElementById('progressBar');
const questionCategory = document.getElementById('questionCategory');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');

// Feedback Modal Elements
const feedbackModal = document.getElementById('feedbackModal');
const feedbackCard = document.getElementById('feedbackCard');
const feedbackIconWrapper = document.getElementById('feedbackIconWrapper');
const feedbackEmoji = document.getElementById('feedbackEmoji');
const feedbackTitle = document.getElementById('feedbackTitle');
const feedbackSubtitle = document.getElementById('feedbackSubtitle');
const feedbackDetailBox = document.getElementById('feedbackDetailBox');
const feedbackDetailText = document.getElementById('feedbackDetailText');
const feedbackNextBtn = document.getElementById('feedbackNextBtn');
const feedbackNextText = document.getElementById('feedbackNextText');

// Result Screen Elements
const resultReactionIcon = document.getElementById('resultReactionIcon');
const resultRankPill = document.getElementById('resultRankPill');
const resultPlayerGreeting = document.getElementById('resultPlayerGreeting');
const resultHeadline = document.getElementById('resultHeadline');
const finalScoreNumber = document.getElementById('finalScoreNumber');
const finalScoreBar = document.getElementById('finalScoreBar');
const resultPercentage = document.getElementById('resultPercentage');
const resultMessageCard = document.getElementById('resultMessageCard');
const shareWaBtn = document.getElementById('shareWaBtn');
const copySummaryBtn = document.getElementById('copySummaryBtn');
const restartBtn = document.getElementById('restartBtn');
const toggleReviewBtn = document.getElementById('toggleReviewBtn');
const reviewContainer = document.getElementById('reviewContainer');
const reviewArrow = document.getElementById('reviewArrow');

// 4. Initialize & Event Listeners
function init() {
  soundToggle.addEventListener('click', toggleSound);
  startBtn.addEventListener('click', startQuiz);
  feedbackNextBtn.addEventListener('click', handleNextQuestion);
  restartBtn.addEventListener('click', restartQuiz);
  shareWaBtn.addEventListener('click', shareToWhatsApp);
  copySummaryBtn.addEventListener('click', copySummaryToClipboard);
  toggleReviewBtn.addEventListener('click', toggleReviewVisibility);

  // Allow enter key on name input
  playerNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      startQuiz();
    }
  });
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    soundIcon.textContent = '🔊';
    soundText.textContent = 'Suara: On';
    playSound('click');
  } else {
    soundIcon.textContent = '🔇';
    soundText.textContent = 'Suara: Off';
  }
}

// 5. Quiz Workflow Functions
function startQuiz() {
  const entered = playerNameInput.value.trim();
  if (entered) {
    playerName = entered;
  } else {
    playerName = "Kamu";
  }

  playSound('click');
  currentQuestionIndex = 0;
  userAnswers = [];

  // Transition screens
  startScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');

  renderQuestion();
}

function renderQuestion() {
  const q = quizData[currentQuestionIndex];

  // Update badges & progress
  currentQNumberBadge.textContent = `${currentQuestionIndex + 1}`;
  const correctSoFar = userAnswers.filter(a => a.isCorrect).length;
  currentCorrectCount.textContent = `${correctSoFar}`;

  const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  questionCategory.textContent = q.category;
  questionText.textContent = q.question;

  // Clear previous options
  optionsContainer.innerHTML = '';

  const alphabet = ['A', 'B', 'C', 'D'];

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn group';
    btn.type = 'button';
    btn.innerHTML = `
      <span class="option-badge">${alphabet[idx]}</span>
      <span class="flex-1 capitalize">${opt}</span>
      <span class="opacity-0 group-hover:opacity-100 transition-opacity text-pink-400 font-bold ml-2">👉</span>
    `;

    btn.addEventListener('click', () => handleOptionSelected(opt, btn));
    optionsContainer.appendChild(btn);
  });
}

function handleOptionSelected(selectedOption, clickedBtn) {
  const q = quizData[currentQuestionIndex];
  const isCorrect = (selectedOption.toLowerCase().trim() === q.answer.toLowerCase().trim());

  // Record answer
  userAnswers.push({
    questionIndex: currentQuestionIndex,
    questionText: q.question,
    chosen: selectedOption,
    correctAnswer: q.answer,
    isCorrect: isCorrect,
    note: q.note
  });

  // Disable all options
  const allBtns = optionsContainer.querySelectorAll('.option-btn');
  allBtns.forEach(btn => {
    btn.disabled = true;
    btn.style.cursor = 'default';
  });

  // Highlight chosen button
  if (isCorrect) {
    clickedBtn.classList.add('btn-correct');
    playSound('correct');
    fireConfetti();
  } else {
    clickedBtn.classList.add('btn-wrong');
    // Also show which one was correct in the options
    allBtns.forEach(btn => {
      const text = btn.querySelector('.capitalize').textContent.trim().toLowerCase();
      if (text === q.answer.toLowerCase()) {
        btn.classList.add('btn-correct');
      }
    });
    playSound('wrong');
  }

  // Update score badge immediately
  const correctSoFar = userAnswers.filter(a => a.isCorrect).length;
  currentCorrectCount.textContent = `${correctSoFar}`;

  // Show sweet popup modal after slight delay
  setTimeout(() => {
    showFeedbackModal(isCorrect, q, selectedOption);
  }, 450);
}

function showFeedbackModal(isCorrect, questionObj, chosenOption) {
  const isLastQuestion = (currentQuestionIndex === quizData.length - 1);

  if (isCorrect) {
    // Correct Modal Styling (Pastel Green/Pink)
    feedbackCard.className = 'w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 text-center shadow-2xl border-4 border-emerald-200 transform scale-90 transition-all duration-300 space-y-4';
    feedbackIconWrapper.className = 'w-20 h-20 mx-auto rounded-full flex items-center justify-center text-5xl shadow-md border-4 border-white bg-gradient-to-tr from-emerald-100 to-green-200 text-emerald-600 animate-bounce-gentle';
    feedbackEmoji.textContent = '🎉';
    feedbackTitle.className = 'text-2xl font-black font-fredoka text-emerald-600';
    feedbackTitle.textContent = 'Yey kamu benaaar! ✨';
    feedbackSubtitle.textContent = 'Wah peka banget, pilihan kamu tepat sekali!';

    feedbackDetailBox.className = 'p-3.5 rounded-2xl text-xs sm:text-sm font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200';
    feedbackDetailText.innerHTML = `<strong>Jawaban:</strong> "${questionObj.answer}"<br><span class="text-xs text-emerald-600 font-normal mt-1 block">${questionObj.note}</span>`;

    feedbackNextBtn.className = 'w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-base shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 font-fredoka';
  } else {
    // Wrong Modal Styling (Pastel Pink/Red with sad emoticon)
    feedbackCard.className = 'w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 text-center shadow-2xl border-4 border-rose-200 transform scale-90 transition-all duration-300 space-y-4';
    feedbackIconWrapper.className = 'w-20 h-20 mx-auto rounded-full flex items-center justify-center text-5xl shadow-md border-4 border-white bg-gradient-to-tr from-rose-100 to-pink-200 text-rose-500 animate-bounce-gentle';
    feedbackEmoji.textContent = '🥺';
    feedbackTitle.className = 'text-2xl font-black font-fredoka text-rose-600';
    feedbackTitle.textContent = 'Huhuhu kamu salah 💔';
    feedbackSubtitle.textContent = 'Yah kurang tepat... Jangan sedih ya!';

    feedbackDetailBox.className = 'p-3.5 rounded-2xl text-xs sm:text-sm font-semibold bg-rose-50 text-rose-800 border border-rose-200 text-left';
    feedbackDetailText.innerHTML = `
      <div class="space-y-1">
        <p><span class="text-rose-500">Pilihanmu:</span> <strike class="text-gray-500">${chosenOption}</strike></p>
        <p><span class="text-emerald-700 font-bold">Yang bener:</span> <span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">${questionObj.answer}</span></p>
        <p class="text-xs text-gray-500 italic mt-1">${questionObj.note}</p>
      </div>
    `;

    feedbackNextBtn.className = 'w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-base shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 font-fredoka';
  }

  if (isLastQuestion) {
    feedbackNextText.textContent = 'Lihat Skor Akhir 🏆';
  } else {
    feedbackNextText.textContent = 'Pertanyaan Selanjutnya 👉';
  }

  feedbackModal.classList.add('show');
}

function handleNextQuestion() {
  playSound('click');
  feedbackModal.classList.remove('show');

  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    showFinalResults();
  }
}

// 6. Final Results & Evaluation
function showFinalResults() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  const correctTotal = userAnswers.filter(a => a.isCorrect).length;
  const percentage = Math.round((correctTotal / quizData.length) * 100);

  finalScoreNumber.textContent = `${correctTotal}`;
  resultPercentage.textContent = `Tingkat Kecocokan: ${percentage}%`;

  // Animate progress bar
  setTimeout(() => {
    finalScoreBar.style.width = `${percentage}%`;
  }, 200);

  resultPlayerGreeting.textContent = `Hai ${playerName}! ✨`;

  // Dynamic feedback according to the prompt:
  // "klo dibawah 8 brati kasih kamu harus sering deh ngobrol sama inas gituin wkwkw"
  if (correctTotal < 8) {
    // Under 8
    resultReactionIcon.className = 'w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full flex items-center justify-center text-5xl sm:text-6xl shadow-xl border-4 border-white bg-gradient-to-tr from-rose-200 via-pink-200 to-yellow-100 animate-bounce-gentle';
    resultReactionIcon.textContent = '🙈';

    resultRankPill.className = 'absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow border border-white bg-rose-500 text-white';
    resultRankPill.textContent = 'Perlu Pendalaman! 😅';

    resultHeadline.textContent = 'Waduh... Skor Kamu Masih Kurang!';

    resultMessageCard.className = 'p-4 sm:p-5 rounded-2xl border-2 text-sm sm:text-base font-semibold leading-relaxed shadow-sm bg-rose-50 border-rose-200 text-rose-800 space-y-2';
    resultMessageCard.innerHTML = `
      <p class="text-base sm:text-lg font-bold text-rose-600">
        "Kamu harus sering deh ngobrol sama Inas wkwkwk! 😜💬"
      </p>
      <p class="text-xs sm:text-sm text-gray-600 font-medium">
        Masa Inas yang imut gini kamu belum terlalu hafal sih? Yuk lebih sering chat, jalan bareng, atau dengerin curhatannya Inas biar skornya 10/10! 🌸✨
      </p>
    `;
    playSound('wrong');
  } else if (correctTotal >= 8 && correctTotal < 10) {
    // 8 or 9
    resultReactionIcon.className = 'w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full flex items-center justify-center text-5xl sm:text-6xl shadow-xl border-4 border-white bg-gradient-to-tr from-pink-200 via-yellow-200 to-amber-200 animate-bounce-gentle';
    resultReactionIcon.textContent = '🥰';

    resultRankPill.className = 'absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow border border-white bg-amber-500 text-white';
    resultRankPill.textContent = 'Bestie / Ayang Perhatian! ⭐';

    resultHeadline.textContent = 'Hebat Banget! Kamu Kenal Inas!';

    resultMessageCard.className = 'p-4 sm:p-5 rounded-2xl border-2 text-sm sm:text-base font-semibold leading-relaxed shadow-sm bg-yellow-50 border-yellow-200 text-yellow-900 space-y-2';
    resultMessageCard.innerHTML = `
      <p class="text-base sm:text-lg font-bold text-amber-700">
        "Wahh mantap! Kamu beneran perhatiin Inas! 💕"
      </p>
      <p class="text-xs sm:text-sm text-gray-600 font-medium">
        Skor kamu ${correctTotal} dari 10! Udah keren banget dan hampir sempurna. Inas pasti seneng punya teman / orang sedekat kamu! ✨
      </p>
    `;
    playSound('victory');
    fireConfetti();
  } else {
    // 10 / 10 Perfect
    resultReactionIcon.className = 'w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full flex items-center justify-center text-5xl sm:text-6xl shadow-xl border-4 border-white bg-gradient-to-tr from-pink-300 via-yellow-300 to-amber-300 animate-bounce-gentle';
    resultReactionIcon.textContent = '👑';

    resultRankPill.className = 'absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow border border-white bg-pink-500 text-white';
    resultRankPill.textContent = '100% SOULMATE INAS! 💖';

    resultHeadline.textContent = 'SEMPURNA! KENAL LUAR DALAM!';

    resultMessageCard.className = 'p-4 sm:p-5 rounded-2xl border-2 text-sm sm:text-base font-semibold leading-relaxed shadow-sm bg-pink-50 border-pink-200 text-pink-900 space-y-2';
    resultMessageCard.innerHTML = `
      <p class="text-base sm:text-lg font-bold text-pink-600">
        "GILA KEREN PARAH! Kamu cenayang apa soulmate Inas nih?! 💯✨"
      </p>
      <p class="text-xs sm:text-sm text-gray-600 font-medium">
        Semua 10 pertanyaan kamu libas habis dengan benar! Inas wajib kasih kamu hadiah atau traktiran nih! 🎁🥳
      </p>
    `;
    playSound('victory');
    fireConfetti();
  }

  // Populate Review Details
  renderReviewList();
}

function renderReviewList() {
  reviewContainer.innerHTML = '';

  userAnswers.forEach((ans, index) => {
    const item = document.createElement('div');
    const isOk = ans.isCorrect;

    item.className = `p-3 rounded-xl border ${
      isOk ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' : 'bg-rose-50/70 border-rose-200 text-rose-900'
    }`;

    item.innerHTML = `
      <div class="flex items-start justify-between gap-2">
        <span class="font-bold">${index + 1}. ${ans.questionText}</span>
        <span class="text-base">${isOk ? '✅' : '❌'}</span>
      </div>
      <div class="mt-1 text-[11px] space-y-0.5">
        <p>Jawaban kamu: <strong class="${isOk ? 'text-emerald-700' : 'text-rose-600'}">${ans.chosen}</strong></p>
        ${!isOk ? `<p>Jawaban benar: <strong class="text-emerald-700">${ans.correctAnswer}</strong></p>` : ''}
        <p class="text-gray-500 italic mt-0.5">${ans.note}</p>
      </div>
    `;

    reviewContainer.appendChild(item);
  });
}

function toggleReviewVisibility() {
  const isHidden = reviewContainer.classList.contains('hidden');
  if (isHidden) {
    reviewContainer.classList.remove('hidden');
    reviewArrow.textContent = '▲';
  } else {
    reviewContainer.classList.add('hidden');
    reviewArrow.textContent = '▼';
  }
}

// 7. Sharing & Actions
function getShareText() {
  const correctTotal = userAnswers.filter(a => a.isCorrect).length;
  let quote = "";
  if (correctTotal < 8) {
    quote = "Katanya: \"kamu harus sering deh ngobrol sama Inas wkwkwk 😜\"";
  } else if (correctTotal < 10) {
    quote = "Wah ternyata aku cukup peka dan kenal sama Inas! 🥰";
  } else {
    quote = "Aku kenal Inas 100% luar dalam tanpa salah! Fix soulmate! 👑💖";
  }

  return `🎀 Hasil Kuis "Seberapa Kenal Kamu Sama Inas?" 🎀\n` +
         `Nama: ${playerName}\n` +
         `Skor: ${correctTotal}/10 (${correctTotal * 10}%)\n` +
         `${quote}\n\n` +
         `Coba tes juga seberapa kenal kamu sama Inas! ✨`;
}

function shareToWhatsApp() {
  const text = encodeURIComponent(getShareText());
  const url = `https://api.whatsapp.com/send?text=${text}`;
  window.open(url, '_blank');
}

function copySummaryToClipboard() {
  const text = getShareText();
  navigator.clipboard.writeText(text).then(() => {
    const copyText = document.getElementById('copyText');
    const copyIcon = document.getElementById('copyIcon');
    copyText.textContent = 'Tersalin ke Clipboard! ✨';
    copyIcon.textContent = '✅';
    setTimeout(() => {
      copyText.textContent = 'Salin Teks Hasil';
      copyIcon.textContent = '📋';
    }, 2500);
  }).catch(() => {
    alert("Gagal menyalin otomatis, silakan copy manual yaa.");
  });
}

function restartQuiz() {
  playSound('click');
  currentQuestionIndex = 0;
  userAnswers = [];
  reviewContainer.classList.add('hidden');
  reviewArrow.textContent = '▼';

  resultScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
}

// 8. Confetti Animation
function fireConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#f472b6', '#facc15', '#fbcfe8', '#fef08a', '#ffffff']
    });
  }
}

// Run on loaded
document.addEventListener('DOMContentLoaded', init);
