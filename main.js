function add (a, b) {
    return a + b;
}

function sub (a, b) {
    return a - b;
}

function mul (a, b) {
    return a * b;
}

function div (a, b) {
    return a / b;
}

function operate (operator, a, b) {
    switch(operator) {
        case "+":
            return add(a, b)
        case "-":
            return sub(a, b)
        case "*":
            return mul(a, b)
        case "/":
            return div(a, b)
    }
}

let displayValue = ""

function updateDisplay(value) {
    document.querySelector(".top .display").textContent = value
}

document.querySelector(".top button").addEventListener("click", e => {
    displayValue = ""
    updateDisplay("")
})

document.querySelectorAll(".row button").forEach(button => {
    if(!button.className.includes("operator")) {
        button.addEventListener("click", e => {
            displayValue += button.textContent
            updateDisplay(displayValue)
        })
    }
})