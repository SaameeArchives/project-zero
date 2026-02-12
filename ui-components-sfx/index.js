  lucide.createIcons();

        // --- SONIC ENGINE ---
        let audioCtx = null;
        let gainNode = null;
        let isAudioEnabled = false;

        function initAudio() {
            if (audioCtx) return;
            const Ctx = window.AudioContext || window.webkitAudioContext;
            audioCtx = new Ctx();
            gainNode = audioCtx.createGain();
            gainNode.gain.value = 0.25; 
            gainNode.connect(audioCtx.destination);
            isAudioEnabled = true;
            updateAudioIcon(); 
        }

        // Global Auto-Init
        function autoInitAudio() {
            if (!audioCtx) {
                initAudio();
                window.removeEventListener('click', autoInitAudio);
                window.removeEventListener('keydown', autoInitAudio);
            }
        }
        window.addEventListener('click', autoInitAudio);
        window.addEventListener('keydown', autoInitAudio);


        function playSound(type, variant = 0) {
            if (!audioCtx || !isAudioEnabled) return;
            const now = audioCtx.currentTime;

            const createOsc = (freq, type = 'sine', g = 0.1) => {
                const o = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                o.type = type;
                o.frequency.setValueAtTime(freq, now);
                gain.gain.setValueAtTime(g, now);
                o.connect(gain);
                gain.connect(gainNode);
                return { o, gain };
            };

            switch (type) {
                case 'hover':
                    const h = createOsc(200, 'triangle', 0.05);
                    h.o.frequency.linearRampToValueAtTime(300, now + 0.1);
                    h.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                    h.o.start(now); h.o.stop(now + 0.1);
                    break;
                case 'hover-primary':
                    // Brighter, cleaner hover for primary
                    const hp = createOsc(400, 'sine', 0.05);
                    hp.o.frequency.linearRampToValueAtTime(600, now + 0.1);
                    hp.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                    hp.o.start(now); hp.o.stop(now + 0.1);
                    break;
                case 'hover-secondary':
                    // Standard soft hover
                    const hs = createOsc(200, 'triangle', 0.05);
                    hs.o.frequency.linearRampToValueAtTime(300, now + 0.1);
                    hs.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                    hs.o.start(now); hs.o.stop(now + 0.1);
                    break;
                case 'hover-destructive':
                    // Lower, darker hover
                    const hd = createOsc(100, 'sawtooth', 0.03); 
                    hd.o.frequency.linearRampToValueAtTime(80, now + 0.15); // Slight pitch drop
                    hd.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                    hd.o.start(now); hd.o.stop(now + 0.15);
                    break;
                case 'hover-input':
                    // Quick mechanical blip
                    const hi = createOsc(800, 'square', 0.02);
                    hi.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                    hi.o.start(now); hi.o.stop(now + 0.05);
                    break;
                case 'click-primary':
                    const p1 = createOsc(150, 'square', 0.05);
                    p1.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                    const p2 = createOsc(300, 'sine', 0.1);
                    p2.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                    p1.o.start(now); p1.o.stop(now + 0.1);
                    p2.o.start(now); p2.o.stop(now + 0.15);
                    break;
                case 'click-secondary': 
                    const s1 = createOsc(800, 'sine', 0.05);
                    s1.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                    const s2 = createOsc(2000, 'triangle', 0.02);
                    s2.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                    s1.o.start(now); s1.o.stop(now + 0.05);
                    s2.o.start(now); s2.o.stop(now + 0.03);
                    break;
                case 'click-destructive':
                    // UPDATED: Quieter, snappy mechanical click (Plastic/Switch sound)
                    const d1 = createOsc(800, 'square', 0.03); // Reduced gain to 0.03
                    d1.o.frequency.setValueAtTime(800, now);
                    d1.o.frequency.exponentialRampToValueAtTime(50, now + 0.06); // Fast pitch drop for "click" effect
                    d1.gain.gain.setValueAtTime(0.03, now);
                    d1.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
                    d1.o.start(now); d1.o.stop(now + 0.06);
                    break;
                case 'click-neutral':
                    const n = createOsc(1200, 'sine', 0.03);
                    n.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                    n.o.start(now); n.o.stop(now + 0.03);
                    break;
                case 'toggle-on':
                    const tOn = createOsc(400, 'sine', 0.1);
                    tOn.o.frequency.exponentialRampToValueAtTime(600, now + 0.1);
                    tOn.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                    tOn.o.start(now); tOn.o.stop(now + 0.1);
                    break;
                case 'toggle-off':
                    const tOff = createOsc(600, 'sine', 0.1);
                    tOff.o.frequency.exponentialRampToValueAtTime(400, now + 0.1);
                    tOff.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                    tOff.o.start(now); tOff.o.stop(now + 0.1);
                    break;
                case 'tick':
                    const tick = createOsc(800, 'triangle', 0.02);
                    tick.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
                    tick.o.start(now); tick.o.stop(now + 0.02);
                    break;
                case 'type':
                    // Mechanical "Click" Sound (Sharp, Snappy, Low volume)
                    
                    // 1. The High-Frequency Snap (Square wave, very fast)
                    const snap = createOsc(1200, 'square', 0.03); 
                    snap.o.frequency.setValueAtTime(1200, now);
                    snap.o.frequency.exponentialRampToValueAtTime(800, now + 0.015); 
                    snap.gain.gain.setValueAtTime(0.03, now);
                    snap.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
                    snap.o.start(now); 
                    snap.o.stop(now + 0.02);

                    // 2. High-Pass Noise (The "tchk" sound)
                    const bSize = audioCtx.sampleRate * 0.03; 
                    const buff = audioCtx.createBuffer(1, bSize, audioCtx.sampleRate);
                    const dat = buff.getChannelData(0);
                    for (let i = 0; i < bSize; i++) dat[i] = Math.random() * 2 - 1;
                    
                    const noiseSrc = audioCtx.createBufferSource();
                    noiseSrc.buffer = buff;
                    
                    const noiseFilter = audioCtx.createBiquadFilter();
                    noiseFilter.type = 'highpass';
                    noiseFilter.frequency.value = 2500; // Very high cutoff for a thin click

                    const noiseGain = audioCtx.createGain();
                    noiseGain.gain.setValueAtTime(0.06, now); 
                    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
                    
                    noiseSrc.connect(noiseFilter);
                    noiseFilter.connect(noiseGain);
                    noiseGain.connect(gainNode);
                    noiseSrc.start(now);

                    // 3. Subtle Body (Replaced Thud with a short Mid-frequency pulse)
                    const body = createOsc(350, 'sine', 0.04); 
                    body.gain.gain.setValueAtTime(0.04, now);
                    body.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                    body.o.start(now);
                    body.o.stop(now + 0.03);
                    break;
                case 'check':
                    const c = createOsc(1000, 'sine', 0.05);
                    c.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                    c.o.start(now); c.o.stop(now + 0.2);
                    break;
                case 'pad-drag':
                    // UPDATED: Granular Static (Reverted to first version style)
                    // Short burst of filtered noise/sawtooth
                    const p = createOsc(100 + (variant * 2), 'sawtooth', 0.02);
                    p.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                    p.o.start(now); p.o.stop(now + 0.05);
                    break;
                case 'success':
                    [0, 0.05, 0.1].forEach((offset, i) => {
                        const notes = [523.25, 659.25, 783.99]; 
                        const o = createOsc(notes[i], 'sine', 0.1);
                        o.gain.gain.setValueAtTime(0, now + offset);
                        o.gain.gain.linearRampToValueAtTime(0.1, now + offset + 0.05);
                        o.gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.8);
                        o.o.start(now + offset);
                        o.o.stop(now + offset + 0.8);
                    });
                    break;
            }
        }

        // --- COMPONENT LOGIC ---

        const audioBtn = document.getElementById('audio-toggle');
        
        function updateAudioIcon() {
            if (isAudioEnabled) {
                audioBtn.className = "p-3 rounded-2xl transition-all border shadow-sm bg-stone-200 text-stone-700 border-stone-300";
                audioBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-2 w-5 h-5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
            } else {
                audioBtn.className = "p-3 rounded-2xl transition-all border shadow-sm bg-[#eeedeb] text-stone-400 border-stone-200";
                audioBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-x w-5 h-5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" x2="17" y1="9" y2="15"/><line x1="17" x2="23" y1="9" y2="15"/></svg>';
            }
        }

        audioBtn.addEventListener('click', () => {
            if (!audioCtx) {
                initAudio();
            } else {
                isAudioEnabled = !isAudioEnabled;
                updateAudioIcon();
            }
        });

        // 1. Confirm Button
        const confirmBtn = document.getElementById('btn-confirm');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', (e) => {
                if (confirmBtn.dataset.state === 'loading' || confirmBtn.dataset.state === 'success') return;
                
                confirmBtn.dataset.state = 'loading';
                const originalContent = confirmBtn.innerHTML;
                const width = confirmBtn.offsetWidth;
                confirmBtn.style.width = `${width}px`;
                
                confirmBtn.innerHTML = '<svg class="animate-spin h-5 w-5 text-stone-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>';
                
                setTimeout(() => {
                    confirmBtn.dataset.state = 'success';
                    confirmBtn.classList.remove('bg-stone-800', 'text-stone-100');
                    confirmBtn.classList.add('bg-[#57534e]', 'text-stone-50', 'border-stone-500'); 
                    confirmBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>';
                    playSound('success');
                    
                    setTimeout(() => {
                        confirmBtn.dataset.state = 'idle';
                        confirmBtn.innerHTML = originalContent;
                        lucide.createIcons(); 
                        confirmBtn.style.width = '';
                        confirmBtn.classList.remove('bg-[#57534e]', 'text-stone-50', 'border-stone-500');
                        confirmBtn.classList.add('bg-stone-800', 'text-stone-100');
                    }, 2000);
                }, 1200);
            });
        }

        // Generic Button Sounds
        document.querySelectorAll('.stone-card, .sonic-tag, .radio-btn, .group.stone-card').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                const hoverSound = btn.dataset.hoverSound || 'hover';
                playSound(hoverSound);
            });
            btn.addEventListener('mousedown', () => playSound(btn.dataset.sound || 'click-neutral'));
        });

        // Badge Logic
        const badge = document.getElementById('badge-fx');
        if (badge) {
            badge.addEventListener('click', () => {
                const isActive = badge.dataset.active === 'true';
                badge.dataset.active = !isActive;
                
                const dot = badge.querySelector('span span');
                
                if (!isActive) { // Turn ON
                    badge.classList.remove('bg-[#fafaf9]', 'text-stone-500');
                    badge.classList.add('bg-stone-200', 'text-stone-900', 'border-stone-400', 'shadow-inner');
                    
                    dot.classList.remove('bg-stone-400', 'group-hover:bg-stone-600');
                    dot.classList.add('bg-emerald-500', 'shadow-[0_0_8px_rgba(16,185,129,0.5)]');
                    
                    playSound('toggle-on');
                } else { // Turn OFF
                    badge.classList.add('bg-[#fafaf9]', 'text-stone-500');
                    badge.classList.remove('bg-stone-200', 'text-stone-900', 'border-stone-400', 'shadow-inner');
                    
                    dot.classList.add('bg-stone-400', 'group-hover:bg-stone-600');
                    dot.classList.remove('bg-emerald-500', 'shadow-[0_0_8px_rgba(16,185,129,0.5)]');
                    
                    playSound('toggle-off');
                }
            });
        }

        // Player
        const playerBtn = document.getElementById('mini-player');
        let isPlaying = false;
        playerBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            if (isPlaying) {
                playerBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause w-6 h-6 fill-current text-stone-700"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>';
            } else {
                playerBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play w-6 h-6 ml-1 fill-current text-stone-700"><polygon points="6 3 20 12 6 21 6 3"/></svg>';
            }
        });

        // Toggle
        const toggle = document.getElementById('sonic-toggle');
        const knob = toggle.querySelector('div');
        let toggleState = true;
        toggle.addEventListener('click', () => {
            toggleState = !toggleState;
            playSound(toggleState ? 'toggle-on' : 'toggle-off');
            
            if (toggleState) {
                toggle.classList.replace('bg-stone-300', 'bg-stone-800');
                knob.classList.add('translate-x-7', 'border-stone-600');
                knob.classList.remove('translate-x-0', 'border-stone-100');
            } else {
                toggle.classList.replace('bg-stone-800', 'bg-stone-300');
                knob.classList.add('translate-x-0', 'border-stone-100');
                knob.classList.remove('translate-x-7', 'border-stone-600');
            }
        });

        // Slider
        const slider = document.getElementById('sonic-slider');
        const track = document.getElementById('slider-track');
        const thumb = document.getElementById('slider-thumb');
        let lastTick = 60;
        
        slider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            track.style.width = val + '%';
            thumb.style.left = `calc(${val}% - 12px)`;
            
            if (Math.abs(val - lastTick) >= 5) {
                playSound('tick');
                lastTick = val;
            }
        });
        slider.addEventListener('mousedown', () => playSound('click-neutral'));

        // Radio
        const radioBtns = document.querySelectorAll('.radio-btn');
        radioBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                playSound('check');
                radioBtns.forEach(b => {
                    b.className = 'radio-btn h-full w-12 flex items-center justify-center rounded-lg transition-all text-stone-400 hover:bg-stone-100 hover:text-stone-600';
                });
                btn.className = 'radio-btn h-full w-12 flex items-center justify-center rounded-lg transition-all bg-stone-200 text-stone-800 shadow-inner';
            });
        });

        // Input
        const input = document.getElementById('sonic-input');
        input.addEventListener('keydown', (e) => {
            if (e.key.length === 1 || e.key === 'Backspace') playSound('type');
        });

        // Dial
        const dial = document.getElementById('sonic-dial');
        let rotation = 45;
        let dialLastTick = 45;
        let isDraggingDial = false;
        let startY = 0;
        let startRot = 0;

        dial.addEventListener('mousedown', (e) => {
            isDraggingDial = true;
            startY = e.clientY;
            startRot = rotation;
            document.body.style.cursor = 'ns-resize';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDraggingDial) return;
            const delta = e.clientY - startY; 
            let newRot = startRot + delta * 2;
            newRot = Math.min(135, Math.max(-135, newRot));
            
            rotation = newRot;
            dial.style.transform = `rotate(${rotation}deg)`;
            
            if (Math.abs(rotation - dialLastTick) >= 15) {
                playSound('tick');
                dialLastTick = rotation;
            }
        });

        window.addEventListener('mouseup', () => {
            isDraggingDial = false;
            document.body.style.cursor = 'default';
        });

        // Pad - Reverted Sound Logic
        const pad = document.getElementById('sonic-pad');
        pad.addEventListener('mousemove', (e) => {
            // Reverted: Random granular trigger
            if (e.buttons === 1 && Math.random() > 0.8) {
                playSound('pad-drag', e.clientX);
            }
        });
