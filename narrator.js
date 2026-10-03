'use strict';
(function(){
  const RATE_KEY='learnwithry_narration_rate_v1';
  let utterance=null,engaged=false;
  const supported='speechSynthesis' in window&&'SpeechSynthesisUtterance' in window;
  const rate=()=>{const n=Number(localStorage.getItem(RATE_KEY)||.85);return Number.isFinite(n)?Math.min(1.1,Math.max(.65,n)):.85};
  function setStatus(root,message){const node=root?.querySelector('[data-ry-narration-status]');if(node)node.textContent=message}
  function stop(root){if(supported)window.speechSynthesis.cancel();utterance=null;setStatus(root,'Narration stopped.')}
  function speak(text,root){
    const clean=String(text||'').replace(/\s+/g,' ').trim();
    if(!supported){setStatus(root,'Read aloud is not available in this browser.');return}
    if(!clean){setStatus(root,'There is nothing to read here yet.');return}
    engaged=true;window.speechSynthesis.cancel();
    utterance=new SpeechSynthesisUtterance(clean);
    utterance.lang='en-US';utterance.rate=rate();utterance.pitch=1;
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
    return '<div class="narration" aria-label="Narration controls"><button type="button" data-ry-read>🔊 '+label+'</button><button type="button" data-ry-pause>⏯ Pause / resume</button><button type="button" data-ry-stop>⏹ Stop</button><label>Speed <select data-ry-rate aria-label="Narration speed"><option value="0.75">Slow</option><option value="0.85">Learning pace</option><option value="1">Regular</option></select></label><span data-ry-narration-status role="status" aria-live="polite">Ready to read.</span></div>';
  }
  function bind(root,getText){
    if(!root)return;
    const read=root.querySelector('[data-ry-read]'),pause=root.querySelector('[data-ry-pause]'),stopButton=root.querySelector('[data-ry-stop]'),selector=root.querySelector('[data-ry-rate]');
    if(selector){selector.value=String(rate());selector.onchange=()=>{localStorage.setItem(RATE_KEY,selector.value);if(window.speechSynthesis.speaking)speak(getText(),root)}}
    if(read)read.onclick=()=>speak(getText(),root);
    if(pause)pause.onclick=()=>pauseResume(root);
    if(stopButton)stopButton.onclick=()=>stop(root);
  }
  window.addEventListener('beforeunload',()=>stop());
  function speakFeedback(text,root){if(engaged)speak(text,root)}
  window.RyNarrator={supported,toolbar,bind,speak,speakFeedback,stop,pauseResume,rate,get engaged(){return engaged}};
})();
