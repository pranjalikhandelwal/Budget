// Add Month in Budeget Heading
const month = new Date().toLocaleString('default', { month: 'long' });
document.querySelector('.budget__heading').innerHTML = `Avaible Budeget in  ${month}`;

// Symbol Changes + and -
function Details(symbol, description, value) {
    this.symbol = symbol;
    this.description = description;
    this.value = value;
}
var detailArray = [];
var income, expense, incomeValue, expenseValue, totalIE;
const addDetails = document.querySelector('.add__btn');
addDetails.addEventListener('click', addList);


document.getElementById("income__price").innerHTML = 0;
document.getElementById("expense__price").innerHTML = 0;
document.querySelector(".budget__price").innerHTML = 0;

function addList() {

    const symbol = document.querySelector('.add__symbol').value;
    const description = document.querySelector('.add__details').value;
    const value = document.querySelector('.add__price').value;
    var d1 = new Details(symbol, description, parseInt(value));

    detailArray.push(d1);    

    income = dispayIncomeDetails(detailArray);
    expense = dispayExpenseDetails(detailArray);
    incomeValue = displayIncomeValue(detailArray);
    expenseValue = displayExpenseValue(detailArray);
    totalIE = displayTotalIE(incomeValue, expenseValue);

    document.querySelector('.income__description').innerHTML = income;
    document.querySelector('.expense__description').innerHTML = expense;
    document.getElementById("income__price").innerHTML = incomeValue;
    document.getElementById("expense__price").innerHTML = expenseValue;
    document.querySelector(".budget__price").innerHTML = totalIE;
}

function dispayIncomeDetails(detailArray) {
    return detailArray.map(detail => {
        if (detail.symbol === '1') {

            return `<div class="details">${detail.description}
                <span class="detail__price">+ ${detail.value}</span></div>`;
        }
    }).join('');
}

function dispayExpenseDetails(detailArray) {
    return detailArray.map(detail => {
        if (detail.symbol !== '1') {
            return `<div class="details">${detail.description}
                <span class="detail__price detail__price--red">- ${detail.value}</span></div>`;
        }
    }).join('');
}

function displayIncomeValue(detailArray) {
    var income = detailArray.filter((detail) => {
        return detail.symbol === '1';
    });

    return income.reduce(function (totalIncome, currentValue) {
        return totalIncome + currentValue.value;
    }, 0);

}


function displayExpenseValue(detailArray) {
    var expense = detailArray.filter((detail) => {
        return detail.symbol !== '1';
    });

    return expense.reduce(function (totalIncome, currentValue) {
        return totalIncome + currentValue.value;
    }, 0);
}

function displayTotalIE(income, expense) {
    return income - expense
}






















