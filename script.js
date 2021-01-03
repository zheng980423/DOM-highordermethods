const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];
getRandomUer();
getRandomUer();
getRandomUer();
//fetch 随机用户以及财富
async function getRandomUer() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    //Math.floor :返回一个小于或等于一个给定值的最大整数
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

//所有人的财富都乘二
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

//根据财富降序排列
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}
//只显示百万富翁
function showMillionaire() {
  data = data.filter(item => item.money > 1000000);
  updateDOM();
}
//加和财富
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>总财富：<strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}
function addData(obj) {
  data.push(obj);
  updateDOM();
}

//更新DOM
function updateDOM(providedData = data) {
  // 清空main div
  main.innerHTML = '<h2><strong>姓名</strong>财富数据</h2>';
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> 
    ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

//格式化数字转化为钱
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addUserBtn.addEventListener('click', getRandomUer);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaire);
calculateWealthBtn.addEventListener('click', calculateWealth);
