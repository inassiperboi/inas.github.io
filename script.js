/**
 * 🌸 Happy 3rd Anniversary, Inasku Sayang! 🐱💖
 * Interactive Love Letter, Cat Playground & Polaroid Memory Wall
 * 13 November 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  initFloatingUniverse();
  initClickHeartEffect();
  initEnvelopeInteraction();
  initPolaroidModal();
  initLoveButtons();
  initAudioSynthesizer();
});

/* ==========================================================
   1. FLOATING UNIVERSE (HEARTS, PAWS, KITTENS)
========================================================== */
function initFloatingUniverse() {
  const container = document.getElementById('floatingUniverse');
  if (!container) return;

  const items = ['💖', '💕', '🐾', '🌸', '🐱', '✨', '🍓', '🎀', '🧸'];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.className = 'floating-love';
    span.textContent = items[Math.floor(Math.random() * items.length)];
    span.style.left = `${Math.random() * 95}vw`;
    span.style.fontSize = `${1.1 + Math.random() * 1.5}rem`;
    span.style.animationDuration = `${7 + Math.random() * 9}s`;
    span.style.animationDelay = `${Math.random() * 8}s`;
    container.appendChild(span);
  }
}

/* ==========================================================
   2. TAP / CLICK SPAWN HEARTS & PAWS
========================================================== */
function initClickHeartEffect() {
  const icons = ['💖', '💕', '🐾', '✨', '🌸', '🐱'];

  window.addEventListener('click', (e) => {
    // Avoid triggering if clicking inside modal close or buttons
    if (e.target.closest('#closeModalBtn')) return;

    const heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.textContent = icons[Math.floor(Math.random() * icons.length)];
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 800);
  });
}

/* ==========================================================
   3. ENVELOPE OPENING INTERACTION
========================================================== */
function initEnvelopeInteraction() {
  const envelopeContainer = document.getElementById('envelopeContainer');
  const openLetterBtn = document.getElementById('openLetterBtn');
  const envelopeSection = document.getElementById('envelopeSection');
  const letterSection = document.getElementById('letterSection');

  let isOpen = false;

  function openLetter() {
    if (isOpen) return;
    isOpen = true;

    // Play sweet chime
    playSweetChime();

    // Trigger envelope open animation
    envelopeContainer.classList.add('open');

    // Shower with love confetti
    showerHearts();

    // Fade out envelope section smoothly
    setTimeout(() => {
      envelopeSection.classList.add('transition-all', 'duration-500', 'opacity-0', 'pointer-events-none');
    }, 600);

    // Reveal the letter section
    setTimeout(() => {
      envelopeSection.classList.add('hidden');
      letterSection.classList.remove('hidden');

      // Trigger fade-in & slide-up
      requestAnimationFrame(() => {
        letterSection.classList.remove('opacity-0', 'translate-y-12');
        letterSection.classList.add('opacity-100', 'translate-y-0');
      });

      // Extra burst of celebration confetti
      setTimeout(showerHearts, 400);

      // Smooth scroll to top of letter
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 1100);
  }

  if (envelopeContainer) envelopeContainer.addEventListener('click', openLetter);
  if (openLetterBtn) openLetterBtn.addEventListener('click', openLetter);
}

/* ==========================================================
   4. POLAROID MODAL LIGHTBOX
========================================================== */
function initPolaroidModal() {
  const polaroids = document.querySelectorAll('.polaroid-card');
  const modal = document.getElementById('photoModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDate = document.getElementById('modalDate');
  const modalText = document.getElementById('modalText');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalLoveBtn = document.getElementById('modalLoveBtn');

  polaroids.forEach((card) => {
    card.addEventListener('click', () => {
      const photoSrc = card.getAttribute('data-photo');
      const title = card.getAttribute('data-title');
      const date = card.getAttribute('data-date');
      const text = card.getAttribute('data-text');

      modalImg.src = photoSrc;
      modalTitle.textContent = title;
      modalDate.textContent = date;
      modalText.textContent = text;

      modal.classList.add('show');
      playPopSound();
      showerMiniHearts();
    });
  });

  function closeModal() {
    modal.classList.remove('show');
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalLoveBtn) {
    modalLoveBtn.addEventListener('click', () => {
      showerHearts();
      playSweetChime();
      closeModal();
    });
  }

  // Close when clicking backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

/* ==========================================================
   5. INTERACTIVE LOVE & KITTEN BUTTONS
========================================================== */
function initLoveButtons() {
  const randomLoveBtn = document.getElementById('randomLoveBtn');
  const catPurrBtn = document.getElementById('catPurrBtn');
  const fireworksBtn = document.getElementById('fireworksBtn');
  const whatsappAnnivBtn = document.getElementById('whatsappAnnivBtn');
  const loveDisplayCard = document.getElementById('loveDisplayCard');
  const loveDisplayText = document.getElementById('loveDisplayText');

  // Cute romantic messages for Inas
  const inasQuotes = [
    "Inas itu cantiknya 24/7 tanpa henti! Sayang Inas banyak-banyak! 🐱💖",
    "Tau gak? 3 tahun ini adalah 3 tahun paling bahagia dalam hidupku karena ada Inas! 🌸",
    "Kalau disuruh mengulang waktu sejuta kali, aku tetep bakal selalu milih Inas! 💍✨",
    "Senyum Inas itu obat paling ampuh buat segala capek dan bad mood! 🍓",
    "Inas jangan lupa ya, di sini ada yang selalu bangga dan sayang banget sama kamu! 🐾",
    "Makasih udah sabar, udah lucu, dan selalu bikin kangen tiap detik! 💕",
    "Inas + Aku = Duo ter-gemas sedunia! Happy 3rd Anniversary sayang! 🥳",
    "Semoga kita terus barengan ya Inas, sampai kakek nenek dan selamanya! 🏡✨",
    "Peluk erat Inas dari jauh... Meowww sayang Inasku! 🐾💖"
  ];

  let quoteIndex = 0;

  if (randomLoveBtn) {
    randomLoveBtn.addEventListener('click', () => {
      quoteIndex = (quoteIndex + 1) % inasQuotes.length;
      loveDisplayText.textContent = inasQuotes[quoteIndex];
      loveDisplayCard.classList.remove('hidden');
      playSweetChime();
      showerMiniHearts();
    });
  }

  if (catPurrBtn) {
    catPurrBtn.addEventListener('click', () => {
      playCatMeow();
      loveDisplayText.textContent = "🐾 Meowww! Pelukan hangat & ciuman penuh sayang mendarat di pipi Inas! 🥰🐱";
      loveDisplayCard.classList.remove('hidden');
      showerHearts();
    });
  }

  if (fireworksBtn) {
    fireworksBtn.addEventListener('click', () => {
      playSweetChime();
      showerHearts();
      setTimeout(showerHearts, 300);
      setTimeout(showerHearts, 600);
    });
  }

  if (whatsappAnnivBtn) {
    whatsappAnnivBtn.addEventListener('click', () => {
      const msg = encodeURIComponent(
        "Happy 3rd Anniversary Inasku tersayang! 🐱💖\n" +
        "Makasih banyak udah 3 tahun selalu ada, selalu bikin bahagia, dan jadi tempat pulang paling nyaman.\n" +
        "I love you so much, now and forever! 🌸💍✨\n\n" +
        "Buka surat cinta kita di sini yuk: https://inassiperboi.github.io"
      );
      window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
    });
  }
}

/* ==========================================================
   6. CONFETTI GENERATORS (HEARTS & STARS)
========================================================== */
function showerHearts() {
  if (typeof confetti !== 'function') return;

  confetti({
    particleCount: 65,
    spread: 70,
    origin: { y: 0.65 },
    colors: ['#f472b6', '#fb7185', '#fbcfe8', '#facc15', '#ffffff'],
    scalar: 1.2
  });
}

function showerMiniHearts() {
  if (typeof confetti !== 'function') return;

  confetti({
    particleCount: 25,
    spread: 45,
    origin: { y: 0.7 },
    colors: ['#fda4af', '#f472b6', '#fed7aa']
  });
}

/* ==========================================================
   7. WEB AUDIO SYNTHESIZER (MUSIC & SOUND FX)
========================================================== */
let audioCtx = null;
let musicPlaying = false;
let musicInterval = null;

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

function playSweetChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Arpeggio chords: C5, E5, G5, B5, C6
    const freqs = [523.25, 659.25, 783.99, 987.77, 1046.50];
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + idx * 0.09);
      gain.gain.setValueAtTime(0.12, now + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.52);
    });
  } catch (e) {
    console.warn("Chime error:", e);
  }
}

function playPopSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.1);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.13);
  } catch (e) {
    console.warn("Pop sound error:", e);
  }
}

function playCatMeow() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    // Meow curve: low -> high pitch -> soft slide down
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.linearRampToValueAtTime(800, now + 0.18);
    osc.frequency.exponentialRampToValueAtTime(550, now + 0.55);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.58);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.6);
  } catch (e) {
    console.warn("Meow error:", e);
  }
}

function initAudioSynthesizer() {
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicIcon = document.getElementById('musicIcon');
  const musicText = document.getElementById('musicText');

  // Ambient gentle music chords (Lofi / kalimba romantic progression)
  const chordNotes = [
    [523.25, 659.25, 783.99], // C major
    [440.00, 523.25, 659.25], // A minor
    [349.23, 440.00, 523.25], // F major
    [392.00, 493.88, 587.33]  // G major
  ];

  let chordIndex = 0;

  function playAmbientChords() {
    if (!musicPlaying) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = chordNotes[chordIndex];
      chordIndex = (chordIndex + 1) % chordNotes.length;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.15);
        gain.gain.setValueAtTime(0.04, now + idx * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + idx * 0.15 + 1.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.15);
        osc.stop(now + idx * 0.15 + 1.85);
      });
    } catch (e) {
      console.warn("Ambient music error:", e);
    }
  }

  function startMusic() {
    musicPlaying = true;
    musicIcon.textContent = '🎵';
    musicText.textContent = 'Musik Cinta: On';
    playAmbientChords();
    musicInterval = setInterval(playAmbientChords, 2200);
  }

  function stopMusic() {
    musicPlaying = false;
    musicIcon.textContent = '🔇';
    musicText.textContent = 'Musik Cinta: Off';
    if (musicInterval) {
      clearInterval(musicInterval);
      musicInterval = null;
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      if (musicPlaying) {
        stopMusic();
      } else {
        startMusic();
      }
    });
  }

  // Auto start on first user interaction anywhere
  window.addEventListener('click', () => {
    if (!musicPlaying && !musicInterval) {
      startMusic();
    }
  }, { once: true });
}
