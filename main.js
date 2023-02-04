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
    //if there is an operator in the currentValue, clear
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
    //operator is empty
    if(!operator) {
        operator = newOperator
        value1 = parseFloat(currentValue)
        updateCurrentValue(operator)
    } else {
        //we are chaining
        value1 = operate(operator, value1, parseFloat(currentValue))
        operator = newOperator
        updateCurrentValue(operator)
    }
}

function calculate() {
    if(value1 && currentValue && !isNaN(parseFloat(currentValue))) {
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
        //if this is true and numbers or dot or backspace are pressed,
        //then clear (clear makes it false again)
        //if operators are pressed then isResult=false
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

//updateCurrentValue() to update the info
//currentValue to get the info
function updateCurrentValue(value) {
    currentValue = value
    document.querySelector(".top .display").textContent = value
}

//clear button
document.querySelector("#clear-button").addEventListener("click", e => {
    clear()
})

document.querySelector("#back-button").addEventListener("click", e => { 
    backspace()
})

document.querySelectorAll(".row button").forEach(button => {
    //numbers; adds a number at the end of the currentValue
    if(!button.className.includes("operator") && !button.className.includes("equal")) {
        button.addEventListener("click", e => {
            writeNumberAndDot(button.textContent)
        })
    }
    //equal
    else if(button.className.includes("equal")) {
        button.addEventListener("click", e => {
            calculate()
        })
    }
    //operators
    else {
        button.addEventListener("click", e => {
            //e.currentTarget.textContent
            writeOperator(e.currentTarget.textContent)
        })
    }
})

document.addEventListener("keydown", e => {
    //numbers and dots
    if(!isNaN(parseFloat(e.key)) || e.key === ".") {
        writeNumberAndDot(e.key)
    }
    //operators
    else if(e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
        writeOperator(e.key)
    }
    //enter
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

//backspace shouldnt clear the result
