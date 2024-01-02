import "./styles/reset.css";
import "./styles/style.css";
import "./img/avatar.jpg";
import "./img/git.jpg";
import "./img/java.jpg";
import "./img/profile.png";
import "./img/Project1/mogo__promo.png";
import "./img/Project2/active__promo.png";
import "./img/Project3/travel__promo.png";
import "./img/Project4/shop.png";
import "./img/Project5/Auth.png";

// Бургер меню

const menu = document.querySelector("#menu");
const popup = document.querySelector("#popup");
const header = document.querySelector("#header");

menu.addEventListener("click", menuHandler);

function menuHandler(e) {
  e.preventDefault();
  menu.classList.toggle("open-menu");
  header.classList.toggle("open");
}

// Якорь smooth scroll

const anchors = document.querySelectorAll('a[href*="#"]');

anchors.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const blockID = item.getAttribute("href");
    document.querySelector(blockID).scrollIntoView({
      behavior: "smooth",
    });
  });
});

//Скролл страницы

var lastScrollTop = 0;

function onScroll() {
  window.addEventListener("scroll", callbackFunc);
  function callbackFunc() {
    var st = window.scrollY || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      header.classList.remove("active");
    } else if (st < lastScrollTop) {
      header.classList.add("active");
    }
    lastScrollTop = st <= 0 ? 0 : st;
  }
}

window.onload = function () {
  onScroll();
};

// Отправка формы

function serializeForm(formNode) {
  return new FormData(formNode);
}

async function sendData(data) {
  return await fetch("/api/applay/", {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    body: data,
  });
}

function toggleLoader() {
  const loader = document.getElementById("loader");
  loader.classList.toggle("hidden");
}

function onSuccess(formNode) {
  alert("Ваше обращение успешно отправлена!");
  formNode.classList.toggle("hidden");
}

function onError(error) {
  alert('Упс, что-то пошло не так :(');
}

function checkValidity(event) {
  const formNode = event.target.form,
 
  isValid = formNode.checkValidity();

  console.log(formNode);

  formNode.querySelector('button_form').disabled = !isValid
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const data = serializeForm(event.target);

  toggleLoader();
  const { status, error } = await sendData(data);
  toggleLoader();

  if (status === 200) {
    onSuccess(event.target);
  } else {
    onError(error);
  }
}



const applicantForm = document.getElementById("contact-form");

// applicantForm.addEventListener('input', checkValidity);
applicantForm.addEventListener("submit", handleFormSubmit);

