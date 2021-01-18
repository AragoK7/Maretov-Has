"use_strict";
document.querySelectorAll("h2").forEach((sectionTitle) => {
  const text = String(sectionTitle.textContent).toLowerCase();
  sectionTitle.classList.add(`section--title`);
  sectionTitle.closest("section").classList.add(`section--${text}`);
});
const sectionWidth = document.querySelector("section").offsetWidth;
const btnCreateHas = document.querySelector(".create__has");
const modal = document.querySelector("#myModal");
const closeModal = document.querySelector(".btn--close-modal");
const btnConfirm = document.querySelector(".btn-confirm");

btnCreateHas.addEventListener("click", function () {
  modal.style.display = "block";
});
closeModal.addEventListener("click", function (e) {
  if (!e.target.closest(".btn--close-modal")) return;
  modal.style.display = "none";
});
let madeobjects = 0;
btnConfirm.addEventListener("click", function () {
  const ime = document.querySelector(".modal-ime").value;
  const cena = document.querySelector(".modal-cena").value;
  const tip = document.querySelector(".modal-tip").value;
  const section = document.querySelector(`.section--${tip.toLowerCase()} h2`);
  const article = document.createElement("article");

  article.innerHTML = `<span class="t${madeobjects}1">${ime}</span>
   <span class="t${madeobjects}2"></span>
   <span class="t${madeobjects}3">${cena}</span>`;
  section.after(article);

  const imeW = document.querySelector(`.t${madeobjects}1`).offsetWidth;
  const cenaW = document.querySelector(`.t${madeobjects}3`).offsetWidth;
  const fillerW = sectionWidth - (imeW + cenaW) - 1;
  document.querySelector(`.t${madeobjects}2`).style.maxWidth = fillerW + "px";
  console.log(imeW, fillerW, cenaW, sectionWidth);

  let filler = document.querySelector(`.t${madeobjects}2`);

  do {
    filler.textContent += ".";
  } while (fillerW > filler.offsetWidth);
  madeobjects++;
  document.querySelector(".modal-ime").value = "";
  document.querySelector(".modal-cena").value = "";
  document.querySelector(".modal-tip").value = "";
});
