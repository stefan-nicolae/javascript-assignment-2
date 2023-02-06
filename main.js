let currentValue = "",
value1, value2, operator,
isResult = false

function add (a, b) {
    return parseFloat(a) + parseFloat(b);
}

function sub (a, b) {
    return parseFloat(a) - parseFloat(b);
}

function mul (a, b) {
    return parseFloat(a) * parseFloat(b);
}

function div (a, b) {
    return parseFloat(a) / parseFloat(b);
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

function writeNumberAndDot(value) {
    if(isResult) clear()
    if(isNaN(parseFloat(currentValue))) {
        updateCurrentValue("")
    }     
    if(value === ".") {
        if(currentValue.includes(".")) return
        if(currentValue === "") {
            updateCurrentValue("0.")
            return
        }
    }
    let newValue = currentValue + value
        updateCurrentValue(newValue)
}

function writeOperator(newOperator) {
    isResult=false
    if(!operator) {
        operator = newOperator
        value1 = parseFloat(currentValue)
        updateCurrentValue(operator)
    } else {
        value1 = operate(operator, value1, parseFloat(currentValue))
        operator = newOperator
        updateCurrentValue(operator)
    }
}

function calculate() {
    if(currentValue && !isNaN(parseFloat(currentValue))) {
        if(!value2) value2 = parseFloat(currentValue) 
        console.log("value1 " + value1)
        console.log("value2 " + value2)
        if(operator === "/" && value2 === 0) {
            alert("Can't divide by zero!")
            return
        }
        updateCurrentValue(operate(operator, value1, value2))
        value1 = parseFloat(currentValue) 
        isResult = true 
    }
}

function backspace() {
   if(isResult) clear()
   updateCurrentValue(currentValue.toString().slice(0, currentValue.toString().length - 1))
}

function clear() {
    isResult = false
    updateCurrentValue("")
    value1 = ""
    value2 = ""
    operator = ""
}

function updateCurrentValue(value) {
    currentValue = value
    document.querySelector(".top .display").textContent = value
}

document.querySelector("#clear-button").addEventListener("click", e => {
    clear()
})

document.querySelector("#back-button").addEventListener("click", e => { 
    backspace()
})

document.querySelectorAll(".row button").forEach(button => {
    if(!button.className.includes("operator") && !button.className.includes("equal")) {
        button.addEventListener("click", e => {
            writeNumberAndDot(button.textContent)
        })
    }
    else if(button.className.includes("equal")) {
        button.addEventListener("click", e => {
            calculate()
        })
    }
    else {
        button.addEventListener("click", e => {
            writeOperator(e.currentTarget.textContent)
        })
    }
})

document.addEventListener("keydown", e => {
    if(!isNaN(parseFloat(e.key)) || e.key === ".") {
        writeNumberAndDot(e.key)
    }
    else if(e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
        writeOperator(e.key)
    }
    else if(e.key === "Enter") {
        calculate()
    }
    else if(e.key === "Backspace") {
        backspace()
    }
    else if(e.key === "Escape") {
        clear()
    }
})

