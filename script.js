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
  inputBuy.value = Number(inputSell.value * curRate).toFixed(4);
  return curRate;
}

function updateBuyValue(e) {
    inputBuy.value = Number(e.target.value * curRate).toFixed(4);
    return inputBuy.value;
  }

  function updateSellValue(e) {
    inputSell.value = Number(e.target.value / curRate).toFixed(4);
    return inputSell.value;
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
  converter(firstCurrency, secondCurrency).then(() => {
    currentRateLeft.innerText = `1 RUB = ${curRate.toFixed(4)} USD`;
    let rate = 1 / curRate;
    currentRateRight.innerText = `1 USD = ${rate.toFixed(4)} RUB`;
  })
  .catch((err) => {
    alert("Нет сети!", err);
  })
  })

// Изменение инпута
inputSell.addEventListener("keyup", updateBuyValue);
inputBuy.addEventListener("keyup", updateSellValue);

// Кнопки валют
currencyButtonFrom.forEach((currencyFrom) => {
    currencyFrom.addEventListener("click", (e) => {
      currencyButtonFrom.forEach((currencyFrom) => {
        currencyFrom.classList.remove("select");
      });
      e.target.classList.add("select");
      switch (currencyFrom.innerText) {
        case "RUB":
          firstCurrency = rub;
          break
        case "USD":
          firstCurrency = usd;
          break
        case "EUR":
          firstCurrency = eur;
          break
        case "GBP":
          firstCurrency = gbp;
          break
      };
      if (firstCurrency === secondCurrency) {
        inputSell.value = Number(inputBuy.value).toFixed(4);
        currentRateLeft.innerText = `1 ${currencyFrom.innerText} = 1 ${secondCurrency}`;
        currentRateRight.innerText = `1 ${secondCurrency} = 1 ${firstCurrency}`;
      } else {
        converter(firstCurrency, secondCurrency).then(() => {
        currentRateLeft.innerText = `1 ${currencyFrom.innerText} = ${curRate.toFixed(4)} ${secondCurrency}`;
        let rate = 1 / curRate;
        currentRateRight.innerText = `1 ${secondCurrency} = ${rate.toFixed(4)} ${firstCurrency}`;
        })
        .catch((err) => {
          alert("Нет сети!", err);
        })
      };
    });
    });

currencyButtonTo.forEach((currencyTo) => {
    currencyTo.addEventListener("click", (e) => {
      currencyButtonTo.forEach((currencyTo) => {
        currencyTo.classList.remove("select");
      });
      e.target.classList.add("select");
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
        inputBuy.value = Number(inputSell.value).toFixed(4);
        currentRateRight.innerText = `1 ${currencyTo.innerText} = 1 ${firstCurrency}`;
        currentRateLeft.innerText = `1 ${firstCurrency} = 1 ${secondCurrency}`;
      } else {
        converter(firstCurrency, secondCurrency).then(() => {
        let rate = 1 / curRate;
        currentRateRight.innerText = `1 ${currencyTo.innerText} = ${rate.toFixed(4)} ${firstCurrency}`;
        currentRateLeft.innerText = `1 ${firstCurrency} = ${curRate.toFixed(4)} ${secondCurrency}`;
        })
        .catch((err) => {
          alert("Нет сети!", err);
        })
      };
    });
  })