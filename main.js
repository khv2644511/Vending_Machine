/** @format */

// inputMoney에 금액 입력 후 inputMoneyBtn 버튼 클릭하면 showChange(잔액)에 표시됨

// 입금버튼
const inputMoneyBtn = document.getElementById("input_money_btn");

//입금액 입력 input
const inputMoney = document.querySelector("#input_money");

// 잔액 display
const showChange = document.querySelector("#show_change");

// 소지금
const deposit = document.querySelector(".deposit");

// 거스름돈 반환 버튼
const returnChange = document.querySelector(".calc_button_chage");

/**
 * 1. 입금 버튼 기능
 * 입금액을 입력하고 입금 버튼을 누르면 소지금 == 소지금 - 입금액, 잔액 == 기존 잔액 + 입금액이 됩니다.
 * 입금액이 소지금 보다 많다면 실행을 중단하고 "소지금이 부족합니다." 라고 쓰인 경고창을 띄웁니다.
 * 입금액 인풋창은 초기화됩니다.
 */
inputMoneyBtn.addEventListener("click", changeShow);

function changeShow() {
  const inputValue = parseInt(inputMoney.value);
  const deposits = parseInt(deposit.textContent.replaceAll(",", ""));
  // console.log(deposits);
  // console.log(inputValue);

  // console.log(deposits);
  if (inputValue > deposits) {
    alert("소지금이 부족합니다. 돈을 더 가져오세요!");
    inputMoney.value = null;
  } else {
    if (isNaN(inputValue)) {
      alert("숫자를 입력하세요!");
      inputMoney.value = "";
    } else if (inputValue >= 0) {
      // Intl.NumberFormat().format() 소수점 자동 생성
      showChange.innerText = Intl.NumberFormat().format(inputValue);
      inputMoney.value = null;
    }
  }
}

/*
 * 2. 거스름돈 반환 버튼 기능
 * 반환 버튼을 누르면 소지금 == 소지금 + 잔액이 됩니다.
 * 반환 버튼을 누르면 잔액 창은 초기화됩니다.
 */
returnChange.addEventListener("click", changeReturn);
function changeReturn() {
  // 위에서 정의했는데 또 해줘야하나??
  const Changes = parseInt(showChange.textContent.replaceAll(",", ""));
  const deposits = parseInt(deposit.textContent.replaceAll(",", ""));
  if (Changes) {
    deposit.innerText = Intl.NumberFormat().format(Changes + deposits);
    showChange.textContent = "";
  }
}

const original_Drink = document.querySelector(".Original");
const Violet_Drink = document.querySelector(".Violet");
const Yellow_Drink = document.querySelector(".Yellow");
const Cool_Drink = document.querySelector(".Cool");
const Green_Drink = document.querySelector(".Green");
const Orange_Drink = document.querySelector(".Orange");

let drinkList = [
  original_Drink,
  Violet_Drink,
  Yellow_Drink,
  Cool_Drink,
  Green_Drink,
  Orange_Drink,
];

// drinkList.forEach((el) =>
//   el.addEventListener("click", () => changeAfterSelectdrink(el))
// );

// function changeAfterSelectdrink(el) {
//   // console.log(el);
//   console.log(el.childNodes);
// }
//   const nodelist = Array.prototype.slice.call(el.childNodes);
//   nodeItem = nodelist.item(0);
//   console.log(nodeItem);
// }
