(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get: k => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
  };
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let toastT;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2200);
  }

  /* ---------- theme ---------- */
  const root = document.documentElement;
  function setTheme(t) { root.dataset.theme = t; $("#themeBtn").textContent = t === "dark" ? "☾" : "☀"; store.set("theme", t); }
  setTheme(store.get("theme") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
  $("#themeBtn").onclick = () => setTheme(root.dataset.theme === "dark" ? "light" : "dark");

  /* ---------- hero / static content ---------- */
  $("#nameH").textContent = SITE.name;
  $("#bio").textContent = SITE.bio;
  $("#bio2").textContent = SITE.bio;
  $("#year").textContent = new Date().getFullYear();
  $("#timeline").innerHTML = SITE.timeline.map(t => `<li><small>${esc(t.when)}</small><br>${esc(t.text)}</li>`).join("");
  $("#stats").innerHTML = SITE.stats.map(s => `<div class="stat"><b data-n="${s.n}" data-s="${esc(s.suffix)}">0</b><span>${esc(s.label)}</span></div>`).join("");

  // role typewriter
  (function typer() {
    const el = $("#role");
    let ri = 0, ci = 0, del = false;
    if (reduced) { el.textContent = SITE.roles[0]; return; }
    (function tick() {
      const word = SITE.roles[ri];
      ci += del ? -1 : 1;
      el.textContent = word.slice(0, ci);
      let delay = del ? 28 : 65;
      if (!del && ci === word.length) { del = true; delay = 1500; }
      else if (del && ci === 0) { del = false; ri = (ri + 1) % SITE.roles.length; delay = 400; }
      setTimeout(tick, delay);
    })();
  })();

  // count-up stats
  function countUp(el) {
    const n = +el.dataset.n, suf = el.dataset.s, t0 = performance.now();
    (function f(t) {
      const p = Math.min(1, (t - t0) / 1100);
      el.textContent = Math.round(n * p) + (p === 1 ? suf : "");
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  }

  /* ---------- skills ---------- */
  $("#skillBox").innerHTML = SKILLS.map(g => {
    let body = "";
    if (g.items) body += g.items.map(([n, v]) => `<div class="barlabel"><span>${esc(n)}</span><span class="mono">${v}%</span></div><div class="bar"><i data-w="${v}"></i></div>`).join("");
    if (g.chips) body += g.chips.map(c => `<span class="chip" data-skill="${esc(c)}">${esc(c)}</span>`).join("");
    return `<div class="card skill"><h3>${esc(g.group)}</h3>${body}</div>`;
  }).join("");
  $("#skillBox").addEventListener("click", e => {
    const c = e.target.closest(".chip"); if (!c) return;
    c.classList.toggle("on");
    const hit = PROJECTS.filter(p => (p.cat.concat(p.title)).join(" ").toLowerCase().includes(c.dataset.skill.toLowerCase().split(" ")[0]));
    toast(hit.length ? `${c.dataset.skill} → 相關作品：${hit.map(p => p.title).join("、")}` : `${c.dataset.skill}：作品待補 🚧`);
  });

  /* ---------- projects ---------- */
  const cats = ["All", ...new Set(PROJECTS.flatMap(p => p.cat))];
  let curCat = "All";
  function renderProjects() {
    $("#filters").innerHTML = cats.map(c => `<button class="chip${c === curCat ? " on" : ""}" data-c="${esc(c)}">${esc(c)}</button>`).join("");
    const list = PROJECTS.filter(p => curCat === "All" || p.cat.includes(curCat));
    $("#projBox").innerHTML = list.map(p => `
      <article class="card proj" data-id="${esc(p.id)}" tabindex="0">
        ${p.img ? `<img class="thumb" src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy">` : `<div class="ph">${esc(p.emoji || "📦")}</div>`}
        <div class="body"><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p>
        <div class="tags">${p.cat.map(c => `<span>#${esc(c)}</span>`).join("")}</div></div>
      </article>`).join("") +
      `<div class="card proj slot"><div><div class="plus">+</div>預留作品欄位<br><small class="mono">編輯 assets/js/data.js 新增</small></div></div>`;
  }
  renderProjects();
  $("#filters").onclick = e => { const b = e.target.closest("[data-c]"); if (b) { curCat = b.dataset.c; renderProjects(); } };
  function openProj(id) {
    const p = PROJECTS.find(x => x.id === id); if (!p) return;
    $("#modalBody").innerHTML = `
      <button class="iconbtn x" aria-label="close">✕</button>
      <h3>${esc(p.emoji || "")} ${esc(p.title)}</h3>
      <div class="tags">${p.cat.map(c => `<span>#${esc(c)}</span>`).join("")}</div>
      ${(p.detail || []).map(d => `<p style="margin-top:10px;color:var(--muted)">${esc(d)}</p>`).join("")}
      ${p.features ? `<ul>${p.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
      ${p.img ? `<img src="${esc(p.img)}" alt="">` : ""}
      <div class="btns">
        ${p.page ? `<a class="btn" href="${esc(p.page)}">完整頁面 →</a>` : ""}
        ${p.demo ? `<a class="btn ghost" href="${esc(p.demo)}" target="_blank" rel="noopener">Live Demo</a>` : ""}
        ${p.link ? `<a class="btn ghost" href="${esc(p.link)}" target="_blank" rel="noopener">Source</a>` : ""}
      </div>`;
    $("#modal").classList.add("open");
  }
  $("#projBox").addEventListener("click", e => { const a = e.target.closest("[data-id]"); if (a) openProj(a.dataset.id); });
  $("#projBox").addEventListener("keydown", e => { if (e.key === "Enter") { const a = e.target.closest("[data-id]"); if (a) openProj(a.dataset.id); } });
  $("#modal").addEventListener("click", e => { if (e.target.id === "modal" || e.target.closest(".x")) $("#modal").classList.remove("open"); });
  addEventListener("keydown", e => { if (e.key === "Escape") $("#modal").classList.remove("open"); });

  /* ---------- contact ---------- */
  $("#contactBox").innerHTML =
    `<a class="card" href="mailto:${esc(SITE.email)}" id="mailCard"><small>Email（點擊複製）</small><b>✉ ${esc(SITE.email)}</b></a>` +
    SITE.links.filter(l => l.href).map(l => `<a class="card" href="${esc(l.href)}" target="_blank" rel="noopener"><small>${esc(l.note)}</small><b>${l.icon} ${esc(l.label)}</b></a>`).join("");
  $("#mailCard").addEventListener("click", e => {
    if (navigator.clipboard) { e.preventDefault(); navigator.clipboard.writeText(SITE.email).then(() => toast("Email 已複製 ✔"), () => { location.href = "mailto:" + SITE.email; }); }
  });

  /* ---------- scroll reveal / nav highlight ---------- */
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add("in");
    en.target.querySelectorAll(".bar i").forEach(i => i.style.width = i.dataset.w + "%");
    io.unobserve(en.target);
  }), { threshold: 0.12 });
  document.querySelectorAll(".rv").forEach(el => io.observe(el));
  const sio = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { countUp(en.target.querySelector("b")); sio.unobserve(en.target); } }));
  document.querySelectorAll(".stat").forEach(el => sio.observe(el));
  const links = [...document.querySelectorAll("nav a.nl")];
  const nio = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("section[id]").forEach(s => nio.observe(s));

  /* ---------- particle FX ---------- */
  const fx = $("#fx"), fctx = fx.getContext("2d");
  let parts = [], fxRun = false;
  function fit() { fx.width = innerWidth; fx.height = innerHeight; }
  fit(); addEventListener("resize", fit);
  function burst(kind, x = innerWidth / 2, y = innerHeight / 3) {
    if (reduced) { toast("🎉"); return; }
    const emojis = ["🤖", "⚙️", "📦", "🔧", "🚚", "🧠", "🐍", "☕"];
    const n = kind === "rain" ? 60 : 90;
    for (let i = 0; i < n; i++) {
      parts.push(kind === "rain"
        ? { x: Math.random() * fx.width, y: -20 - Math.random() * 300, vx: 0, vy: 2 + Math.random() * 3, g: 0.02, t: emojis[i % emojis.length], s: 20 + Math.random() * 14, life: 400 }
        : { x, y, vx: (Math.random() - .5) * 12, vy: -Math.random() * 12 - 2, g: .35, c: `hsl(${Math.random() * 360},90%,60%)`, s: 5 + Math.random() * 5, life: 110 });
    }
    if (!fxRun) { fxRun = true; requestAnimationFrame(fxLoop); }
  }
  function fxLoop() {
    fctx.clearRect(0, 0, fx.width, fx.height);
    parts = parts.filter(p => --p.life > 0 && p.y < fx.height + 40);
    for (const p of parts) {
      p.vy += p.g; p.x += p.vx; p.y += p.vy;
      if (p.t) { fctx.font = p.s + "px serif"; fctx.fillText(p.t, p.x, p.y); }
      else { fctx.fillStyle = p.c; fctx.fillRect(p.x, p.y, p.s, p.s * .6); }
    }
    if (parts.length) requestAnimationFrame(fxLoop); else fxRun = false;
  }
  const quotes = ["Hello! 👋", "Bug? 那是 feature。", "SELECT * FROM coffee;", "import antigravity", "A* 最棒了", "再點一次試試 😏", "404: sleep not found"];
  let qi = 0;
  $("#avatar").onclick = e => { $("#avatarTip").textContent = quotes[qi++ % quotes.length]; burst("confetti", e.clientX, e.clientY); };
  $("#randBtn").onclick = () => {
    const act = [() => burst("confetti"), () => burst("rain"), () => { setTheme(root.dataset.theme === "dark" ? "light" : "dark"); toast("主題翻轉！"); }, () => toast("🤖 beep boop — 今天也要準時出貨")];
    act[Math.floor(Math.random() * act.length)]();
  };
  // Konami
  const kon = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let ki = 0;
  addEventListener("keydown", e => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;
    ki = e.key === kon[ki] ? ki + 1 : (e.key === kon[0] ? 1 : 0);
    if (ki === kon.length) { ki = 0; burst("rain"); toast("🎮 +30 lives! 機器人大軍出動"); }
  });

  /* ---------- terminal ---------- */
  const out = $("#termOut"), inp = $("#termIn");
  const hist = []; let hi = 0;
  function say(t, cls) { const d = document.createElement("div"); if (cls) d.className = cls; d.textContent = t; out.appendChild(d); out.scrollTop = out.scrollHeight; }
  const cmds = {
    help: () => "可用指令: whoami, skills, projects, contact, theme, fortune, sudo, matrix, clear, open <project-id>",
    whoami: () => `${SITE.name} — ${SITE.roles[0]}`,
    skills: () => SKILLS.map(g => `[${g.group}] ` + (g.items ? g.items.map(i => i[0]).join(", ") : g.chips.join(", "))).join("\n"),
    projects: () => PROJECTS.map(p => `${p.id.padEnd(6)} ${p.title}`).join("\n"),
    contact: () => `email: ${SITE.email}`,
    theme: () => { setTheme(root.dataset.theme === "dark" ? "light" : "dark"); return "theme toggled."; },
    fortune: () => ["今日運勢：你的 SQL 不會 deadlock。", "今日運勢：AMR 都不會塞車。", "今日運勢：Production 一次部署成功。", "今日運勢：下一個 bug 其實是 typo。"][Math.floor(Math.random() * 4)],
    sudo: () => "kiv is not in the sudoers file. This incident will be reported. 🚨",
    matrix: () => { burst("rain"); return "wake up, Neo..."; },
    ls: () => "about/  lab/  skills/  projects/  contact/",
    clear: () => { out.innerHTML = ""; return null; },
    open: a => { const p = PROJECTS.find(x => x.id === a[0]); if (!p) return "用法: open <project-id>（先輸入 projects）"; openProj(p.id); return `opening ${p.title}...`; },
  };
  say("Welcome! 輸入 help 開始。", "c");
  inp.addEventListener("keydown", e => {
    if (e.key === "ArrowUp") { hi = Math.max(0, hi - 1); inp.value = hist[hi] || ""; e.preventDefault(); return; }
    if (e.key === "ArrowDown") { hi = Math.min(hist.length, hi + 1); inp.value = hist[hi] || ""; return; }
    if (e.key !== "Enter") return;
    const line = inp.value.trim(); inp.value = ""; if (!line) return;
    hist.push(line); hi = hist.length;
    say("$ " + line, "c");
    const [c, ...a] = line.split(/\s+/);
    const f = cmds[c.toLowerCase()];
    const r = f ? f(a) : `command not found: ${c}（試試 help）`;
    if (r) say(r);
  });

  /* ---------- path-finding lab ---------- */
  const cv = $("#grid"), ctx = cv.getContext("2d");
  const CS = 20, W = cv.width / CS, H = cv.height / CS;
  let wall, start = [3, 11], goal = [32, 11], visited, order, path, robot, runId = 0, drag = null, paint = null;
  const idx = (x, y) => y * W + x;
  function reset(keepWalls) {
    runId++; if (!keepWalls) wall = new Uint8Array(W * H);
    visited = new Int32Array(W * H).fill(-1); order = []; path = []; robot = null;
    draw();
  }
  function css(v) { return getComputedStyle(root).getPropertyValue(v).trim(); }
  function draw(shown = order.length, pathShown = path.length) {
    ctx.fillStyle = css("--bg2"); ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.strokeStyle = css("--line"); ctx.lineWidth = 1; ctx.globalAlpha = .45;
    ctx.beginPath();
    for (let x = 0; x <= W; x++) { ctx.moveTo(x * CS + .5, 0); ctx.lineTo(x * CS + .5, cv.height); }
    for (let y = 0; y <= H; y++) { ctx.moveTo(0, y * CS + .5); ctx.lineTo(cv.width, y * CS + .5); }
    ctx.stroke(); ctx.globalAlpha = 1;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (wall[idx(x, y)]) { ctx.fillStyle = css("--muted"); ctx.fillRect(x * CS + 1, y * CS + 1, CS - 1, CS - 1); }
    ctx.fillStyle = "rgba(76,201,240,.45)";
    for (let i = 0; i < shown; i++) { const [x, y] = order[i]; ctx.fillRect(x * CS + 2, y * CS + 2, CS - 3, CS - 3); }
    ctx.fillStyle = "#ffb454";
    for (let i = 0; i < pathShown; i++) { const [x, y] = path[i]; ctx.fillRect(x * CS + 5, y * CS + 5, CS - 9, CS - 9); }
    ctx.fillStyle = "#3ddc97"; ctx.fillRect(start[0] * CS + 1, start[1] * CS + 1, CS - 1, CS - 1);
    ctx.fillStyle = "#ff5c6c"; ctx.fillRect(goal[0] * CS + 1, goal[1] * CS + 1, CS - 1, CS - 1);
    if (robot) { ctx.font = "18px serif"; ctx.textBaseline = "middle"; ctx.textAlign = "center"; ctx.fillText("🤖", robot[0] * CS + CS / 2, robot[1] * CS + CS / 2 + 1); }
  }
  function solve(kind) {
    const dist = new Float32Array(W * H).fill(Infinity), prev = new Int32Array(W * H).fill(-1), seen = [], closed = new Uint8Array(W * H);
    const h = (x, y) => kind === "astar" ? Math.abs(x - goal[0]) + Math.abs(y - goal[1]) : 0;
    const open = [[h(...start), start[0], start[1]]]; dist[idx(...start)] = 0; let seq = 0;
    while (open.length) {
      let bi = 0; for (let i = 1; i < open.length; i++) if (open[i][0] < open[bi][0]) bi = i;
      const [, x, y] = open.splice(bi, 1)[0], k = idx(x, y);
      if (closed[k]) continue; closed[k] = 1; seen.push([x, y]);
      if (x === goal[0] && y === goal[1]) break;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const nk = idx(nx, ny); if (wall[nk] || closed[nk]) continue;
        const nd = dist[k] + 1;
        if (nd < dist[nk]) { dist[nk] = nd; prev[nk] = k; open.push([kind === "bfs" ? ++seq : nd + h(nx, ny), nx, ny]); }
      }
    }
    const p = []; let c = idx(...goal);
    if (prev[c] !== -1 || (start[0] === goal[0] && start[1] === goal[1])) while (c !== -1) { p.push([c % W, (c / W) | 0]); c = prev[c]; }
    return { seen, path: p.reverse() };
  }
  async function run() {
    reset(true); const my = runId;
    const t0 = performance.now(), r = solve($("#algo").value), ms = (performance.now() - t0).toFixed(1);
    order = r.seen; path = r.path;
    const sp = +$("#speed").value, perFrame = reduced ? 9999 : Math.ceil(sp * sp / 4);
    const frame = () => new Promise(res => requestAnimationFrame(res));
    for (let i = 0; i <= order.length; i += perFrame) { if (my !== runId) return; draw(i, 0); await frame(); }
    if (!path.length) { draw(); $("#labInfo").textContent = "✖ 無路可走！牆壁太多了"; toast("😵 找不到路徑"); return; }
    for (let i = 0; i < path.length; i++) {
      if (my !== runId) return; robot = path[i]; draw(order.length, i + 1);
      for (let f = 0; f < Math.max(1, 7 - sp / 1.7) && !reduced; f++) await frame();
    }
    $("#labInfo").textContent = `✔ 探索 ${order.length} 格 · 路徑 ${path.length - 1} 步 · ${ms}ms`;
    burst("confetti", cv.getBoundingClientRect().left + goal[0] * CS * cv.clientWidth / cv.width, cv.getBoundingClientRect().top + goal[1] * CS * cv.clientHeight / cv.height);
  }
  function cell(e) {
    const r = cv.getBoundingClientRect();
    return [Math.min(W - 1, Math.max(0, Math.floor((e.clientX - r.left) / r.width * W))), Math.min(H - 1, Math.max(0, Math.floor((e.clientY - r.top) / r.height * H)))];
  }
  cv.addEventListener("pointerdown", e => {
    cv.setPointerCapture(e.pointerId);
    const [x, y] = cell(e);
    if (x === start[0] && y === start[1]) drag = "s";
    else if (x === goal[0] && y === goal[1]) drag = "g";
    else { paint = wall[idx(x, y)] ? 0 : 1; wall[idx(x, y)] = paint; }
    reset(true);
  });
  cv.addEventListener("pointermove", e => {
    if (!drag && paint === null) return;
    const [x, y] = cell(e);
    if (drag === "s" && !wall[idx(x, y)] && !(x === goal[0] && y === goal[1])) start = [x, y];
    else if (drag === "g" && !wall[idx(x, y)] && !(x === start[0] && y === start[1])) goal = [x, y];
    else if (paint !== null && !(x === start[0] && y === start[1]) && !(x === goal[0] && y === goal[1])) wall[idx(x, y)] = paint;
    reset(true);
  });
  const endDrag = () => { drag = null; paint = null; };
  cv.addEventListener("pointerup", endDrag); cv.addEventListener("pointercancel", endDrag);
  $("#runBtn").onclick = run;
  $("#clearBtn").onclick = () => { reset(false); $("#labInfo").textContent = "cleared."; };
  $("#mazeBtn").onclick = () => {
    reset(false);
    for (let i = 0; i < W * H * 0.28; i++) wall[(Math.random() * W * H) | 0] = 1;
    wall[idx(...start)] = 0; wall[idx(...goal)] = 0; reset(true); $("#labInfo").textContent = "random obstacles.";
  };
  new MutationObserver(() => draw()).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  reset(false);
})();
