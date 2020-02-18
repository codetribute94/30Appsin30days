const curBal = document.getElementById('balanceId');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const listElement = document.getElementById('list');
const formElement = document.getElementById('form');
const text = document.getElementById('text-input');
const amount = document.getElementById('amount-input');
// const addBtn = document.getElementById('button');


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Adding transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please enter amount and text')
    } else {
        let transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

//Generating random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

//Add transaction to the DOM list.
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>`;
    listElement.appendChild(item);
}

//updating balance, income and expense.
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    curBal.innerText = ` ${total}`;
    money_plus.innerText = `${income}`;
    money_minus.innerText = `${expense}`
}

//removing transaction with ID.
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();

}

// updating LocalStorage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

//init app
function init() {
    listElement.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();

}

init();

formElement.addEventListener("submit", addTransaction);
