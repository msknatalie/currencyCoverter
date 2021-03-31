const inputSell = document.querySelector('.sell');
const inputBuy = document.querySelector('.buy');

//inputSell.addEventListener('keyup', updateValue); // изменение инпута

const BASE_URL = "https://api.ratesapi.io/api";
const rub = "RUB";
const usd = "USD";
const eur = "EUR";
const grb = "GRB";

async function converter (cur1, cur2) {
    const response = await fetch(`${BASE_URL}/latest?base=${cur1}&symbols=${cur2}`);
    const data = await response.json();
    return data;
// console.log(data); //проверка - Ок
// console.log(data.rates.USD); //проверка - Ок
  }

const currencyButton = document.querySelector("#myRub");

currencyButton.addEventListener("click", () => {
    currencyButton.style.background = "#833AE0";
    converter (rub, usd);
    console.log(data); // не работает
    let usdRate = data.rates.USD;
    inputBuy.value = inputSell.value * usdRate;
})
  
//function updateValue (e) {
//    inputBuy.value = e.target.value;
//}