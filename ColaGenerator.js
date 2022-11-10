/** @format */

async function loadData(callback) {
  const response = await fetch("./item.json"); //await는 async 함수와만 사용할 수 있음

  if (response.ok) {
    // http 상태코드가 200 ~ 299일 경우 true를 반환 // http 상태코드
    const data = await response.json();
    console.log(data); // data에 { cola: Array(6) }이 보이실 겁니다!
    // callback(await response.json()); // 응답 본문을 읽으면서 객체형태로 파싱합니다.
    colaFactory(data);
  } else {
    alert("통신 에러!" + response.status);
  }
}

// const itemList = document.querySelector("#select_drink");

// const colaFactory = (data) => {
//   console.log(data);
//   const docFrag = document.createDocumentFragment();
//   data.forEach((el) => {
//     console.log(el.name);
//     const item = document.createElement("li");
//     const itemTemplate = `
//       <button type="button" class="btn-item" data-item="${el.name}" data-count="${el.count}" data-price="${el.cost}" data-img="${el.img}">
//           <img src="./img/${el.img}" alt="" class="img-item">
//           <strong class="tit-item">${el.name}</strong>
//           <span class="txt-price">${el.cost}원</span>
//       </button>
//       `;
//     item.innerHTML = itemTemplate;
//     docFrag.appendChild(item);
//   });
//   itemList.appendChild(docFrag);
// };

// loadData();

// <li class="drink Orange">
// <img
//   src="./img/Orange_Cola.svg"
//   alt="오렌지 콜라"
//   class="drink_img"
// />
// <p class="drink_name">Orange_Cola</p>
// <p id="price" class="price">1000</p>
// </li>
