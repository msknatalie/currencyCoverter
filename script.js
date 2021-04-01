const inputSell = document.querySelector(".sell");
const inputBuy = document.querySelector(".buy");

const BASE_URL = "https://api.ratesapi.io/api";
const rub = "RUB";
const usd = "USD";
const eur = "EUR";
const grb = "GRB";

async function converter(cur1, cur2) {
  const response = await fetch(
    `${BASE_URL}/latest?base=${cur1}&symbols=${cur2}`
  );
  const data = await response.json();
  return data;
  // console.log(data); //проверка - Ок
  // console.log(data.rates.USD); //проверка - Ок
}

// Кнопки первого инпута:
const currencyButtonRub = document.querySelector("#myRub");
const currencyButtonUsd = document.querySelector("#myUsd");
const currencyButtonEur = document.querySelector("#myEur");
const currencyButtonGbp = document.querySelector("#myGbp");

// Кнопки второго инпута:
const currencyButRub = document.querySelector("#rub");
const currencyButUsd = document.querySelector("#usd");
const currencyButEur = document.querySelector("#eur");
const currencyButGbp = document.querySelector("#gbp");

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
  inputSell.addEventListener("keyup", updateValue);
});

//inputSell.addEventListener("keyup", updateValue); // изменение инпута
function updateValue(e) {
  let result = converter(rub, usd);
  result.then((rate) => {
    let usdRate = rate.rates.USD;
    inputBuy.value = e.target.value * usdRate;
  });
}

// Конвертация
// Если в первом инпуте выбран рубль:
//currencyButtonRub.addEventListener("click", () => {
//    currencyButtonRub.style.background = "#833AE0";
//    currencyButUsd.addEventListener("click", () => {
//      currencyButUsd.style.background = "#833AE0";
//      let result = converter(rub, usd);
//      result.then((rate) => {
//        console.log(rate); // Ok
//        console.log(rate.rates.USD); // Ok
//        let usdRate = rate.rates.USD;
//        inputBuy.value = inputSell.value * usdRate;
//        return inputBuy.value; // Ok
//      });
//    });
//    currencyButEur.addEventListener("click", () => {
//      currencyButEur.style.background = "#833AE0";
//      let result = converter(rub, eur);
//      result.then((rate) => {
//        console.log(rate); // Ok
//        console.log(rate.rates.EUR); // Ok
//        let eurRate = rate.rates.EUR;
//        inputBuy.value = inputSell.value * eurRate;
//        return inputBuy.value; // Ok
//      });
//    })
//})
