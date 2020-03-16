const maxParameterOne = 6200000,
  maxParameterTwo = 100,
  maxParameterThree = 30;

const minParameterOne = 2700000,
  minParameterTwo = 15,
  minParameterThree = 1;

const defaultParameterTwo = 20;

const matrixOfPercents = [9.3, 8.6, 7.99, 8.15, 7.3, 8.5, 10, 9.1, 8.49];

const matrixOfColors = [
  "#28a745",
  "#009FDF",
  "#28a745",
  "#BB0032",
  "#343a40",
  "#1E4679",
  "#245F34",
  "#2B2C84",
  "#00AAA9"
];

var percentOne, percentTwo, percentThree;

var bankElements = document.getElementsByClassName("bank");
var bankLogoContainers = document.getElementsByClassName("bank-logo");
var childBankElements = document.getElementsByClassName("payment-amount");

// set colors of all bank's divs
for (let i = 0; i < bankElements.length; i++) {
  bankElements[i].style.backgroundColor = matrixOfColors[i];
}

// first parameter values and elements

let sliderOne = document.getElementById("apart-price-range");
let outputOne = document.getElementById("apart-price");
let barOne = document.getElementById("apart-price-bar");

// second parameter values and elements

let sliderTwo = document.getElementById("start-price-range");
let outputTwo = document.getElementById("start-price");
let barTwo = document.getElementById("start-price-bar");
let anotherOutputTwo = document.getElementById("start-price-percentage");

// third parameter values and elements

let sliderThree = document.getElementById("period-range");
let outputThree = document.getElementById("period");
let barThree = document.getElementById("period-bar");

// Display the default slider's (first, second, third) values with indents

outputOne.value = numberWithSpaces(sliderOne.value);
outputTwo.value = numberWithSpaces(
  Math.floor((sliderOne.value * sliderTwo.value) / 100)
);
outputThree.value = sliderThree.value;

// Default bar's positions

percentOne =
  (sliderOne.value / minParameterOne - 1) /
  (maxParameterOne / minParameterOne - 1);
barOne.style.width = `${percentOne * 100}%`;

percentTwo =
  (sliderTwo.value / minParameterTwo - 1) /
  (maxParameterTwo / minParameterTwo - 1);
barTwo.style.width = `${percentTwo * 100}%`;

percentThree =
  (sliderThree.value / minParameterThree - 1) /
  (maxParameterThree / minParameterThree - 1);
barThree.style.width = `${percentThree * 100}%`;

// update the current slider value (each time you drag the slider handle)
// handle event listeners on input event
// and adjust no-default-bar's to certain width depend on values
// calculate every month payment for each bank

sliderOne.oninput = function() {
  outputOne.value = numberWithSpaces(this.value);

  percentOne =
    (this.value / minParameterOne - 1) /
    (maxParameterOne / minParameterOne - 1);

  barOne.style.width = `${percentOne * 100}%`;

  //update output value of start price to default
  sliderTwo.value = defaultParameterTwo;

  outputTwo.value = numberWithSpaces(
    Math.floor((this.value * sliderTwo.value) / 100)
  );

  percentTwo =
    (defaultParameterTwo / minParameterTwo - 1) /
    (maxParameterTwo / minParameterTwo - 1);

  barTwo.style.width = `${percentTwo * 100}%`;
  anotherOutputTwo.innerHTML = `${defaultParameterTwo}%`;

  [...childBankElements].forEach((element, index) => {
    element.innerHTML = numberWithSpaces(
      Math.floor(
        annuityCredit(
          matrixOfPercents[index],
          this.value,
          numberWithoutSpaces(outputTwo.value),
          sliderThree.value
        )
      )
    );
  });
};

outputOne.oninput = function() {
  this.value = validationInput(this.value);
  sliderOne.value = numberWithoutSpaces(this.value);
  this.value = numberWithSpaces(+numberWithoutSpaces(this.value));

  percentOne =
    (sliderOne.value / minParameterOne - 1) /
    (maxParameterOne / minParameterOne - 1);

  barOne.style.width = `${percentOne * 100}%`;

  //update output value for start price
  sliderTwo.value = defaultParameterTwo;

  outputTwo.value = numberWithSpaces(
    Math.floor((numberWithoutSpaces(this.value) * sliderTwo.value) / 100)
  );

  percentTwo =
    (defaultParameterTwo / minParameterTwo - 1) /
    (maxParameterTwo / minParameterTwo - 1);

  barTwo.style.width = `${percentTwo * 100}%`;
  anotherOutputTwo.innerHTML = `${defaultParameterTwo}%`;

  [...childBankElements].forEach((element, index) => {
    element.innerHTML = numberWithSpaces(
      Math.floor(
        annuityCredit(
          matrixOfPercents[index],
          numberWithoutSpaces(outputOne.value),
          numberWithoutSpaces(outputTwo.value),
          sliderThree.value
        )
      )
    );
  });
};

sliderTwo.oninput = function() {
  outputTwo.value = numberWithSpaces(
    Math.floor((numberWithoutSpaces(outputOne.value) * this.value) / 100)
  );

  // this.value = numberWithSpaces(numberWithoutSpaces(this.value));
  percentTwo =
    (this.value / minParameterTwo - 1) /
    (maxParameterTwo / minParameterTwo - 1);

  barTwo.style.width = `${percentTwo * 100}%`;
  anotherOutputTwo.innerHTML = `${this.value}%`;

  [...childBankElements].forEach((element, index) => {
    element.innerHTML = numberWithSpaces(
      Math.floor(
        annuityCredit(
          matrixOfPercents[index],
          numberWithoutSpaces(outputOne.value),
          numberWithoutSpaces(outputTwo.value),
          sliderThree.value
        )
      )
    );
  });
};

outputTwo.oninput = function() {
  this.value = validationInput(this.value);
  this.value = numberWithSpaces(+numberWithoutSpaces(this.value));

  const temp = Math.floor(
    (numberWithoutSpaces(this.value) / numberWithoutSpaces(outputOne.value)) *
      100
  );

  sliderTwo.value = temp;

  percentTwo =
    (sliderTwo.value / minParameterTwo - 1) /
    (maxParameterTwo / minParameterTwo - 1);

  barTwo.style.width = `${percentTwo * 100}%`;
  anotherOutputTwo.innerHTML = temp > 100 ? `> 100%` : `${temp}%`;

  [...childBankElements].forEach((element, index) => {
    element.innerHTML = numberWithSpaces(
      Math.floor(
        annuityCredit(
          matrixOfPercents[index],
          numberWithoutSpaces(outputOne.value),
          numberWithoutSpaces(outputTwo.value),
          sliderThree.value
        )
      )
    );
  });
};

sliderThree.oninput = function() {
  outputThree.value = numberWithSpaces(this.value);

  percentThree =
    (this.value / minParameterThree - 1) /
    (maxParameterThree / minParameterThree - 1);

  barThree.style.width = `${percentThree * 100}%`;

  [...childBankElements].forEach((element, index) => {
    element.innerHTML = numberWithSpaces(
      Math.floor(
        annuityCredit(
          matrixOfPercents[index],
          numberWithoutSpaces(outputOne.value),
          numberWithoutSpaces(outputTwo.value),
          this.value
        )
      )
    );
  });
};

outputThree.oninput = function() {
  this.value = validationInput(this.value);

  // limitation for output of third parameter

  if (this.value > 30) {
    this.value = 30;
  }

  sliderThree.value = this.value;

  percentThree =
    (sliderThree.value / minParameterThree - 1) /
    (maxParameterThree / minParameterThree - 1);

  barThree.style.width = `${percentThree * 100}%`;

  [...childBankElements].forEach((element, index) => {
    element.innerHTML = numberWithSpaces(
      Math.floor(
        annuityCredit(
          matrixOfPercents[index],
          numberWithoutSpaces(outputOne.value),
          numberWithoutSpaces(outputTwo.value),
          this.value
        )
      )
    );
  });
};

// function formating numbers to format 'xxx xxx ...'

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// function with regular expression to exclude spaces from numbers string

function numberWithoutSpaces(x) {
  return x.toString().replace(/\s/g, "");
}

// function for calculating credit

function annuityCredit(percentageRateYearly, apartPrice, startPrice, period) {
  if (period == 0) {
    return 0;
  } else {
    let percentageRateMonthly = percentageRateYearly / 12 / 100;
    let temp = Math.pow(1 + percentageRateMonthly, period * 12);

    // coefficeient annuity for calculating annuity every month payment
    // formula taken from 'https://journal.tinkoff.ru/guide/credit-payment/#one'

    let coefficient = (temp * percentageRateMonthly) / (temp - 1);
    let everyMonthPayment = (apartPrice - startPrice) * coefficient;

    return everyMonthPayment > 0 ? everyMonthPayment : 0;
  }
}

// validation for text inputs with regexp (0-9 only characters)

function validationInput(x) {
  return x.replace(/[^0-9]/g, "");
}
