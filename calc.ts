const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]")!;
const currentOperandTextElement = document.querySelector( "[data-current-operand]")!;


interface Calc {
  currentOperandTextElement: Element;
  previousOperandTextElement: Element;
  currentOperand: string;
  previousOperand: string;
  operation: string | undefined;
}

class Calculator implements Calc {
  currentOperandTextElement: Element;
  previousOperandTextElement: Element;
  currentOperand: any;
  previousOperand: any ="";
  operation: string | undefined;

  constructor(currentOperandTextElement: Element, previousOperandTextElement: Element) {
this.currentOperandTextElement = currentOperandTextElement;
this.previousOperandTextElement = previousOperandTextElement;
this.currentOperand = "";
  }

  appendNumber(number: string) {
    if(number == "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();

  }
  
  appendOperator(operator: string){
    if (this.currentOperand === "") return
    if (this.previousOperand !== "")
    {
      this.compute();
    }
    
    this.currentOperand += operator;
    this.previousOperand = this.currentOperand;
    this.operation = operator;
    this.currentOperand = "";
  }

  compute() {

    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
this.currentOperand = computation;
this.previousOperand = "";



  }

  display() {


  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0,-1);
  }
}


  const calculator =   new Calculator(currentOperandTextElement, previousOperandTextElement) ;



 numberButtons?.forEach( button => {
    button.addEventListener("click", ()=> {
        calculator.appendNumber(button.innerHTML) ;
        calculator.display();
    })
})

operationButtons?.forEach( button => {
    button.addEventListener("click", ()=> {
        calculator.appendOperator(button.innerHTML) ;
        calculator.display();
    })
})

allClearButton?.addEventListener("click", ()=> {
    calculator.clear();
    calculator.display();
 
})

equalsButton?.addEventListener("click", ()=> {
  calculator.compute();
  calculator.display();

})

deleteButton?.addEventListener("click", ()=> {
  calculator.delete();
  calculator.display();

})