// select all dom
const buttons = document.querySelectorAll('#card_btn .btn');
const selectedPlayer = document.getElementById('selected');
const errorMsg = document.getElementById('error-msg');
const calculateBtn = document.getElementById('calculate_budget');
const calculateTotalBtn = document.getElementById('calculate_total_budget');


// Button click and selected player update
function addPlayer(playerName) {
    const li = document.createElement('li');
    li.innerText = playerName;
    if (selectedPlayer.children.length === 5) {
        return;
    }
    selectedPlayer.appendChild(li);
}

for (const button of buttons) {
    button.addEventListener('click', (e) => {
        if (selectedPlayer.children.length >= 4) {
            calculateBtn.classList.remove('disabled');
            calculateTotalBtn.classList.remove('disabled');
        } else {
            calculateBtn.classList.add('disabled');
            calculateTotalBtn.classList.add('disabled');
        }
        if (selectedPlayer.children.length <= 4) {
            button.classList.add('disabled');
            addPlayer(button.parentNode.children[0].innerText);


        } else {
            button.classList.remove('disabled');
            addPlayer(button.parentNode.children[0].innerText)
            errorMsg.innerHTML = '5 Played already Selected';

        }
    })
}

// A common function for getInput value
function getInputValue(inputId) {
    const inputField = document.getElementById(inputId);
    const inputFieldValue = inputField.value;
    // console.log(typeof inputFieldValue);

    if (!inputFieldValue) {
        errorMsg.innerHTML = 'Please enter your budget'
        return;
    }

    errorMsg.innerHTML = '';
    inputField.value = "";
    return inputFieldValue;
};

function getValueOfElement(elementId, value) {
    const element = document.getElementById(elementId);
    element.innerText = value;
}



// Budgets add event listeners
document.getElementById('calculate_budget').addEventListener('click', function () {
    const perPlayerBudgetString = getInputValue('per_player_budget');
    const perPlayerBudget = parseInt(perPlayerBudgetString);
    // console.log(typeof perPlayerBudget);
    if (perPlayerBudgetString === undefined) {
        errorMsg.innerHTML = 'Please enter your budget'
        return;
    }
    if (typeof perPlayerBudget != 'number') {
        errorMsg.innerHTML = 'Budget must be a number and positive values ';
        return;
    }
    if (isNaN(perPlayerBudget)) {
        errorMsg.innerHTML = 'Budget must be a number and positive values ';
        return;
    }
    if (perPlayerBudget < 0) {
        errorMsg.innerHTML = 'Enter a positive number ';
        return;
    }
    errorMsg.innerHTML = '';
    let totalPlayerExpense = perPlayerBudget * 5;
    getValueOfElement('player_expense', totalPlayerExpense)
})
document.getElementById('calculate_total_budget').addEventListener('click', function () {
    const perPlayerBudget = document.getElementById('player_expense');
    const playerTotalBudget = parseFloat(perPlayerBudget.innerText)
    const managerBudgetString = getInputValue('manager_budget');
    const managerBudget = parseFloat(managerBudgetString);
    const coachBudgetString = getInputValue('coach_budget');
    const coachBudget = parseFloat(coachBudgetString);
    console.log(typeof managerBudget, typeof coachBudget);
    if (!managerBudgetString || !coachBudgetString) {
        errorMsg.innerHTML = 'Please enter your budget';
        return;
    }

    if (typeof managerBudget != 'number' || typeof coachBudget != 'number') {
        errorMsg.innerHTML = 'Budget must be a number and positive values ';
        return;
    }
    if (managerBudget < 0 || coachBudget < 0) {
        errorMsg.innerHTML = 'Enter a positive number ';
        return;
    }

    let totalExpense = playerTotalBudget + managerBudget + coachBudget;
    if (isNaN(totalExpense)) {
        errorMsg.innerHTML = 'Budget must be a number and positive values ';
        return;
    }
    errorMsg.innerHTML = '';
    getValueOfElement('player_total_expense', totalExpense)
})

