'use strict';
(function(){
  const RATE_KEY='learnwithry_narration_rate_v1';
  const VOICE_KEY='learnwithry_narration_voice_v1';
  const FEMALE_NAMES=['aria','jenny','ava','emma','michelle','sonia','samantha','victoria','karen','moira','tessa','fiona','susan','hazel','zira','salli','joanna','kimberly','kendra','ivy','amy','nicole','olivia','google us english','google uk english female'];
  const MALE_NAMES=['david','mark','guy','andrew','ryan','brian','joey','matthew','justin','eric','christopher','roger','arthur','george','daniel','james'];
  let utterance=null,engaged=false;
  const supported='speechSynthesis' in window&&'SpeechSynthesisUtterance' in window;
  const rate=()=>{const n=Number(localStorage.getItem(RATE_KEY)||.85);return Number.isFinite(n)?Math.min(1.1,Math.max(.65,n)):.85};
  const availableVoices=()=>supported?window.speechSynthesis.getVoices().filter(v=>/^en(?:-|_)/i.test(v.lang||'')):[];
  function voiceScore(voice){
    const name=String(voice?.name||'').toLowerCase(),lang=String(voice?.lang||'').toLowerCase();
    let score=lang.startsWith('en-us')?40:lang.startsWith('en')?15:0;
    if(/natural|online|neural|premium|enhanced/.test(name))score+=35;
    if(FEMALE_NAMES.some(part=>name.includes(part)))score+=100;
    if(MALE_NAMES.some(part=>name.includes(part)))score-=150;
    if(voice?.default)score+=3;
    return score;
  }
  function preferredVoice(){
    const voices=availableVoices(),saved=localStorage.getItem(VOICE_KEY);
    if(saved){const exact=voices.find(v=>`${v.name}|${v.lang}`===saved);if(exact)return exact}
    return voices.sort((a,b)=>voiceScore(b)-voiceScore(a)||a.name.localeCompare(b.name))[0]||null;
  }
  function setStatus(root,message){const node=root?.querySelector('[data-ry-narration-status]');if(node)node.textContent=message}
  function stop(root){if(supported)window.speechSynthesis.cancel();utterance=null;setStatus(root,'Narration stopped.')}
  function speak(text,root){
    const clean=String(text||'').replace(/\s+/g,' ').trim();
    if(!supported){setStatus(root,'Read aloud is not available in this browser.');return}
    if(!clean){setStatus(root,'There is nothing to read here yet.');return}
    engaged=true;window.speechSynthesis.cancel();
    utterance=new SpeechSynthesisUtterance(clean);
    const voice=preferredVoice();
    utterance.lang=voice?.lang||'en-US';utterance.voice=voice;utterance.rate=rate();utterance.pitch=1;
    utterance.onstart=()=>setStatus(root,'Reading aloud.');
    utterance.onend=()=>{utterance=null;setStatus(root,'Narration finished.')};
    utterance.onerror=e=>{utterance=null;setStatus(root,e.error==='canceled'?'Narration stopped.':'Narration could not continue.')};
    window.speechSynthesis.speak(utterance);
  }
  function pauseResume(root){
    if(!supported)return setStatus(root,'Read aloud is not available in this browser.');
    if(window.speechSynthesis.paused){window.speechSynthesis.resume();setStatus(root,'Narration resumed.');return}
    if(window.speechSynthesis.speaking){window.speechSynthesis.pause();setStatus(root,'Narration paused.');return}
    setStatus(root,'Choose Read aloud first.');
  }
  function toolbar(label='Read aloud'){
    if(!supported)return '<div class="narration unsupported" role="note">🔇 Read aloud is not available in this browser.</div>';
    return '<div class="narration" aria-label="Narration controls"><button type="button" data-ry-read>🔊 '+label+'</button><button type="button" data-ry-pause>⏯ Pause / resume</button><button type="button" data-ry-stop>⏹ Stop</button><label>Voice <select data-ry-voice aria-label="Narration voice"><option value="">Natural female (recommended)</option></select></label><button type="button" data-ry-preview>Preview voice</button><label>Speed <select data-ry-rate aria-label="Narration speed"><option value="0.75">Slow</option><option value="0.85">Learning pace</option><option value="1">Regular</option></select></label><span data-ry-narration-status role="status" aria-live="polite">Ready to read.</span></div>';
  }
  function fillVoiceSelector(selector){
    if(!selector)return;
    const saved=localStorage.getItem(VOICE_KEY)||'',voices=availableVoices().sort((a,b)=>voiceScore(b)-voiceScore(a)||a.name.localeCompare(b.name));
    selector.innerHTML='<option value="">Natural female (recommended)</option>'+voices.map(v=>{const value=`${v.name}|${v.lang}`;return`<option value="${value.replace(/&/g,'&amp;').replace(/"/g,'&quot;')}">${v.name} (${v.lang})</option>`}).join('');
    selector.value=voices.some(v=>`${v.name}|${v.lang}`===saved)?saved:'';
  }
  function bind(root,getText){
    if(!root)return;
    const read=root.querySelector('[data-ry-read]'),pause=root.querySelector('[data-ry-pause]'),stopButton=root.querySelector('[data-ry-stop]'),selector=root.querySelector('[data-ry-rate]'),voiceSelector=root.querySelector('[data-ry-voice]'),preview=root.querySelector('[data-ry-preview]');
    if(selector){selector.value=String(rate());selector.onchange=()=>{localStorage.setItem(RATE_KEY,selector.value);if(window.speechSynthesis.speaking)speak(getText(),root)}}
    fillVoiceSelector(voiceSelector);
    if(voiceSelector){voiceSelector.onchange=()=>{if(voiceSelector.value)localStorage.setItem(VOICE_KEY,voiceSelector.value);else localStorage.removeItem(VOICE_KEY);speak('Hi Ry. This is your lesson voice.',root)}}
    if(preview)preview.onclick=()=>speak('Hi Ry. This is your lesson voice. We will learn it one step at a time.',root);
    if(supported&&window.speechSynthesis.addEventListener)window.speechSynthesis.addEventListener('voiceschanged',()=>fillVoiceSelector(voiceSelector),{once:true});
    if(read)read.onclick=()=>speak(getText(),root);
    if(pause)pause.onclick=()=>pauseResume(root);
    if(stopButton)stopButton.onclick=()=>stop(root);
  }
  window.addEventListener('beforeunload',()=>stop());
  function speakFeedback(text,root){if(engaged)speak(text,root)}
  window.RyNarrator={supported,toolbar,bind,speak,speakFeedback,stop,pauseResume,rate,preferredVoice,get engaged(){return engaged}};
})();
