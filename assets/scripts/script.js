const prevOperationText = document.querySelector("#prev-operation");
const currOperationText = document.querySelector("#curr-operation");
const buttons = document.querySelectorAll("#btn-container button");

class Calculator {
    constructor(prevOperationText, currOperationText){
        this.prevOperationText = prevOperationText;
        this.currOperationText = currOperationText;
        this.currOperation = "";
    }

    addDigit(digit){
        // console.log(digit);
        if(digit === "." && this.currOperationText.innerText.includes(".")){
            return;
        }

        this.currOperation = digit;
        this.updateScreen();
    }

    processOperation(operation){

        if(this.currOperationText.innerText === "" && operation !== "C"){
            if(this.prevOperationText.innerText !== ""){
                this.changeOperation(operation);
            }
            return;
        }


        let operationValue;
        const previous = +this.prevOperationText.innerText.split(" ")[0];
        const current = +this.currOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperation();
                break;
            case "CE":
                this.processClearCurrOperation();
            break;
            case "C":
                this.processClearOperation()
            break;
            case "=":
                this.processEqualOperator()
            break;
            default:
                return;
        }

    }

    updateScreen(operationValue = null, 
        operation = null, 
        current = null, 
        previous = null){
        if(operationValue === null){
            this.currOperationText.innerText += this.currOperation;
        }else{
            if(previous === 0){
                operationValue = current;
            }
            this.prevOperationText.innerText = `${operationValue} ${operation}`;
            this.currOperationText.innerText = " ";
        }
    }

    changeOperation(operation){
        const mathOperations = ["*", "-", "+", "/"];

        if(!mathOperations.includes(operation)){
            return;
        }

        this.prevOperationText.innerText = this.prevOperationText.innerText.slice(0, -1) + operation;
    }

    processDelOperation(){
        this.currOperationText.innerText = this.currOperationText.innerText.slice(0, -1);
    }

    processClearCurrOperation(){
        this.currOperationText.innerText = "";
    }

    processClearOperation(){
        this.currOperationText.innerText = "";
        this.prevOperationText.innerText = "";
    }

    processEqualOperator(){
        const operation = prevOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}

const calc = new Calculator(prevOperationText, currOperationText);

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === "."){
            // console.log(value);
            calc.addDigit(value)
        }else {
            calc.processOperation(value)
        }
    });
});