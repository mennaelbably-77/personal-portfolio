// glopal variables

var sections = document.getElementsByTagName("section");
var navLinks = document.querySelectorAll(".nav-links a");
var navbar = document.querySelector("nav");
var themeToggleBtn = document.getElementById("theme-toggle-button");
var testimonialsCarousel = document.getElementById("testimonials-carousel");
var testimonialsCards = document.querySelectorAll(".testimonial-card");
var nextTestimonial = document.getElementById("next-testimonial");
var prevTestimonial = document.getElementById("prev-testimonial");
var dots = Array.from(document.querySelectorAll(".carousel-indicator"));
var scrollToTopBtn = document.getElementById("scroll-to-top");
var settingBtn = document.getElementById("settings-toggle");
var clossingBtn = document.getElementById("close-settings");
var sidebar = document.getElementById("settings-sidebar");
var fontOptionsBtns = document.querySelectorAll(".font-option");
var resetSettings = document.getElementById("reset-settings");

//scroll spy

window.onscroll = activeNavLinks;
function activeNavLinks() {
  var currentSection = "";
  for (var i = 0; i < sections.length; i++) {
    var sectionTop = sections[i].offsetTop;
    if (window.pageYOffset >= sectionTop - navbar.offsetHeight) {
      currentSection = sections[i].id;
    }
  }

  for (var j = 0; j < navLinks.length; j++) {
    navLinks[j].classList.remove("active");
    if (navLinks[j].getAttribute("href") == "#" + currentSection) {
      navLinks[j].classList.add("active");
    }
  }
}

// dark and light mode

themeToggleBtn.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");
});

// nav and tabs

var tabBtn = document.querySelectorAll(".portfolio-filter");
var tabContent = document.querySelectorAll(".portfolio-item");

for (var i = 0; i < tabBtn.length; i++) {
  tabBtn[i].addEventListener("click", function () {
    var selectedBtnCategory = this.getAttribute("data-filter");

    for (var j = 0; j < tabBtn.length; j++) {
      tabBtn[j].classList.remove(
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
        "active",
        "bg-linear",
      );

      tabBtn[j].classList.add(
        "text-slate-600",
        "border",
        "dark:bg-slate-800",
        "border-slate-300",
        "dark:border-slate-700",
      );
    }

    this.classList.add(
      "hover:shadow-primary/50",
      "hover:shadow-lg",
      "dark:text-white",
      "to-secondary",
      "from-primary",
      "bg-linear-to-r",
      "active",
    );

    this.classList.remove(
      "bg-white",
      "text-slate-600",
      "border",
      "border-slate-300",
    );

    for (var j = 0; j < tabContent.length; j++) {
      var selectedContentCategory = tabContent[j].getAttribute("data-category");

      if (
        selectedBtnCategory === "all" ||
        selectedContentCategory === selectedBtnCategory
      ) {
        tabContent[j].classList.remove("hidden");
      } else {
        tabContent[j].classList.add("hidden");
      }
    }
  });
}

// Testimonials Carousel
var currentIndex = 0;

function slide(step) {
  currentIndex += step;

  if (currentIndex >= testimonialsCards.length) {
    currentIndex = 0;
  }

  if (currentIndex < 0) {
    currentIndex = testimonialsCards.length - 1;
  }

  testimonialsCards[currentIndex].scrollIntoView({
    behavior: "smooth",
    inline: "start",
    block: "nearest",
  });

  updateDots();
}

nextTestimonial.addEventListener("click", function () {
  slide(1);
});

prevTestimonial.addEventListener("click", function () {
  slide(-1);
});

// indicators

function updateDots() {
  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.remove("bg-accent");
    dots[i].classList.add("bg-slate-400", "dark:bg-slate-600");
  }

  dots[currentIndex].classList.remove("bg-slate-400", "dark:bg-slate-600");
  dots[currentIndex].classList.add("bg-accent");
}

for (var i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", function () {
    currentIndex = dots.indexOf(this);

    testimonialsCards[currentIndex].scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });

    updateDots();
  });
}
updateDots();

// scroll btn

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.remove("opacity-0", "invisible");
    scrollToTopBtn.classList.add("opacity-100", "visible");
  } else {
    scrollToTopBtn.classList.add("opacity-0", "invisible");
    scrollToTopBtn.classList.remove("opacity-100", "visible");
  }
});

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// gear icon
settingBtn.addEventListener("click", function () {
  sidebar.classList.remove("translate-x-full");
  sidebar.classList.add("translate-x-0");
  settingBtn.style.right = "320px";
});

// close side bar
clossingBtn.addEventListener("click", function (e) {
  sidebar.classList.remove("translate-x-0");
  sidebar.classList.add("translate-x-full");
  settingBtn.style.right = "0";
});

document.addEventListener("click", function (e) {
  if (!sidebar.contains(e.target) && !settingBtn.contains(e.target)) {
    sidebar.classList.remove("translate-x-0");
    sidebar.classList.add("translate-x-full");

    settingBtn.style.right = "0";
  }
});

// font options
var selectedFont = "tajawal";

for (var i = 0; i < fontOptionsBtns.length; i++) {
  if (fontOptionsBtns[i].dataset.font === "tajawal") {
    fontOptionsBtns[i].classList.add("active");
  }
}

for (var i = 0; i < fontOptionsBtns.length; i++) {
  fontOptionsBtns[i].addEventListener("click", function () {
    for (var j = 0; j < fontOptionsBtns.length; j++) {
      fontOptionsBtns[j].classList.remove("active");
    }

    selectedFont = this.dataset.font;

    document.body.classList.remove(
      "font-alexandria",
      "font-tajawal",
      "font-cairo",
    );

    document.body.classList.add("font-" + selectedFont);

    this.classList.add("active");
  });
}

// colors theme
var themeColorsGrid = document.getElementById("theme-colors-grid");

var themes = [
  {
    title: "Purple Blue",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#a855f7",
  },
  {
    title: "Pink Orange",
    primary: "#ec4899",
    secondary: "#f97316",
    accent: "#f97316",
  },
  {
    title: "Green Emerald",
    primary: "#10b981",
    secondary: "#059669",
    accent: "#22c55e",
  },
  {
    title: "Blue Cyan",
    primary: "#3b82f6",
    secondary: "#06b6d4",
    accent: "#0ea5e9",
  },
  {
    title: "Red Rose",
    primary: "#ef4444",
    secondary: "#f43f5e",
    accent: "#fb7185",
  },
  {
    title: "Amber Orange",
    primary: "#f59e0b",
    secondary: "#ea580c",
    accent: "#fbbf24",
  },
];
// creating btn
for (var i = 0; i < themes.length; i++) {
  var theme = themes[i];

  var btn = document.createElement("button");

  btn.className =
    "w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 shadow-sm";

  btn.title = theme.title;

  btn.style.background = `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`;

  btn.dataset.primary = theme.primary;
  btn.dataset.secondary = theme.secondary;
  btn.dataset.accent = theme.accent;

  btn.addEventListener("click", function () {
    var all = themeColorsGrid.querySelectorAll("button");

    for (var j = 0; j < all.length; j++) {
      all[j].classList.remove("ring-2", "ring-offset-2");
      all[j].style.boxShadow = "";
    }

    this.classList.add("ring-2", "ring-offset-2");
    this.style.boxShadow = "0 0 0 4px " + this.dataset.primary;

    document.documentElement.style.setProperty(
      "--color-primary",
      this.dataset.primary,
    );

    document.documentElement.style.setProperty(
      "--color-secondary",
      this.dataset.secondary,
    );

    document.documentElement.style.setProperty(
      "--color-accent",
      this.dataset.accent,
    );
  });

  themeColorsGrid.appendChild(btn);
}

// reset settings
resetSettings.addEventListener("click", function () {
  document.documentElement.style.setProperty("--color-primary", "#6366f1");

  document.documentElement.style.setProperty("--color-secondary", "#8b5cf6");

  document.documentElement.style.setProperty("--color-accent", "#a855f7");

  sidebar.classList.add("translate-x-full");
  sidebar.classList.remove("translate-x-0");

  settingBtn.style.right = "0";

  var allBtns = themeColorsGrid.querySelectorAll("button");

  for (var i = 0; i < allBtns.length; i++) {
    allBtns[i].classList.remove("ring-2", "ring-offset-2");
    allBtns[i].style.boxShadow = "";

    if (allBtns[i].dataset.primary === "#6366f1") {
      allBtns[i].classList.add("ring-2", "ring-offset-2");
      allBtns[i].style.boxShadow = "0 0 0 4px #6366f1";
    }
  }

  // reset active fonts
  for (var i = 0; i < fontOptionsBtns.length; i++) {
    fontOptionsBtns[i].classList.remove("active");

    if (fontOptionsBtns[i].dataset.font === "tajawal") {
      fontOptionsBtns[i].classList.add("active");
    }
  }
});
