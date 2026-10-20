(() => {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  const smooth = (a, b, n) => { const t = clamp((n - a) / (b - a)); return t * t * (3 - 2 * t); };
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  root.classList.add('ready');
  // O sistema pode pedir menos movimento; quem quiser as animações liga pelo botão da barra.
  let forced = false;
  try { forced = localStorage.getItem('motion') === 'on'; } catch { /* sem storage */ }
  let motion = !reduce.matches || forced;
  root.classList.toggle('motion', motion);
  const motionBtn = document.querySelector('[data-motion-toggle]');
  const syncMotionBtn = () => {
    motionBtn.hidden = !reduce.matches;
    motionBtn.setAttribute('aria-pressed', String(forced));
  };
  syncMotionBtn();
  motionBtn.addEventListener('click', () => {
    forced = !forced;
    try { localStorage.setItem('motion', forced ? 'on' : 'off'); } catch { /* sem storage */ }
    location.reload();
  });

  let vw = window.innerWidth;
  let vh = window.innerHeight;

  /* ---------- Rolagem suave ---------- */
  let lenis = null;
  const startLenis = () => {
    if (!motion || !window.Lenis || lenis) return;
    lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', update);
    const raf = (t) => { lenis && lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  };
  window.addEventListener('load', startLenis);

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    const target = id === '#topo' ? document.body : document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target === document.body ? 0 : target, { offset: 0, duration: 1.4 });
    else target.scrollIntoView({ behavior: motion ? 'smooth' : 'auto' });
    history.replaceState(null, '', id);
    if (target.focus && target !== document.body) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });

  /* ---------- Barra: cor da seção atual ---------- */
  const grounds = {
    yellow: ['#f7c600', '#131313'],
    blue: ['#1446d8', '#ffffff'],
    orange: ['#f26a1b', '#131313'],
    green: ['#3f9b3a', '#0c160b'],
    red: ['#c8242f', '#ffffff'],
    slate: ['#e4e7ea', '#131313'],
    black: ['#111111', '#f7c600'],
  };
  const bar = document.querySelector('[data-bar]');
  const navLinks = [...document.querySelectorAll('.bar__nav a')];
  const sections = [...document.querySelectorAll('[data-ground]')];
  let barKey = '';
  const setBar = (key) => {
    if (key === barKey) return;
    barKey = key;
    const [g, i] = grounds[key];
    bar.style.setProperty('--bar-ground', g);
    bar.style.setProperty('--bar-ink', i);
  };

  /* ---------- Abertura: mergulho no núcleo do O ---------- */
  const dive = document.querySelector('[data-dive]');
  const stage = dive.querySelector('[data-dive-stage]');
  const word = dive.querySelector('[data-dive-word]');
  const oGlyph = dive.querySelector('[data-dive-o]');
  const fades = [...dive.querySelectorAll('[data-dive-fade]')];
  const light = dive.querySelector('[data-dive-light]');
  const insideMsg = dive.querySelector('[data-dive-inside]');
  const ctx = light.getContext('2d');
  const measure = document.createElement('canvas').getContext('2d');
  const core = { x: 0, y: 0, r: 10, max: 100 };
  let diveP = 0;

  const layoutDive = () => {
    word.style.transform = 'none';
    const fs = parseFloat(getComputedStyle(word).fontSize);
    measure.font = `900 ${fs}px Unbounded`;
    const m = measure.measureText('O');
    const s = stage.getBoundingClientRect();
    const o = oGlyph.getBoundingClientRect();
    const w = word.getBoundingClientRect();
    const asc = m.fontBoundingBoxAscent || fs * 0.97;
    const desc = m.fontBoundingBoxDescent || fs * 0.24;
    const inkW = m.actualBoundingBoxLeft + m.actualBoundingBoxRight || fs * 0.8;
    // O "O" é inline-block: a caixa tem a altura da linha, então a linha de base fica no meio da meia-entrelinha.
    const baseline = o.top + (o.height - (asc + desc)) / 2 + asc;
    core.x = o.left + (m.actualBoundingBoxRight - m.actualBoundingBoxLeft) / 2 - s.left;
    core.y = baseline - (m.actualBoundingBoxAscent - (m.actualBoundingBoxDescent || 0)) / 2 - s.top;
    core.r = Math.max(5, inkW * 0.15);
    core.max = (Math.hypot(Math.max(core.x, s.width - core.x), Math.max(core.y, s.height - core.y)) * 1.08) / core.r;
    word.style.setProperty('--ox', `${core.x + s.left - w.left}px`);
    word.style.setProperty('--oy', `${core.y + s.top - w.top}px`);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    light.width = Math.round(s.width * dpr);
    light.height = Math.round(s.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    light.style.setProperty('--cx', `${core.x}px`);
    light.style.setProperty('--cy', `${core.y}px`);
    paintDive();
  };

  const paintDive = () => {
    if (!motion) {
      word.style.transform = '';
      word.style.opacity = '';
      fades.forEach((f) => { f.style.opacity = ''; f.style.transform = ''; });
      return;
    }
    const p = diveP;
    const t = ease(clamp(p / 0.8));
    const scale = Math.exp(Math.log(core.max) * t);
    // A palavra some antes de virar uma camada gigante; daí em diante só o núcleo cresce.
    word.style.transform = `scale(${Math.min(scale, 16)})`;
    word.style.opacity = String(1 - smooth(7, 15, scale));
    word.style.visibility = scale >= 15 ? 'hidden' : '';
    light.style.setProperty('--core-r', `${core.r * scale}px`);
    const inside = smooth(0.74, 0.88, p);
    insideMsg.style.opacity = String(inside);
    insideMsg.style.transform = `scale(${0.86 + inside * 0.14})`;
    const f = smooth(0, 0.12, p);
    fades.forEach((el) => {
      el.style.opacity = String(1 - f);
      el.style.transform = `translateY(${f * 40}px)`;
      el.style.visibility = f > 0.99 ? 'hidden' : '';
    });
  };

  // Do lado de dentro do O: rastros de luz correndo em direção a quem olha.
  const streaks = Array.from({ length: 200 }, () => spawn({}));
  function spawn(s) {
    const a = Math.random() * Math.PI * 2;
    const d = 0.06 + Math.random() * 1.2;
    s.x = Math.cos(a) * d; s.y = Math.sin(a) * d;
    s.z = 0.2 + Math.random() * 0.8;
    const r = Math.random();
    s.c = r < 0.55 ? '#ffffff' : r < 0.8 ? '#f7c600' : r < 0.9 ? '#f26a1b' : '#7fd17a';
    return s;
  }
  let lightOn = false;
  let lastT = 0;
  const drawLight = (now) => {
    if (!lightOn || !motion) return;
    const dt = Math.min(0.05, (now - lastT) / 1000 || 0.016);
    lastT = now;
    const w = light.width / Math.min(window.devicePixelRatio || 1, 1.5);
    const h = light.height / Math.min(window.devicePixelRatio || 1, 1.5);
    const p = diveP;
    const mix = smooth(0.35, 0.95, p);
    const cx = core.x + (w / 2 - core.x) * mix;
    const cy = core.y + (h / 2 - core.y) * mix;
    const speed = 0.12 + ease(clamp(p / 0.85)) * 1.9;
    const focal = Math.max(w, h) * 0.32;
    ctx.fillStyle = '#1446d8';
    ctx.fillRect(0, 0, w, h);
    ctx.lineCap = 'round';
    // No fim do mergulho a luz assenta, e o azul encosta liso na seção seguinte.
    const settle = 1 - smooth(0.9, 1, p);
    for (const s of streaks) {
     
      s.z -= speed * dt;
      if (s.z <= 0.03) { spawn(s); s.z = 1; continue; }
      const x2 = cx + (s.x / s.z) * focal, y2 = cy + (s.y / s.z) * focal;
      if (x2 < -50 || x2 > w + 50 || y2 < -50 || y2 > h + 50) { spawn(s); s.z = 1; continue; }
      ctx.strokeStyle = s.c;
      // Rastro: do ponto de alguns quadros atrás até a posição atual.
      const tail = 1 + speed * 0.22 / s.z;
      const x0 = cx + (x2 - cx) / tail, y0 = cy + (y2 - cy) / tail;
      ctx.globalAlpha = clamp(1.15 - s.z) * settle;
      ctx.lineWidth = clamp(1.4 / s.z, 0.6, 4.5);
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x2, y2); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawLight);
  };
  new IntersectionObserver(([e]) => {
    const was = lightOn;
    lightOn = e.isIntersecting;
    if (lightOn && !was) { lastT = performance.now(); requestAnimationFrame(drawLight); }
  }).observe(dive);

  /* ---------- Íris: cada seção entra por um núcleo que se abre ---------- */
  const irises = [...document.querySelectorAll('[data-iris]')].map((el) => ({ el, bg: el.querySelector('.sec__bg') }));
  const irisImgs = [...document.querySelectorAll('[data-iris-img]')];

  /* ---------- Fluxo do n8n ---------- */
  const flow = document.querySelector('[data-flow]');
  const wires = flow.querySelector('[data-flow-wires]');
  const nodes = [...flow.querySelectorAll('[data-node]')];
  const NS = 'http://www.w3.org/2000/svg';
  let paths = [], lens = [], total = 0, packet = null;
  const layoutFlow = () => {
    wires.innerHTML = '';
    const f = flow.getBoundingClientRect();
    paths = []; lens = []; total = 0;
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = nodes[i].getBoundingClientRect();
      const b = nodes[i + 1].getBoundingClientRect();
      let d;
      if (b.left >= a.right - 2) {
        const x1 = a.right - f.left, y1 = a.top + a.height / 2 - f.top;
        const x2 = b.left - f.left, y2 = b.top + b.height / 2 - f.top;
        const k = (x2 - x1) * 0.55;
        d = `M${x1} ${y1}C${x1 + k} ${y1} ${x2 - k} ${y2} ${x2} ${y2}`;
      } else {
        const x1 = a.left + a.width / 2 - f.left, y1 = a.bottom - f.top;
        const x2 = b.left + b.width / 2 - f.left, y2 = b.top - f.top;
        const k = Math.max(24, (y2 - y1) * 0.6);
        d = `M${x1} ${y1}C${x1} ${y1 + k} ${x2} ${y2 - k} ${x2} ${y2}`;
      }
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('d', d);
      wires.appendChild(p);
      paths.push(p);
      const l = p.getTotalLength();
      lens.push(l); total += l;
    }
    packet = document.createElementNS(NS, 'circle');
    packet.setAttribute('r', '7');
    wires.appendChild(packet);
  };
  const paintFlow = () => {
    if (!paths.length) return;
    const r = flow.getBoundingClientRect();
    const q = motion ? clamp((vh * 0.82 - r.top) / (r.height + vh * 0.25)) : 1;
    let pos = q * total;
    nodes[0].classList.toggle('is-on', q > 0.001);
    let acc = 0;
    for (let i = 0; i < paths.length; i++) {
      const passed = pos >= acc + lens[i] - 0.5;
      paths[i].classList.toggle('lit', pos > acc);
      nodes[i + 1].classList.toggle('is-on', passed);
      if (pos >= acc && pos <= acc + lens[i]) {
        const pt = paths[i].getPointAtLength(pos - acc);
        packet.setAttribute('cx', pt.x); packet.setAttribute('cy', pt.y);
      }
      acc += lens[i];
    }
    packet.style.opacity = motion && q > 0.001 && q < 0.999 ? '1' : '0';
  };

  /* ---------- Atualização por rolagem ---------- */
  let queued = false;
  function update() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      const d = dive.getBoundingClientRect();
      diveP = clamp(-d.top / Math.max(1, d.height - vh));
      paintDive();

      if (motion) {
        const R = Math.hypot(vw, vh) * 1.05;
        for (const { el, bg } of irises) {
          const top = el.getBoundingClientRect().top;
          const q = clamp((vh - top) / (vh * 0.78));
          bg.style.setProperty('--r', q >= 1 ? '300vmax' : `${Math.pow(q, 1.5) * R}px`);
        }
        for (const img of irisImgs) {
          const top = img.getBoundingClientRect().top;
          const q = clamp((vh - top) / (vh * 0.6));
          img.style.setProperty('--ir', `${ease(q) * 75}%`);
        }
      }
      paintFlow();

      // A barra assume a cor do que está embaixo dela.
      let key = diveP > 0.66 && d.bottom > 70 ? 'blue' : 'yellow';
      let current = null;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= 70 && r.bottom > 70 && s !== dive) { key = s.dataset.ground; current = s; }
      }
      if (d.bottom <= 70 && !current) key = 'black';
      setBar(key);
      navLinks.forEach((a) => a.setAttribute('aria-current', String(!!current && a.getAttribute('href') === `#${current.id}`)));
    });
  }
  window.addEventListener('scroll', update, { passive: true });

  const relayout = () => {
    vw = window.innerWidth; vh = window.innerHeight;
    layoutDive(); layoutFlow(); update();
  };
  let rt = 0;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(relayout, 120); });
  reduce.addEventListener('change', () => {
    motion = !reduce.matches || forced;
    syncMotionBtn();
    root.classList.toggle('motion', motion);
    if (!motion && lenis) { lenis.destroy(); lenis = null; }
    relayout();
  });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(relayout);
  relayout();

  /* ---------- Entradas de texto ---------- */
  document.querySelectorAll('[data-split]').forEach((h) => {
    const words = h.textContent.trim().split(/\s+/);
    h.setAttribute('aria-label', h.textContent.trim());
    h.innerHTML = words.map((w, i) => `<span class="w" aria-hidden="true" style="--i:${i}">${w}</span>`).join(' ');
  });
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -12% 0px' });
  document.querySelectorAll('[data-rise], [data-split]').forEach((el) => io.observe(el));

  /* ---------- Projetos: espiar com o mouse ---------- */
  const peek = document.querySelector('[data-peek]');
  const peekImg = peek.querySelector('[data-peek-img]');
  const index = document.querySelector('[data-index]');
  const pos = { x: 0, y: 0, tx: 0, ty: 0, on: false, running: false };
  const follow = () => {
    pos.x += (pos.tx - pos.x) * (motion ? 0.16 : 1);
    pos.y += (pos.ty - pos.y) * (motion ? 0.16 : 1);
    peek.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    if (pos.on || Math.abs(pos.tx - pos.x) > 0.5) requestAnimationFrame(follow);
    else pos.running = false;
  };
  index.addEventListener('pointermove', (e) => {
    if (!fine.matches) return;
    const w = peek.offsetWidth, h = peek.offsetHeight;
    pos.tx = Math.min(vw - w - 16, e.clientX + 28);
    pos.ty = clamp(e.clientY - h / 2, 80, vh - h - 16);
    if (!pos.running) { pos.running = true; if (!pos.on) { pos.x = pos.tx; pos.y = pos.ty; } requestAnimationFrame(follow); }
  });
  index.querySelectorAll('[data-preview]').forEach((row) => {
    row.addEventListener('pointerenter', () => {
      if (!fine.matches) return;
      peekImg.src = row.dataset.preview;
      pos.on = true;
      peek.classList.add('is-on');
    });
    row.addEventListener('pointerleave', () => { pos.on = false; peek.classList.remove('is-on'); });
  });

  /* ---------- Medição da conexão ---------- */
  const meter = document.querySelector('[data-meter]');
  const wf = meter.querySelector('[data-wf]');
  const proto = meter.querySelector('[data-meter-proto]');
  const fmt = (n) => `${Math.round(n)} ms`;
  const nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
  const fillWaterfall = () => {
    if (!nav || !nav.responseEnd || location.protocol === 'file:') {
      proto.textContent = 'Abra pelo site publicado para medir.';
      return;
    }
    const t0 = nav.startTime;
    const tot = nav.responseEnd - t0;
    const tlsStart = nav.secureConnectionStart > 0 ? nav.secureConnectionStart : nav.connectEnd;
    const rows = [
      ['DNS', nav.domainLookupStart, nav.domainLookupEnd, 'var(--blue)'],
      ['Conexão TCP', nav.connectStart, tlsStart, 'var(--orange)'],
      ['TLS', tlsStart, nav.connectEnd, 'var(--green)'],
      ['Espera', nav.requestStart, nav.responseStart, 'var(--red)'],
      ['Download', nav.responseStart, nav.responseEnd, 'var(--ink)'],
    ];
    wf.innerHTML = rows.map(([label, a, b, c]) => {
      const dur = Math.max(0, b - a);
      const x = tot ? ((a - t0) / tot) * 100 : 0;
      const w = tot ? (dur / tot) * 100 : 0;
      return `<li><span>${label}</span><span class="wf__track"><span class="wf__bar" style="--x:${x.toFixed(2)}%;--w:${w.toFixed(2)}%;--c:${c}"></span></span><span class="wf__ms">${fmt(dur)}</span></li>`;
    }).join('') + `<li class="wf__total"><span>Total</span><span></span><span class="wf__ms">${fmt(tot)}</span></li>`;
    const names = { h2: 'HTTP/2', h3: 'HTTP/3', 'http/1.1': 'HTTP/1.1', 'http/1.0': 'HTTP/1.0' };
    const reused = nav.connectEnd - nav.connectStart < 0.5;
    proto.textContent = `${names[nav.nextHopProtocol] || nav.nextHopProtocol || 'HTTP'}${reused ? ' · conexão já estava aberta' : ''}`;
    requestAnimationFrame(() => wf.classList.add('is-on'));
  };
  new IntersectionObserver(([e], obs) => {
    if (!e.isIntersecting) return;
    obs.disconnect();
    if (nav && nav.responseEnd) fillWaterfall();
    else window.addEventListener('load', () => setTimeout(fillWaterfall, 0), { once: true });
  }, { rootMargin: '0px 0px -10% 0px' }).observe(meter);

  const pingBtn = meter.querySelector('[data-ping]');
  const pingOut = meter.querySelector('[data-ping-out]');
  const pingDots = meter.querySelector('[data-ping-dots]');
  pingBtn.addEventListener('click', async () => {
    if (location.protocol === 'file:') { pingOut.textContent = 'Abra pelo site publicado para medir.'; return; }
    pingBtn.disabled = true;
    pingOut.textContent = 'Mandando pacotes…';
    pingDots.innerHTML = '';
    const samples = [];
    for (let i = 0; i < 6; i++) {
      const t = performance.now();
      try {
        await fetch(`${location.pathname}?ping=${Date.now()}-${i}`, { method: 'HEAD', cache: 'no-store' });
        samples.push(performance.now() - t);
      } catch { /* pacote perdido */ }
      const max = Math.max(...samples, 1);
      pingDots.innerHTML = samples.map((s) => `<li style="--h:${Math.max(8, (s / max) * 100)}%"></li>`).join('');
    }
    pingBtn.disabled = false;
    if (!samples.length) { pingOut.textContent = 'Nenhum pacote voltou. Você está offline?'; return; }
    const min = Math.min(...samples);
    const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
    const jitter = samples.slice(1).reduce((a, s, i) => a + Math.abs(s - samples[i]), 0) / Math.max(1, samples.length - 1);
    const lost = 6 - samples.length;
    pingOut.textContent = `Mínimo ${fmt(min)} · médio ${fmt(avg)} · variação ${fmt(jitter)}${lost ? ` · ${lost} perdido(s)` : ''}`;
  });

  /* ---------- Bloco de grama minerável ---------- */
  const mine = document.querySelector('[data-mine]');
  const btn = mine.querySelector('[data-mine-btn]');
  const cube = mine.querySelector('[data-cube]');
  const burst = mine.querySelector('[data-mine-burst]');
  const countEl = mine.querySelector('[data-mine-count]');
  const faces = [...cube.querySelectorAll('.cube__face')];
  const cracks = [...cube.querySelectorAll('.cube__crack')];
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
  const grass = ['#5b8f2a', '#6aa337', '#4f7f22', '#79b443', '#64992f'];
  const dirt = ['#7a5534', '#8b6340', '#6b4a2c', '#5e3f25', '#966b45'];
  const paintTop = (c) => { for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) { c.fillStyle = pick(grass); c.fillRect(x, y, 1, 1); } };
  const paintSide = (c) => {
    for (let x = 0; x < 16; x++) {
      const edge = 3 + Math.floor(rnd() * 2.4);
      for (let y = 0; y < 16; y++) {
        c.fillStyle = y < edge ? pick(grass) : rnd() < 0.06 ? '#8e8e86' : pick(dirt);
        c.fillRect(x, y, 1, 1);
      }
    }
  };
  faces.forEach((cv, i) => { const c = cv.getContext('2d'); (i === 0 ? paintTop : paintSide)(c); });

  // Rachaduras: caminhos aleatórios a partir do centro, revelados em 10 estágios.
  const crackPlans = cracks.map(() => {
    const pts = [];
    for (let b = 0; b < 5; b++) {
      let x = 7 + Math.floor(rnd() * 3), y = 7 + Math.floor(rnd() * 3);
      const dx = rnd() < 0.5 ? -1 : 1, dy = rnd() < 0.5 ? -1 : 1;
      for (let k = 0; k < 9; k++) {
        pts.push([x, y, b + k * 5]);
        if (rnd() < 0.6) x += dx; else y += dy;
        if (rnd() < 0.25) { x += rnd() < 0.5 ? -dx : 0; }
        x = clamp(x, 0, 15); y = clamp(y, 0, 15);
      }
    }
    return pts.sort((a, b) => a[2] - b[2]);
  });
  const drawCracks = (stage) => {
    cracks.forEach((cv, i) => {
      const c = cv.getContext('2d');
      c.clearRect(0, 0, 16, 16);
      const plan = crackPlans[i];
      const n = Math.floor((stage / 10) * plan.length);
      for (let k = 0; k < n; k++) {
        c.fillStyle = k % 3 === 0 ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.72)';
        c.fillRect(plan[k][0], plan[k][1], 1, 1);
      }
    });
  };

  const BREAK = 950;
  let mining = false, mineStart = 0, crackStage = 0, broken = 0, cooling = false;
  const tick = (now) => {
    if (!mining) return;
    const next = Math.min(10, Math.floor(((now - mineStart) / BREAK) * 10));
    if (next !== crackStage) {
      crackStage = next;
      drawCracks(crackStage);
      cube.classList.remove('is-hit'); void cube.offsetWidth; cube.classList.add('is-hit');
    }
    if (crackStage >= 10) { breakBlock(); return; }
    requestAnimationFrame(tick);
  };
  const startMine = () => {
    if (mining || cooling) return;
    mining = true; mineStart = performance.now(); crackStage = 0;
    requestAnimationFrame(tick);
  };
  const stopMine = () => { mining = false; if (!cooling) { crackStage = 0; drawCracks(0); } };
  const breakBlock = () => {
    mining = false; cooling = true;
    broken += 1;
    countEl.textContent = `Blocos minerados: ${broken}`;
    cube.classList.add('is-gone');
    if (motion) {
      const colors = [...grass, ...dirt];
      for (let i = 0; i < 22; i++) {
        const el = document.createElement('i');
        el.style.setProperty('--c', colors[i % colors.length]);
        burst.appendChild(el);
        const a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 120;
        const dx = Math.cos(a) * d, dy = Math.sin(a) * d * 0.6 - 40;
        el.animate([
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
          { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.9)`, opacity: 1, offset: 0.55 },
          { transform: `translate(calc(-50% + ${dx * 1.15}px), calc(-50% + ${dy + 140}px)) scale(0.4)`, opacity: 0 },
        ], { duration: 900 + Math.random() * 300, easing: 'cubic-bezier(.2,.6,.4,1)' }).onfinish = () => el.remove();
      }
    }
    setTimeout(() => {
      drawCracks(0); crackStage = 0;
      cube.classList.remove('is-gone');
      cooling = false;
    }, 650);
  };
  btn.addEventListener('pointerdown', (e) => { e.preventDefault(); btn.setPointerCapture(e.pointerId); startMine(); });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => btn.addEventListener(ev, stopMine));
  btn.addEventListener('contextmenu', (e) => e.preventDefault());
  btn.addEventListener('keydown', (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); startMine(); }
  });
  btn.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') stopMine(); });
  btn.addEventListener('blur', stopMine);
})();
