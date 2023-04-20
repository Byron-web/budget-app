//Initializing sessionStorage retireval ontop for page load
let IncomeArr = JSON.parse(sessionStorage.getItem("IncomeArr")) || [];
let expenseArr = JSON.parse(sessionStorage.getItem("expenseArr")) || [];

//Creating parent obj for income
function Income(name, amount, recurring) {
  this.name = name;
  this.amount = amount;
  this.recurring = recurring;
}

//Condition that checks if there is already data in session if not, then create 5 children obj's, push to array, add to session
if (!IncomeArr.length) {
  let salary = new Income("Salary", 25000, true);
  let contract = new Income("Contract", 15000, false);
  let rentToMe = new Income("Rent to me", 9000, true);
  let debtOwed = new Income("Debt owed to me", 3200, false);
  let commision = new Income("Commision", 8500, false);

  IncomeArr.push(salary, contract, rentToMe, debtOwed, commision);

  sessionStorage.setItem("IncomeArr", JSON.stringify(IncomeArr));
}

//Grab data from user then push to session and create a new child obj
let getIncome = () => {
  let askIncome = prompt(
    "Would you like to add another income entry? y/n"
  ).toLowerCase();

  //if first prompt is "y", then execute the three prompts for data and push to array and session and execute displayIncome(), else return current state, if no value is entered then alert user to enter a value.
  if (askIncome === "y") {
    let askName = prompt("What is the name of the income?");
    let askAmount = prompt("What is the amount of the income?");
    let askRecurring = prompt(
      "Is the income recurring? true/false"
    ).toLowerCase();

    //Place disposable update function here

    //Converting strings to booleans
    if (askRecurring === "true") {
      askRecurring = true;
    } else if (askRecurring === "false") {
      askRecurring = false;
    }

    let newUser = new Income(askName, askAmount, askRecurring);
    IncomeArr.push(newUser);
    sessionStorage.setItem("IncomeArr", JSON.stringify(IncomeArr));
    displayIncome();
    updateDisposableIncome();
    let displayTotalIncome = document.getElementById("totalIncome");
    displayTotalIncome.textContent = `Total Income: R ${calculateTotalIncome()}`;
  } else if (askIncome === "n") {
    return;
  } else {
    alert("You did not enter a value, please try again");
    //execute getIncome function
    getIncome();
  }
};

//Displaying each income(obj) as a card
let displayIncome = () => {
  let usersArr = document.getElementById("usersArr");
  //resetting usersArr to avoid duplication
  usersArr.innerHTML = "";
  //looping through the usersArr array to create a income card for each obj
  IncomeArr.forEach((newUser, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="card p-3">
        <div class="card-body">
          <h5 class="card-title">${newUser.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted"> The amount is R${newUser.amount}</h6>
          <p class="card-text">Is this income recurring ? ${newUser.recurring}</p>
          <button type="button" class="btn btn-danger" onclick="deleteIncome(${index})">Delete</button>
        </div>
      </div>
    `;
    usersArr.appendChild(li);
  });
};

//Calculating the total income from each obj's amount property
function calculateTotalIncome() {
  let totalIncome = 0;
  for (let i = 0; i < IncomeArr.length; i++) {
    totalIncome += parseInt(IncomeArr[i].amount);
  }
  return totalIncome;
}

//Displaying the total amount.
let displayTotalIncome = document.getElementById("totalIncome");
displayTotalIncome.textContent = `Total Income: R ${calculateTotalIncome()}`;

//Deleting the selected index obj from the UI and session
const deleteIncome = (index) => {
  IncomeArr.splice(index, 1);
  sessionStorage.setItem("IncomeArr", JSON.stringify(IncomeArr));
  displayIncome();
  let displayTotalIncome = document.getElementById("totalIncome");
  displayTotalIncome.textContent = `Total Income: R ${calculateTotalIncome()}`;
};

//Creating parent obj for expense
function Expense(name, amount, recurring) {
  this.name = name;
  this.amount = amount;
  this.recurring = recurring;
}

//Condition that checks if there is already data in session if not, then create 5 children obj's, push to array, add to session
if (!expenseArr.length) {
  let rent = new Expense("Rent", 9500, true);
  let groceries = new Expense("Groceries", 5000, false);
  let utilities = new Expense("Utilities", 2500, true);
  let insurance = new Expense("Insurance", 900, false);
  let medicalAid = new Expense("Medical Aid", 4500, false);

  expenseArr.push(rent, groceries, utilities, insurance, medicalAid);

  sessionStorage.setItem("expenseArr", JSON.stringify(expenseArr));
}
//Grab data from user then push to session and create a new child obj
let getExpense = () => {
  let askExpense = prompt(
    "Would you like to add another expense entry? y/n"
  ).toLowerCase();

  //if first prompt is "y", then execute the three prompts for data and push to array and session and execute displayExpense(), else return current state, if no value is entered then alert user to enter a value.
  if (askExpense === "y") {
    let askEName = prompt("What is the name of the expense?");
    let askEAmount = prompt("What is the amount of the expense?");
    let askERecurring = prompt(
      "Is the expense recurring? true/false"
    ).toLowerCase();

    if (askERecurring === "true") {
      askERecurring = true;
    } else if (askERecurring === "false") {
      askERecurring = false;
    }

    let newExpense = new Expense(askEName, askEAmount, askERecurring);
    expenseArr.push(newExpense);
    sessionStorage.setItem("expenseArr", JSON.stringify(expenseArr));
    console.log(expenseArr);
    displayExpense();
  } else if (askExpense === "n") {
    return;
  } else {
    alert("You did not enter a value, please try again");
    getExpense();
  }
};
//Displaying each expense(obj) as a card
let displayExpense = () => {
  let expenseElem = document.getElementById("expenseElem");
  //resetting expenseElem to avoid duplication
  expenseElem.innerHTML = "";
  //looping through the usersArr array to create a income card for each obj
  expenseArr.forEach((newExpense, i) => {
    const eLi = document.createElement("li");
    eLi.innerHTML = `
      <div class="card p-3">
        <div class="card-body">
          <h5 class="card-title">${newExpense.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted"> The amount is R${newExpense.amount}</h6>
          <p class="card-text">Is this income recurring ? ${newExpense.recurring}</p>
          <button type="button" class="btn btn-danger" onclick="deleteExpense(${i})">Delete</button>
        </div>
      </div>
    `;
    expenseElem.appendChild(eLi);
  });
};

//Deleting the selected index obj from the UI and session
const deleteExpense = (i) => {
  expenseArr.splice(i, 1);
  sessionStorage.setItem("expenseArr", JSON.stringify(expenseArr));
  displayExpense();
  let displayTotalExpense = document.getElementById("totalExpenses");
  displayTotalExpense.textContent = `Total Income: R ${calculateTotalExpense()}`;
};

//Calculating the total expense from each obj's amount property
function calculateTotalExpense() {
  let totalExpense = 0;
  for (let i = 0; i < expenseArr.length; i++) {
    totalExpense += parseInt(expenseArr[i].amount);
  }
  return totalExpense;
}

let displayTotalExpense = document.getElementById("totalExpenses");
displayTotalExpense.textContent = "Total Expense: R" + calculateTotalExpense();

//Calculating the disposable income [total income - total expense]
let diposableIncome = document.getElementById("disposableIncome");

let disposableIncomeSum = calculateTotalIncome() - calculateTotalExpense();
disposableIncome.textContent = ` | Total disposable Income = R${disposableIncomeSum}`;

//To update the Disposable income during an action
function updateDisposableIncome() {
  let totalIncome = 0;
  let totalExpense = 0;

  for (let i = 0; i < incomes.length; i++) {
    totalIncome += calculateTotalIncome();
  }

  for (let i = 0; i < expenses.length; i++) {
    totalExpense += calculateTotalExpense();
  }

  disposableIncomeSum = totalIncome - totalExpense;
  console.log(disposableIncomeSum);
}

//Function to display total disposable income after deduction expenses and savings(money put away in savings)
let getSavings = () => {
  let askSavings = parseInt(
    prompt("please enter amount you would like to put into savings each month")
  );
  if (askSavings === "" || isNaN(askSavings)) {
    return disposableIncomeSum;
  } else {
    return disposableIncomeSum - parseInt(askSavings);
  }
};

let disposableSaveIncome = document.getElementById("disposableSaveIncome");
disposableSaveIncome.textContent = `| Total disposable Income after savings = R${getSavings()}`;

//executing functions on pageLoad
displayExpense();
displayIncome();
console.log(updateDisposableIncome());

/* 
    Source and notes >> I had an issue where I was getting double the data from sessionStorage on each page reload, so I added a check to validate whether or not data was in the sessionStorage or not for both income and expense |
    https://getbootstrap.com/docs/4.0/utilities/sizing/ > For styling purposes |
    used logic from task 1 and copied this tasks income logic for expense logic
*/
