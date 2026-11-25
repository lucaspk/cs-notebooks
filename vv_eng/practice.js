'use strict';

const main = document.querySelector('main[data-chapter-id]');
const chapterId = main?.dataset.chapterId;
const STORAGE_KEY = chapterId ? `playground_vv_eng__${chapterId}` : null;

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

function initPracticeFields() {
  if (!STORAGE_KEY) return;
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