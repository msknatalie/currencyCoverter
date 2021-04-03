const inputSell = document.querySelector(".sell");
const inputBuy = document.querySelector(".buy");

const BASE_URL = "https://api.ratesapi.io/api";
const rub = "RUB";
const usd = "USD";
const eur = "EUR";
const gbp = "GBP";
let firstCurrency = rub;
let secondCurrency = usd;
let curRate;

async function converter(cur1, cur2) {
  const response = await fetch(
    `${BASE_URL}/latest?base=${cur1}&symbols=${cur2}`
  );
  const data = await response.json();
  let result = data; // не было
  result.then((rate) => {
  curRate = rate.rates[cur2];
  return curRate;
})
}

function updateValue(e) {
    inputBuy.value = e.target.value * curRate;
  }

// Кнопки первого инпута:
const currencyButtonRub = document.querySelector("#myRub");
const currencyButtonFrom = document.querySelectorAll(".currencyFrom");

// Кнопки второго инпута:
const currencyButUsd = document.querySelector("#usd");
const currencyButtonTo = document.querySelectorAll(".currencyTo");

// Загрузка страницы
window.addEventListener("load", () => {
  currencyButtonRub.style.background = "#833AE0";
  currencyButUsd.style.background = "#833AE0";
  inputSell.value = 1;
  let result = converter(rub, usd);
  result.then((rate) => {
    let usdRate = rate.rates.USD;
    inputBuy.value = inputSell.value * usdRate;
  });
});

// изменение инпута
inputSell.addEventListener("keyup", updateValue);

currencyButtonFrom.forEach((currencyFrom) => {
    currencyFrom.addEventListener("click", () => {
      switch (currencyFrom.innerText) {
        case "RUB":
          currencyFrom.style.background = "#833AE0";
          firstCurrency = rub;
          converter(firstCurrency, secondCurrency);
          break
        case "USD":
          currencyFrom.style.background = "#833AE0";
          firstCurrency = usd;
          converter(firstCurrency, secondCurrency);
          break
        case "EUR":
          currencyFrom.style.background = "#833AE0";
          firstCurrency = eur;
          converter(firstCurrency, secondCurrency);
          break
        case "GBP":
          currencyFrom.style.background = "#833AE0";
          firstCurrency = gbp;
          converter(firstCurrency, secondCurrency);
          break
      }
      return firstCurrency;
    });
  //  converter(firstCurrency, secondCurrency);
  });

inputBuy.addEventListener("keyup", updateValue);

currencyButtonTo.forEach((currencyTo) => {
    currencyTo.addEventListener("click", () => {
      switch (currencyTo.innerText) {
        case "RUB":
          currencyTo.style.background = "#833AE0";
          secondCurrency = rub;
          converter(firstCurrency, secondCurrency);
          break
        case "USD":
          currencyTo.style.background = "#833AE0";
          secondCurrency = usd;
          converter(firstCurrency, secondCurrency);
          break
        case "EUR":
          currencyTo.style.background = "#833AE0";
          secondCurrency = eur;
          converter(firstCurrency, secondCurrency);
          break
        case "GBP":
          currencyTo.style.background = "#833AE0";
          secondCurrency = gbp;
          converter(firstCurrency, secondCurrency);
          break
      }
      return secondCurrency;
    });
  })