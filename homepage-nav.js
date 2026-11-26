(() => {
  const nav = document.querySelector(".homepage .nav-wrapper");
  if (!nav) {
    return;
  }

  const updateNav = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  new ResizeObserver(() => {
    document.documentElement.style.setProperty(
      "--nav-height",
      `${nav.getBoundingClientRect().height}px`
    );
  }).observe(nav);

  window.addEventListener("scroll", updateNav, { passive: true });
  window.addEventListener("pageshow", updateNav);
  updateNav();
})();
