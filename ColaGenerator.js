// /** @format */

async function loadData() {
  const response = await fetch("./item.json"); //await는 async 함수와만 사용할 수 있음

  if (response.ok) {
    // http 상태코드가 200 ~ 299일 경우 true를 반환 // http 상태코드
    const data = await response.json();
    // console.log(data); // data에 { cola: Array(6) }이 보이실 겁니다!
    // callback(await response.json()); // 응답 본문을 읽으면서 객체형태로 파싱합니다.
    colaFactory(data);
  } else {
    alert("통신 에러!" + response.status);
  }
}

const itemList = document.querySelector("#select_drink");

const colaFactory = (data) => {
  // console.log(data);
  const docFrag = document.createDocumentFragment();
  data.forEach((el) => {
    // console.log(el.name);
    const item = document.createElement("li");
    // item.className.add = "drink";
    item.setAttribute("class", "drink");

    const itemTemplate = `
      <button type="button" class="btn-item" data-item="${el.name}" data-count="${el.count}" data-price="${el.cost}" data-img="${el.img}">
        <img src="./img/${el.img}" alt="${el.name}" class="drink_img"/>
        <p class="drink_name">${el.name}</p>
        <p id="price" class="price">${el.cost}</p>
      </button>
      `;
    item.innerHTML = itemTemplate;
    docFrag.appendChild(item);
    item.addEventListener("click", (event) => changeAfterSelectdrink(item, el));
  });
  itemList.appendChild(docFrag);
};

loadData();

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

// 장바구니 ul
const shoppingList = document.querySelector(".calc_get_drink");

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

/*
 * 3. 자판기 메뉴 기능
 * 아이템을 누르면 잔액 == 잔액 - 아이템 가격이 됩니다.
 * 아이템 가격보다 잔액이 적다면 "잔액이 부족합니다. 돈을 입금해주세요" 경고창이 나타납니다.
 * 아이템이 획득가능 창에 등록됩니다.
 * 아이템 버튼의 data-count 값이 -1 됩니다.
 * 만약 data-count 값이 0 이라면 부모 li에 sold-out 클래스를 붙여줍니다.
 */

const changeAfterSelectdrink = (item, el) => {
  // console.log(item);
  // console.log(el);

  // console.log(event.currentTarget);
  const targetEl = item.querySelector("button");
  const targetPrice = parseInt(targetEl.dataset.price);
  // console.log(targetPrice);
  // console.log(showChange.textContent);
  let change = parseInt(showChange.textContent.replaceAll(",", ""));
  // console.log(change);
  // 잔액이 콜라 가격보다 많다면 차감 아니면 alert!
  if (change >= targetPrice) {
    change -= targetPrice;
    showChange.textContent = change;

    const isStaged = false; // 콜라를 선택한 적이 었는지?
    const shoppingListItem = shoppingList.querySelectorAll("li");
    // console.log(shoppingListItem);

    for (const item of shoppingListItem) {
      // 클릭한 음료수가 내가 선택했던 콜라인지 탐색
      // console.log(item);
    }

    // 처음 선택하는 콜라면 장바구니에 담는다.
    if (!isStaged) {
      // 선택한 콜라 획득가능 창에 등록
      stagedItemGenerator(el, item);
    }
    // 선택했었다면 콜라 개수를 줄인다.
    else {
      // console.log(el);
      el.count--;
    }
  } else {
    alert("잔액이 부족합니다!");
  }
};

// 선택한 콜라 획득가능 창에 등록
function stagedItemGenerator(el, item) {
  const li = document.createElement("li");
  li.setAttribute("class", "get_drink_list");
  console.log(el);
  const btn = item.querySelector("button");
  console.log(btn);
  li.dataset.item = btn.dataset.item;

  const selectedItem = `
        <figure class="get_drink_fig">
          <img src="./img/${el.img}" alt="${el.name}" class="get_drink_img" />
          <figcaption>${el.name}</figcaption>
        </figure>
        <button type="button" class="btn_get_drink_count" data-item="${el.name}" data-count="${el.count}" data-price="${el.cost}" data-img="${el.img}">
        ${el.count}</button>
        `;
  li.innerHTML = selectedItem;
  // console.log(li);
  shoppingList.appendChild(li);
}
