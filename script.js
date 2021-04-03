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
  curRate = data.rates[cur2];
  inputBuy.value = inputSell.value * curRate;
  return curRate;
}

function updateBuyValue(e) {
    inputBuy.value = e.target.value * curRate;
  }

  function updateSellValue(e) {
    inputSell.value = e.target.value / curRate;
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
  converter(firstCurrency, secondCurrency);
  })

// Изменение инпута
inputSell.addEventListener("keyup", updateBuyValue);
inputBuy.addEventListener("keyup", updateSellValue);

// Кнопки валют
currencyButtonFrom.forEach((currencyFrom) => {
    currencyFrom.addEventListener("click", () => {
      switch (currencyFrom.innerText) {
        case "RUB":
          currencyFrom.style.background = "#833AE0";
          return firstCurrency = rub;
        case "USD":
          currencyFrom.style.background = "#833AE0";
          return firstCurrency = usd;
        case "EUR":
          currencyFrom.style.background = "#833AE0";
          return firstCurrency = eur;
        case "GBP":
          currencyFrom.style.background = "#833AE0";
          return firstCurrency = gbp;
      }
      converter(firstCurrency, secondCurrency);
    });
  });

currencyButtonTo.forEach((currencyTo) => {
    currencyTo.addEventListener("click", () => {
      switch (currencyTo.innerText) {
        case "RUB":
          currencyTo.style.background = "#833AE0";
          return secondCurrency = rub;
        case "USD":
          currencyTo.style.background = "#833AE0";
          return secondCurrency = usd;
        case "EUR":
          currencyTo.style.background = "#833AE0";
          return secondCurrency = eur;
        case "GBP":
          currencyTo.style.background = "#833AE0";
          return secondCurrency = gbp;
      }
      converter(firstCurrency, secondCurrency);
    });
  })