const inputSell = document.querySelector(".sell");
const inputBuy = document.querySelector(".buy");

//текущий курс, отображённый внутри инпута
const currentRateLeft = document.querySelector("#currentRateOne");
const currentRateRight = document.querySelector("#currentRateTwo");

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
  curRate = Number(data.rates[cur2]);
  inputBuy.value = inputSell.value * curRate;
  return curRate;
}

function updateBuyValue(e) {
    return inputBuy.value = e.target.value * curRate;
  }

  function updateSellValue(e) {
    return inputSell.value = e.target.value / curRate;
  }

// Кнопки первого инпута:
const currencyButtonRub = document.querySelector("#myRub");
const currencyButtonFrom = document.querySelectorAll(".currencyFrom");

// Кнопки второго инпута:
const currencyButUsd = document.querySelector("#usd");
const currencyButtonTo = document.querySelectorAll(".currencyTo");

// Загрузка страницы
window.addEventListener("load", () => {
  currencyButtonRub.classList.add("select");
  currencyButUsd.classList.add("select");
  inputSell.value = 1;
  converter(secondCurrency, firstCurrency); //не работает
  currentRateRight.innerText = `1 USD = ${curRate} RUB`; //не работает
  converter(firstCurrency, secondCurrency);
  currentRateLeft.innerText = `1 RUB = ${curRate} USD`; //не работает
  })

// Изменение инпута
inputSell.addEventListener("keyup", updateBuyValue);
inputBuy.addEventListener("keyup", updateSellValue);

// Кнопки валют
currencyButtonFrom.forEach((currencyFrom) => {
    currencyFrom.addEventListener("click", () => {
      currencyFrom.classList.add("unselect"); //не работает
      switch (currencyFrom.innerText) {
        case "RUB":
          currencyFrom.classList.add("select");
          firstCurrency = rub;
          break
        case "USD":
          currencyFrom.classList.add("select");
          firstCurrency = usd;
          break
        case "EUR":
          currencyFrom.classList.add("select");
          firstCurrency = eur;
          break
        case "GBP":
          currencyFrom.classList.add("select");
          firstCurrency = gbp;
          break
      };
      if (firstCurrency === secondCurrency) {
        inputSell.value = inputBuy.value;
      } else {
        converter(firstCurrency, secondCurrency);
      };
      currentRateLeft.innerText = `1 ${currencyFrom.innerText} = ${curRate} ${secondCurrency}`;
    });
  });

currencyButtonTo.forEach((currencyTo) => {
    currencyTo.addEventListener("click", () => {
      currencyTo.classList.add("unselect"); //не работает
      switch (currencyTo.innerText) {
        case "RUB":
          currencyTo.classList.add("select");
          secondCurrency = rub;
          break
        case "USD":
          currencyTo.classList.add("select");
          secondCurrency = usd;
          break
        case "EUR":
          currencyTo.classList.add("select");
          secondCurrency = eur;
          break
        case "GBP":
          currencyTo.classList.add("select");
          secondCurrency = gbp;
          break
      }
      if (firstCurrency === secondCurrency) {
        inputBuy.value = inputSell.value;
      } else {
        converter(firstCurrency, secondCurrency);
      };
      currentRateRight.innerText = `1 ${currencyTo.innerText} = ${curRate} ${firstCurrency}`;
    });
  })