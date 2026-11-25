(function () {
'use strict';

const main = document.querySelector('main[data-chapter-id]');
const chapterId = main?.dataset.chapterId;
const segments = decodeURIComponent(location.pathname).split('/').filter(Boolean);
const chapterSegment = segments.lastIndexOf('capitulos');
const bookSlug = main?.dataset.bookSlug || (chapterSegment > 0 ? segments[chapterSegment - 1] : null);
const STORAGE_KEY = chapterId && bookSlug ? `playground_${bookSlug}__${chapterId}` : null;

function readStore() {
  if (!STORAGE_KEY) return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeStore(saved) {
  if (!STORAGE_KEY) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  } catch {
    /* ignore quota */
  }
}

function migrateLegacyStore() {
  if (bookSlug !== 'prog_conc' || chapterId !== '01-concorrente-paralelo' || !STORAGE_KEY) return;
  try {
  const legacyKey = 'prog_conc_ch01_practice';
  const legacy = localStorage.getItem(legacyKey);
  if (!legacy || localStorage.getItem(STORAGE_KEY)) return;
  try {
    const data = JSON.parse(legacy);
    if (data.mcChoice) {
      data['__mc_mc-ch01'] = data.mcChoice;
      delete data.mcChoice;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.removeItem(legacyKey);
  } catch {
    /* ignore */
  }
  } catch { /* storage may be unavailable */ }
}

function initPracticeFields() {
  if (!STORAGE_KEY) return;
  migrateLegacyStore();
  const saved = readStore();
  const persist = () => writeStore(saved);

  for (const field of document.querySelectorAll('[data-practice-field]')) {
    const key = field.dataset.practiceField;
    if (saved[key] != null) field.value = saved[key];
    field.addEventListener('input', () => {
      saved[key] = field.value;
      persist();
    });
  }

  const mcName = main?.dataset.practiceMc;
  if (!mcName) return;
  const mcKey = `__mc_${mcName}`;
  if (saved[mcKey]) {
    const radio = document.querySelector(`input[name="${mcName}"][value="${saved[mcKey]}"]`);
    if (radio) radio.checked = true;
  }
  for (const radio of document.querySelectorAll(`input[name="${mcName}"]`)) {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        saved[mcKey] = radio.value;
        persist();
      }
    });
  }
}

/** Exibe dica quando um controle do laboratório muda (ex.: alternância). */
function bindPredictionHints() {
  for (const watch of document.querySelectorAll('[data-prediction-watch]')) {
    const targetId = watch.dataset.predictionWatch || watch.id;
    const hintId = watch.dataset.predictionHint;
    const target = targetId ? document.getElementById(targetId) : watch;
    const hint = hintId ? document.getElementById(hintId) : null;
    if (!target || !hint) continue;
    target.addEventListener('change', () => {
      hint.hidden = false;
    });
  }
}

initPracticeFields();
bindPredictionHints();
})();
