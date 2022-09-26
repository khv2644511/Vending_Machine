// inputMoney에 금액 입력 후 inputMoneyBtn 버튼 클릭하면 showChange(잔액)에 표시됨
const inputMoneyBtn = document.getElementById("input_money_btn");
inputMoneyBtn.addEventListener("click", function () {
  const inputMoney = document.getElementById("input_money").value;
  console.log(inputMoney);

  const showChange = document.getElementById("show_change");
  showChange.innerHTML = inputMoney;
});

// selectDrink 음료를 클릭하면 showChange(잔액)에 음료 금액만큼 차감됨
const selectDrink = document.getElementById("select_drink");

selectDrink.addEventListener("click", function () {
  const showChange = document.getElementById("show_change").innerHTML;

  const priceOfDrink = document.getElementById("price").innerHTML;

  console.log("hi");
  // console.log(priceOfDrink);

  console.log(parseInt(priceOfDrink));
  console.log(showChange);

  const Change = parseInt(showChange - priceOfDrink);
  console.log(Change);
  const calc = document.getElementById("show_change");
  calc.innerHTML = Change;
});
