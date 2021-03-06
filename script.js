const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll(".nav__link").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("nav__link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

const h1 = document.querySelector("h1");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// tabs.forEach((t) => t.addEventListener("click", () => console.log("hello")));
// this creates copies , what if there are 300 tabs , you definately don't want to make a copy for this

//thats why we use event delegation , Bhery Bhery IMP

tabsContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;

  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  //activating the content area

  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

nav = document.querySelector(".nav");

//new start

//intersection Observer API

const header = document.querySelector(".header");

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting === false) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//reveal sections with the beautiful effect,

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);

  section.classList.add("section--hidden");
});

// lazy loading , images

// selecting the images

const imgTargets = document.querySelectorAll("img[data-src]");
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry.target);

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.classList.remove("lazy-img");

  entry.target.addEventListener("load", function () {});
};

//img observer

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// const imgTargets = document.querySelectorAll("img[data-src]");

// const loadImg = function (entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;

//   // Replace src with data-src
//   entry.target.src = entry.target.dataset.src;

//   entry.target.addEventListener("load", function () {
//     entry.target.classList.remove("lazy-img");
//   });

//   observer.unobserve(entry.target);
// };

// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
//   rootMargin: "200px",
// });

// imgTargets.forEach((img) => imgObserver.observe(img));

//slider

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let currentSlide = 0;
let maxSlide = slides.length - 1;

slides.forEach((s, i) => (s.style.transform = `translateX( ${100 * i}%)`));

btnRight.addEventListener("click", function () {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  slides.forEach(
    (s, i) => (s.style.transform = `translateX( ${100 * (i - currentSlide)}%)`)
  );
});

btnLeft.addEventListener("click", function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else {
    currentSlide--;
  }

  slides.forEach(
    (s, i) => (s.style.transform = `translateX( ${100 * (i - currentSlide)}%)`)
  );
});
