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
var income, expense, incomeValue, expenseValue, totalIE, deleteDetails;
const addDetails = document.querySelector('.add__btn');
addDetails.addEventListener('click', addList);

document.getElementById("income__price").innerHTML = 0;
document.getElementById("expense__price").innerHTML = 0;
document.querySelector(".budget__price").innerHTML = 0;

//Add Focus on desription
document.querySelector('.add__details').focus();
function addList() {

    const symbol = document.querySelector('.add__symbol').value;
    const description = document.querySelector('.add__details').value;
    const value = document.querySelector('.add__price').value;
    var d1 = new Details(symbol, description, parseInt(value));
    detailArray.push(d1);    

    // Clear input field
    document.querySelector('.add__details').value="";
    document.querySelector('.add__price').value='';
    // After add in list focus back in description input
    document.querySelector('.add__details').focus();
    displayAddDetails(); 
}

function displayAddDetails(){
//  Add List income and Expenses and also calculation
   
    income = dispayIncomeDetails(detailArray);
    expense = dispayExpenseDetails(detailArray);
// header section show total income and expenses
    incomeValue = displayIncomeValue(detailArray);
    expenseValue = displayExpenseValue(detailArray);
//  Total income - expense
    totalIE = displayTotalIE(incomeValue, expenseValue);

    document.querySelector('.income__description').innerHTML = income;
    document.querySelector('.expense__description').innerHTML = expense;
    document.getElementById("income__price").innerHTML = incomeValue;
    document.getElementById("expense__price").innerHTML = expenseValue;
    document.querySelector(".budget__price").innerHTML = totalIE;


// Delete List from Income and Expense section

    deleteDetails = document.querySelectorAll('.details');
    deleteDetails.forEach(element => element.addEventListener('click', deleteList));

    function deleteList() {
        var description = this.querySelector('.description').innerText;
        var value = this.querySelector('.detail__price').innerText.slice(2);
               
        matchFind(description,value);

        function matchFind(wordToMatch,valueToMatch) {

            var index = detailArray.findIndex(function (element) {
                return element.description.includes(wordToMatch) ;
                      
            });
                       
            detailArray.splice(index, 1);
            displayAddDetails();
        }

    }
}

function dispayIncomeDetails(detailArray) {
    return detailArray.map(detail => {
        if (detail.symbol === 'inc') {

            return `<div class="details"><p class="description">${detail.description}</p>
                <p class="detail__price">+ ${detail.value}</p></div>`;
        }
    }).join('');
}

function dispayExpenseDetails(detailArray) {
    return detailArray.map(detail => {
        if (detail.symbol !== 'inc') {
            return `<div class="details"><p class="description">${detail.description}</p>
                <p class="detail__price detail__price--red">- ${detail.value}</p></div>`;
        }
    }).join('');
}

function displayIncomeValue(detailArray) {
    var income = detailArray.filter((detail) => {
        return detail.symbol === 'inc';
    });

    return income.reduce(function (totalIncome, currentValue) {
        return totalIncome + currentValue.value;
    }, 0);

}


function displayExpenseValue(detailArray) {
    var expense = detailArray.filter((detail) => {
        return detail.symbol !== 'inc';
    });

    return expense.reduce(function (totalIncome, currentValue) {
        return totalIncome + currentValue.value;
    }, 0);
}

function displayTotalIE(income, expense) {
    return income - expense
}
