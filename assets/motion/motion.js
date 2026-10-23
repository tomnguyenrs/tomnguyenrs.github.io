// Site motion: Lenis smooth scrolling, scroll-reveal, frosted navbar state.
(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  // Inertial smooth scrolling on desktop only; touch devices keep native scrolling.
  if (!reduceMotion && finePointer && typeof window.Lenis === "function") {
    var lenis = new window.Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); } });
    var raf = function (time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  // Navbar gains a hairline border once the page is scrolled.
  var navbar = document.getElementById("navbar");
  if (navbar) {
    var onScroll = function () {
      navbar.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (reduceMotion || !("IntersectionObserver" in window)) return;

  var selectors = [
    ".post-header",
    ".profile",
    "article .clearfix > *",
    ".post > article > h2",
    ".post article > h2",
    ".publications h2",
    ".publications ol.bibliography > li",
    ".post article > ul > li",
    ".course-item",
    ".social",
  ];
  var targets = document.querySelectorAll(selectors.join(","));
  if (!targets.length) return;

  // Stagger siblings that enter together.
  var siblingIndex = new Map();
  targets.forEach(function (el) {
    var parent = el.parentElement;
    var i = siblingIndex.get(parent) || 0;
    siblingIndex.set(parent, i + 1);
    el.style.setProperty("--reveal-delay", Math.min(i, 6) * 70 + "ms");
    el.classList.add("reveal");
  });
  document.documentElement.classList.add("motion-ready");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  targets.forEach(function (el) {
    observer.observe(el);
  });
})();
