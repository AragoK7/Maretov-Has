"use_strict";
document.querySelectorAll("h2").forEach((sectionTitle) => {
  const text = String(sectionTitle.textContent)
    .toLowerCase()
    .trim()
    .replace(" ", "-");
  sectionTitle.classList.add(`section--title`);
  sectionTitle.closest("section").classList.add(`section--${text}`);
});
// let a, b, c, d, e, f;
let rgbArray;
let bw;
let bw6;
const aud = [new Audio("dik.mp3"), new Audio("san.mp3"), new Audio("bolz.mp3")];
const textNapitki = "napitki";
const textGlavnoJelo = "glavno-jelo";
const textBrekfest = "brekfest";
const textDezert = "dezert";
const defaultItems = [
  {
    tipObroka: textGlavnoJelo,
    imeObroka: "Pljeskavica(200g)",
    cenaObroka: "220",
  },
  {
    tipObroka: textGlavnoJelo,
    imeObroka: "Pljeskavica(150g)",
    cenaObroka: "180",
  },
  {
    tipObroka: textBrekfest,
    imeObroka: "Big boy jaja sa slaninom",
    opisObrokа: "(4 jaja, slanina, sir, ajvar)",
    cenaObroka: "360",
  },
  {
    tipObroka: textNapitki,
    imeObroka: "Coca-cola(0,5l)",
    cenaObroka: "80",
  },
  {
    tipObroka: textGlavnoJelo,
    imeObroka: "Gulaš",
    cenaObroka: "420",
  },
  {
    tipObroka: textGlavnoJelo,
    imeObroka: "Paprikaš",
    cenaObroka: "380",
  },
  {
    tipObroka: textGlavnoJelo,
    imeObroka: "Pasulj",
    cenaObroka: "260",
  },
  {
    tipObroka: textBrekfest,
    imeObroka: "Omlet sa šunkom()",
    opisObrokа: "(3 jaja, šunka, ajvar, sir)",
    cenaObroka: "300",
  },
  {
    tipObroka: textBrekfest,
    imeObroka: "Sendvič",
    opisObrokа: " sa pršutom, sirom i rukolom",
    cenaObroka: "220",
  },
  {
    tipObroka: textBrekfest,
    imeObroka: "Musli",
    opisObrokа: "(ovsene pahulje, urme, suvo grožđe, (sojino mleko))",
    cenaObroka: "200",
  },
  {
    tipObroka: textDezert,
    imeObroka: "Tiramisu",
    cenaObroka: "340",
  },
  {
    tipObroka: textDezert,
    imeObroka: "Palačinke sa eurokremom i plazmom",
    cenaObroka: "220",
  },
  {
    tipObroka: textDezert,
    imeObroka: "Palačinke sa džemom",
    cenaObroka: "220",
  },
  {
    tipObroka: textDezert,
    imeObroka: "Palačinke sa medom i orasima",
    cenaObroka: "240",
  },
  {
    tipObroka: textGlavnoJelo,
    imeObroka: "Biftek sa grila",
    opisObrokа: "(aromatični krompir, grilovano povrće)",
    cenaObroka: "1600",
  },
  {
    tipObroka: textGlavnoJelo,
    imeObroka: "Biftek Mare - Big boy Biftek",
    opisObrokа:
      "(noazeti, suve šljive u crvenom vinu, aromatični krompir, grilovano voće)",
    cenaObroka: "2200",
  },
  {
    tipObroka: textDezert,
    imeObroka: "Sladoled - big boy kugla",
    opisObrokа: "Vanila, Čokolada, Jagoda, Stravatela, Šumsko voće",
    cenaObroka: "100",
  },
  {
    tipObroka: textNapitki,
    imeObroka: "Italijanski rizling 0,15l",
    opisObrokа: "Vinarija Šijački Banoštar-Srbija",
    cenaObroka: "340",
  },
  {
    tipObroka: textNapitki,
    imeObroka: "Chardonnay 0,15l",
    opisObrokа: "Vinarija Kovačević Irig-Srbija",
    cenaObroka: "520",
  },
  {
    tipObroka: textNapitki,
    imeObroka: "Chardonnay Edicija S Kovačević 0,75l",
    opisObrokа: "stono suvo belo vino",
    cenaObroka: "3080",
  },
  {
    tipObroka: textNapitki,
    imeObroka: "Chardonnay Edicija Big Boy Mare 0,75",
    opisObrokа: "The Backpain",
    cenaObroka: "3420",
  },
];
const tipovi = [textNapitki, textGlavnoJelo, textBrekfest, textDezert];
const sectionWidth = document.querySelector("section").offsetWidth;
const btnCreateHas = document.querySelector(".create__has");
const modal = document.querySelector("#myModal");
const closeModal = document.querySelector(".btn--close-modal");
const btnConfirm = document.querySelector(".btn-confirm");
const btnConfirmNonsense = document.querySelector(".btn-confirm-nonsense");
const body = document.querySelector("body");
let madeobjects = 0;

// Event handlera

btnCreateHas.addEventListener("click", function () {
  modal.style.display = "block";
});

closeModal.addEventListener("click", function (e) {
  if (!e.target.closest(".btn--close-modal")) return;
  modal.style.display = "none";
});

btnConfirm.addEventListener("click", function () {
  const ime = document.querySelector(".modal-ime").value;
  const cena = document.querySelector(".modal-cena").value;
  const tip = document
    .querySelector(".modal-tip")
    .value.toLowerCase()
    .trim()
    .replace(" ", "-");
  if (
    !tipovi.includes(tip) ||
    cena > 5000 ||
    cena <= 0 ||
    String(ime).length < 1 ||
    String(ime).length > 30
  ) {
    alert("Loši podaci uneti, proveriti kontent");
  } else {
    displayCreatedHas(tip, ime, cena);
    clearModalValuesExit();
    modal.style.display = "none";
  }
});
btnConfirmNonsense.addEventListener("click", function () {
  displayCreatedHas("napitki", "AragoK", Math.floor(Math.random() * 5000));
  clearModalValuesExit();
  modal.style.display = "none";
  playAudio();
});

// Functions

const displayCreatedHas = function (tip, ime, cena) {
  const section = document.querySelector(`.section--${tip}`);
  const article = document.createElement("article");

  article.classList.add("flex-container");
  article.innerHTML = `<span class="blin t${madeobjects}1">${ime}</span>
   <span class="t${madeobjects}2">...............................................................................................................................................................................................................................................</span>
   <span class="blin t${madeobjects}3">${cena + ",00 RSD"}</span>`;
  section.after(article);

  madeobjects++;
};

const clearModalValuesExit = function () {
  document.querySelector(".modal-ime").value = "";
  document.querySelector(".modal-cena").value = "";
  document.querySelector(".modal-tip").value = "";
};
//Postavlja meni, funkcija se izvrsava samo jednom pri pokretanju skripte
(function () {
  defaultItems.forEach((obrok) => {
    displayCreatedHas(obrok.tipObroka, obrok.imeObroka, obrok.cenaObroka);
  });
})();

const rC = () => Math.floor(Math.random() * 256);
//Random color on load
(function () {
  rgbArray = [rC(), rC(), rC(), rC(), rC(), rC()];
  body.style.backgroundImage = `linear-gradient(to bottom right, rgb(${rgbArray[0]},${rgbArray[1]},${rgbArray[2]}), rgb(${rgbArray[3]},${rgbArray[4]},${rgbArray[5]}))`;
})();

const pixelChange = function () {
  rgbArray.forEach((num, i) => {
    if (num >= 1 && num <= 254) {
      Math.random() < 0.5 ? (rgbArray[i] -= 2) : (rgbArray[i] += 2);
    } else if (num <= 1) rgbArray[i] += 2;
    else rgbArray[i] -= 2;
  });
  body.style.backgroundImage = `linear-gradient(to bottom right, rgb(${rgbArray[0]},${rgbArray[1]},${rgbArray[2]}), rgb(${rgbArray[3]},${rgbArray[4]},${rgbArray[5]}))`;
  bw = rgbArray.reduce((acc, num) => (acc += num), 0);
  bw6 = bw / 6;
  body.style.color = bw6 > 112 ? "black" : bw6 < 100 ? "rgb(192,192,192)" : {};
};

const playAudio = function () {
  const rand = Math.random();
  aud.forEach((audio) => (audio.volume = 0.2));
  rand < 0.33 ? aud[0].play() : rand < 0.67 ? aud[1].play() : aud[2].play();
};

setInterval(pixelChange, 50);
