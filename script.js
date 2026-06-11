const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 20);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  header.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("open");
    header.classList.remove("menu-open");
    toggle?.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll("details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll("details[open]").forEach((other) => {
      if (other !== item) other.removeAttribute("open");
    });
  });
});

const observer = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll(".reveal").forEach((element) => {
  if (observer) observer.observe(element);
  else element.classList.add("visible");
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();
