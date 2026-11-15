'use strict';

function createNarration(panel) {
  const read = panel.querySelector('#read');
  const pause = panel.querySelector('#pause');
  const resume = panel.querySelector('#resume');
  const stop = panel.querySelector('#stop');
  const rate = panel.querySelector('#rate');
  const voiceSelect = panel.querySelector('#voice');
  const status = panel.querySelector('[role="status"]');
  const player = panel.querySelector('audio');
  const synth = window.speechSynthesis;
  let speech = '';
  let recording = '';
  let generation = 0;
  let timer;
  let utterance;
  let deviceReading = false;
  let paused = false;

  const englishVoices = () => synth?.getVoices().filter(voice => /^en\b/i.test(voice.lang)) ?? [];
  function updateVoices() {
    const selected = voiceSelect.value;
    voiceSelect.replaceChildren(new Option('Automatic English voice', ''));
    const choices = englishVoices();
    choices.forEach(voice => voiceSelect.add(new Option(voice.name, voice.voiceURI)));
    if (choices.some(voice => voice.voiceURI === selected)) voiceSelect.value = selected;
  }

  function clear() {
    generation++;
    clearTimeout(timer);
    if (deviceReading) synth?.cancel();
    deviceReading = false;
    paused = false;
    utterance = undefined;
    if (player && !player.paused) player.pause();
    status.textContent = '';
  }

  function reset() {
    clear();
    speech = '';
    recording = '';
    panel.hidden = true;
    if (player) {
      player.hidden = true;
      if (player.hasAttribute('src')) {
        player.removeAttribute('src');
        player.load();
      }
    }
  }

  function setText(value, label = 'Read aloud', audioUrl = '') {
    speech = value;
    recording = audioUrl;
    read.textContent = audioUrl ? 'Play narration' : label;
    panel.hidden = !value.trim();
  }

  function say(value) {
    clear();
    const text = spokenText(value);
    if (!text) return;
    if (!synth || typeof SpeechSynthesisUtterance !== 'function') {
      status.textContent = 'This browser has no device reading voice.';
      return;
    }
    const choices = englishVoices();
    const voice = choices.find(v => v.voiceURI === voiceSelect.value)
      ?? choices.find(v => v.localService && /^en-US$/i.test(v.lang) && /Samantha|Ava|Allison|Zoe|enhanced|premium|natural/i.test(v.name))
      ?? choices.find(v => /^en-US$/i.test(v.lang) && /Natural|Google US English|Jenny|Aria/i.test(v.name))
      ?? choices.find(v => v.localService && /^en-US$/i.test(v.lang))
      ?? choices.find(v => /^en-US$/i.test(v.lang)) ?? choices[0];
    const chunks = speechChunks(text);
    const token = generation;
    let index = 0;
    deviceReading = true;
    function fail() {
      if (token !== generation || paused) return;
      clear();
      status.textContent = 'The device voice could not continue. Choose an English voice and try again.';
    }
    function next() {
      if (token !== generation) return;
      clearTimeout(timer);
      if (index === chunks.length) {
        deviceReading = false;
        utterance = undefined;
        status.textContent = 'Finished reading.';
        return;
      }
      utterance = new SpeechSynthesisUtterance(chunks[index++]);
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang ?? 'en-US';
      utterance.rate = Number(rate.value);
      utterance.pitch = 1;
      utterance.onstart = utterance.onresume = () => {
        if (token !== generation) return;
        clearTimeout(timer);
        status.textContent = 'Reading aloud.';
        timer = setTimeout(fail, Math.max(25000, utterance.text.length * 180));
      };
      utterance.onend = next;
      utterance.onerror = fail;
      status.textContent = 'Starting read-aloud…';
      timer = setTimeout(fail, 7500);
      try {
        synth.speak(utterance);
      } catch {
        fail();
      }
    }
    synth.resume();
    next();
  }

  read.onclick = () => {
    if (!recording || !player) {
      say(speech);
      return;
    }
    clear();
    const token = generation;
    const source = new URL(recording, document.baseURI).href;
    if (player.src !== source) player.src = source;
    player.hidden = false;
    player.playbackRate = Number(rate.value);
    player.onplaying = () => {
      if (token !== generation) return;
      status.textContent = 'Playing narration.';
    };
    player.onended = () => {
      if (token !== generation) return;
      status.textContent = 'Finished reading.';
    };
    player.play().catch(() => {
      if (token !== generation) return;
      player.hidden = true;
      say(speech);
    });
  };
  pause.onclick = () => {
    if (player && !player.paused) player.pause();
    else if (deviceReading && !paused) {
      paused = true;
      synth.pause();
    } else return;
    clearTimeout(timer);
    status.textContent = 'Paused.';
  };
  resume.onclick = () => {
    if (player && !player.hidden && player.paused && !deviceReading) {
      player.play().then(() => { status.textContent = 'Playing narration.'; })
        .catch(() => { status.textContent = 'Tap Play narration to try again.'; });
    } else if (deviceReading && paused) {
      paused = false;
      synth.resume();
      status.textContent = 'Reading aloud.';
    }
  };
  stop.onclick = () => {
    clear();
    if (player?.hasAttribute('src')) player.currentTime = 0;
    status.textContent = 'Stopped.';
  };
  rate.onchange = () => {
    if (player && !player.hidden) player.playbackRate = Number(rate.value);
  };
  updateVoices();
  synth?.addEventListener('voiceschanged', updateVoices);
  window.addEventListener('pagehide', clear);
  document.addEventListener('visibilitychange', () => { if (document.hidden) clear(); });
  return { setText, say, reset, clear };
}

function spokenText(text) {
  return text.replace(/https?:\/\/\S+/g, '')
    .replace(/¹/g, ' to the first power').replace(/²/g, ' squared').replace(/³/g, ' cubed')
    .replace(/\^(\d+)/g, ' to the power of $1')
    .replace(/\b(\d+)\s*\/\s*(\d+)\b/g, '$1 over $2')
    .replace(/½/g, ' one half ').replace(/¼/g, ' one fourth ').replace(/¾/g, ' three fourths ').replace(/⅓/g, ' one third ').replace(/⅔/g, ' two thirds ')
    .replace(/(\d)([a-z])\b/gi, '$1 $2').replace(/(\d)\(/g, '$1 times the quantity ').replace(/×/g, ' times ').replace(/÷/g, ' divided by ').replace(/→/g, ' to ')
    .replace(/−/g, ' minus ').replace(/\s-\s/g, ' minus ').replace(/=/g, ' equals ')
    .replace(/\+/g, ' plus ').replace(/%/g, ' percent ').replace(/\$/g, ' dollars ')
    .replace(/\*\*/g, '').replace(/\s+([,.!?])/g, '$1').replace(/\s+/g, ' ').trim();
}

function speechChunks(text) {
  const sentences = text.match(/[^.!?]+(?:[.!?](?!\d)|$)/g);
  // Splitting only on whitespace preserves decimals, names and the label on each choice.
  if (!sentences || /\d\.\d/.test(text)) return text.match(/.{1,210}(?:\s|$)|\S+/gs) ?? [text];
  return sentences.flatMap(sentence => sentence.length > 220
    ? sentence.match(/.{1,210}(?:\s|$)|\S+/gs) ?? [sentence]
    : [sentence.trim()]).filter(Boolean);
}
