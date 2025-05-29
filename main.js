const clear = document.querySelector('.clear-cta');
const mortgageAmount = document.querySelector('.mortgage-amount');
const mortgageTerm = document.querySelector('.mortgage-term');
const mortgageInterest= document.querySelector('.mortgage-interest');
const mortgageResult = document.querySelector('.mortgage-output');
const repaymentBtn = document.getElementById('repayment');
const interestBtn = document.getElementById('interest');
const totalRepayment = document.querySelector('.total-term');
const calculateBtn = document.querySelector('.calculate-btn');

let selectedCalculation = null;
let amount;
let term;
let interest;
let termPayments;
let monthlyPayment;
let totalPayment;
let monthlyInterest;
let totalInterest;

function validateInputs() {
    let isValid = true;

    const inputs = [
        {
            input: mortgageAmount,
            container: mortgageAmount.closest('.input'),
            symbol: mortgageAmount.closest('.input')?.querySelector('span'),
            error: mortgageAmount.closest('.amount')?.querySelector('.error')
        },
        {
            input: mortgageTerm,
            container: mortgageTerm.closest('.term-input'),
            symbol: mortgageTerm.closest('.term-input')?.querySelector('span'),
            error: mortgageTerm.closest('.term')?.querySelector('.error')
        },
        {
            input: mortgageInterest,
            container: mortgageInterest.closest('.term-input'),
            symbol: mortgageInterest.closest('.term-input')?.querySelector('span'),
            error: mortgageInterest.closest('.rate')?.querySelector('.error')
        }
    ];

    inputs.forEach(({ input, container, symbol, error }) => {
        if (input.value.trim() === "") {
            isValid = false;
            if (container) container.style.border = "2px solid red";
            if (symbol) symbol.style.backgroundColor = "red";
            if(error) error.style.display= 'block';
        } else {
            if (container) container.style.border = "";
            if (symbol) symbol.style.backgroundColor = "";
            if(error) error.style.display= 'none';
        }
    });
    const radioError = document.querySelector('.radio-error');
    const repaymentSelected = document.getElementById('repayment').checked;
    const interestSelected = document.getElementById('interest').checked;

    if (!repaymentSelected && !interestSelected) {
        isValid = false;
        if (radioError) radioError.style.display = "inline";
    } else {
        if (radioError) radioError.style.display = "none";
        selectedCalculation = repaymentSelected ? 'repayment' : 'interest';
    }

    return isValid;
}
function calculateRepayment() {
    amount = parseFloat( mortgageAmount.value);
    term = parseInt(mortgageTerm.value) ;
    interest = parseFloat(mortgageInterest.value) ;
    
    termPayments = term * 12;
    const interestRate =interest / (100 * 12);
    const numerator = interestRate * Math.pow(1 + interestRate, termPayments) 
    const denominator = Math.pow(1 + interestRate, termPayments) - 1;
    monthlyPayment = amount * ( numerator / denominator);
    totalPayment = monthlyPayment * term * 12;
    
}
function calculateInterest() {
    monthlyInterest = (amount * interest) / (100 * 12);
    totalInterest = monthlyInterest * termPayments;

}
calculateBtn.addEventListener('click', () => {
    const isFormValid = validateInputs();
    const resultSection = document.querySelector('.result');
    const emptyResult = document.querySelector('.show-result');

    if (!isFormValid) {
        resultSection.style.display = "none";
        return;
    }

    // Perform calculation
    if (selectedCalculation === 'repayment') {
        calculateRepayment();
        mortgageResult.textContent = "£" + monthlyPayment.toFixed(2);
        totalRepayment.innerHTML = "£" + totalPayment.toFixed(2);
    } else if (selectedCalculation === 'interest') {
        calculateInterest();
        mortgageResult.textContent = "£" + monthlyInterest.toFixed(2);
        totalRepayment.innerHTML = "£" + totalInterest.toFixed(2);
    }

    resultSection.style.display = "block";
    emptyResult.style.display = "none";
});
function clearBtn() {
    mortgageAmount.value= "";
    mortgageTerm.value= "";
    mortgageInterest.value= "";
}
clear.addEventListener('click', () => {
    clearBtn();
    repaymentBtn.checked = false;
    interestBtn.checked = false;

    // Reset view
    document.querySelector('.result').style.display = "none";
    document.querySelector('.show-result').style.display = "flex";

    // Reset selection
    selectedCalculation = null;
});