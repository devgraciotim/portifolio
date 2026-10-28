const I18N = window.I18N;
const FLAGS = window.FLAGS;
const LANGS = ["pt", "en", "es"];
const HTML_LANG = { pt: "pt-BR", en: "en", es: "es" };
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};

// ================= Idioma =================
// Ordem: ?lang= na URL → escolha salva → idioma do navegador → inglês.
function detectLang() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (LANGS.includes(fromUrl)) return fromUrl;
  const saved = store.get("lang");
  if (LANGS.includes(saved)) return saved;
  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language || ""];
  for (const p of prefs) {
    const base = p.toLowerCase().split("-")[0];
    if (LANGS.includes(base)) return base;
  }
  return "en";
}

let lang = detectLang();
const t = (key) => I18N[lang][key] ?? I18N.pt[key] ?? key;

function applyLang(next, { save = false } = {}) {
  lang = next;
  if (save) store.set("lang", next);
  document.documentElement.lang = HTML_LANG[next];
  document.title = t("meta.title");
  document.querySelector('meta[name="description"]').setAttribute("content", t("meta.desc"));

  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.dataset.i18nAttr.split(";").forEach((pair) => {
      const [attr, key] = pair.split(":");
      el.setAttribute(attr, t(key));
    });
  });

  document.getElementById("langFlag").innerHTML = FLAGS[next];
  document.getElementById("langCode").textContent = next.toUpperCase();
  document.querySelectorAll("#langMenu [data-lang]").forEach((li) => {
    li.setAttribute("aria-selected", li.dataset.lang === next);
  });

  buildQuery();
  if (typingDone) renderQuery(queryLength());
}

// Menu de idiomas
const langBtn = document.getElementById("langBtn");
const langMenu = document.getElementById("langMenu");
const langItems = [...langMenu.querySelectorAll("[data-lang]")];
langItems.forEach((li) => { li.querySelector(".flag").innerHTML = FLAGS[li.dataset.lang]; });

function openLangMenu() {
  langMenu.hidden = false;
  langBtn.setAttribute("aria-expanded", "true");
  (langItems.find((li) => li.dataset.lang === lang) || langItems[0]).focus();
}
function closeLangMenu(focusBtn = false) {
  langMenu.hidden = true;
  langBtn.setAttribute("aria-expanded", "false");
  if (focusBtn) langBtn.focus();
}
langBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  langMenu.hidden ? openLangMenu() : closeLangMenu();
});
langItems.forEach((li) => {
  li.addEventListener("click", () => { applyLang(li.dataset.lang, { save: true }); closeLangMenu(true); });
});
langMenu.addEventListener("keydown", (e) => {
  const i = langItems.indexOf(document.activeElement);
  if (e.key === "ArrowDown") { e.preventDefault(); langItems[(i + 1) % langItems.length].focus(); }
  else if (e.key === "ArrowUp") { e.preventDefault(); langItems[(i - 1 + langItems.length) % langItems.length].focus(); }
  else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); document.activeElement.click(); }
  else if (e.key === "Escape" || e.key === "Tab") { closeLangMenu(e.key === "Escape"); }
});
document.addEventListener("click", (e) => {
  if (!langMenu.hidden && !e.target.closest("#lang")) closeLangMenu();
});

// ================= Terminal digitando =================
const typedEl = document.getElementById("typed");
const resultEl = document.getElementById("termResult");
let query = [];
let typingDone = false;

function buildQuery() {
  query = [
    ["c", t("term.comment") + "\n"],
    ["k", "SELECT"], ["", " " + t("term.select") + "\n"],
    ["k", "FROM"], ["", " joao_graciotim\n"],
    ["k", "WHERE"], ["", " area = "], ["s", t("term.area")], ["", "\n"],
    ["k", "ORDER BY"], ["", " " + t("term.order") + " "], ["k", "DESC"], ["", ";"],
  ];
}
const queryLength = () => query.reduce((n, [, s]) => n + s.length, 0);
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

function renderQuery(chars) {
  let left = chars;
  let html = "";
  for (const [cls, text] of query) {
    if (left <= 0) break;
    const part = esc(text.slice(0, left));
    html += cls ? `<span class="${cls}">${part}</span>` : part;
    left -= text.length;
  }
  typedEl.innerHTML = html;
}

function startTyping() {
  if (reduceMotion) {
    typingDone = true;
    renderQuery(queryLength());
    resultEl.hidden = false;
    return;
  }
  let i = 0;
  const tick = () => {
    if (typingDone) return;
    renderQuery(++i);
    if (i < queryLength()) setTimeout(tick, 24 + Math.random() * 36);
    else { typingDone = true; setTimeout(() => (resultEl.hidden = false), 300); }
  };
  setTimeout(tick, 600);
}

// ================= Nav =================
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
function setMenu(open) {
  navLinks.classList.toggle("is-open", open);
  nav.classList.toggle("menu-open", open);
  menuBtn.setAttribute("aria-expanded", open);
}
menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("is-open")));
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// Link ativo conforme a seção visível
const spy = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    navLinks.querySelectorAll("a").forEach((a) =>
      a.classList.toggle("is-current", a.getAttribute("href") === `#${e.target.id}`)
    );
  }),
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));

// ================= Revelar ao rolar =================
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }),
  { threshold: 0.1 }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 60}ms`;
  io.observe(el);
});

// ================= Filtro de projetos =================
const filterBtns = document.querySelectorAll(".tag-btn");
const projects = document.querySelectorAll(".project");
filterBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
    const f = btn.dataset.filter;
    projects.forEach((p) => {
      const show = f === "all" || p.dataset.tags.split(" ").includes(f);
      p.classList.toggle("is-hidden", !show);
      if (show) p.classList.add("is-in");
    });
  })
);

// ================= Contato =================
const toast = document.getElementById("toast");
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-on"), 2200);
}

const copyBtn = document.getElementById("copyEmail");
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(copyBtn.dataset.email);
    showToast(t("contact.copied"));
  } catch {
    showToast(copyBtn.dataset.email);
  }
});

// O formulário abre o app de e-mail do visitante com a mensagem preenchida.
const form = document.getElementById("contactForm");
const formError = document.getElementById("formError");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fields = [...form.querySelectorAll(".input")];
  let ok = true;
  fields.forEach((f) => {
    const valid = f.value.trim() !== "" && f.checkValidity();
    f.classList.toggle("is-invalid", !valid);
    if (!valid) ok = false;
  });
  formError.hidden = ok;
  if (!ok) { fields.find((f) => f.classList.contains("is-invalid"))?.focus(); return; }

  const { name, email, message } = Object.fromEntries(new FormData(form));
  const to = copyBtn.dataset.email;
  const body = `${message}\n\n— ${name} (${email})`;
  showToast(t("form.opening"));
  location.href = `mailto:${to}?subject=${encodeURIComponent(t("form.subject"))}&body=${encodeURIComponent(body)}`;
});

// ================= Início =================
document.getElementById("year").textContent = new Date().getFullYear();
applyLang(lang);
startTyping();
