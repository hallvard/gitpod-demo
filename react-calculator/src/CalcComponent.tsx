import React from 'react';

interface CalcProps {
}

class CalcState {

    constructor(
        public operand1 : number | undefined,
        public operator : string | undefined,
        public operand2 : number | undefined,
        public operandString : string = "") {
    }

    public toString = () : string => {
        return this.operand1 + " " + this.operator + " " + this.operand2 + " (" + this.operandString + ")";
    }
}

type binaryOperator = (n1 : number, n2 : number) => number;

export class CalcComponent extends React.Component<CalcProps, CalcState>  {

    model : CalcState = new CalcState(undefined, undefined, undefined);

    state : CalcState = this.model;

    updateView() {
        this.setState(new CalcState(this.model.operand1, this.model.operator, this.model.operand2, this.model.operandString));
    }

    setOperand(operand : number) {
        if (this.model.operator === undefined) {
            this.model.operand1 = operand;
        } else {
            this.model.operand2 = operand;
        }
        this.updateView();
    }

    appendToOperandString(label : string) {
        if (this.model.operand1 && (! this.model.operator)) {
            throw new Error("cannot specify operand 2 before the operator");
        }
        this.model.operandString += label;
        this.updateView();
    }

    getOperand(operandString : string) : number {
        return Number.parseFloat(operandString);
    }
    
    setOperator(operator : string) {
        if (this.model.operand1 == null) {
            this.model.operand1 = this.getOperand(this.model.operandString);
        }
        if (this.model.operator) {
            this.compute();
        }
        this.model.operator = operator;
        this.model.operandString = "";
        this.updateView();

    }

    getBinaryOperator(operatorString : string | undefined) : binaryOperator | undefined{
    	switch (operatorString) {
    	case "+": return (n1, n2) => n1 + n2;
    	case "-": return (n1, n2) => n1 - n2;
        default: return undefined;
        }
    }

    compute() {
        var binaryOperator = this.getBinaryOperator(this.model.operator);
        if (! binaryOperator) {
            throw new Error("Unknown operator: " + this.model.operator);
        }
        if (this.model.operand2 == null) {
            this.model.operand2 = this.getOperand(this.model.operandString);
            this.model.operandString = "";
        }
        this.model.operand1 = binaryOperator(this.model.operand1 as number, this.model.operand2);
        this.model.operator = undefined;
        this.model.operand2 = undefined;
        this.updateView();
    }

    render() {
        var appendToOperandString = (event : React.MouseEvent<HTMLButtonElement>) => {
            this.appendToOperandString(event.currentTarget.value);
        };
        var setOperator = (event : React.MouseEvent<HTMLButtonElement>) => {
            console.log("setOperator: " + event.currentTarget.value);
            this.setOperator(event.currentTarget.value);
        };
        var compute = (_event : React.MouseEvent<HTMLButtonElement>) => {
            this.compute();
        };

        return (
            <div className="App">
                <table>
                    <!-- Fix the display of the operands, so the state displays correctly -->
                    <!-- When operand1 is undefined, the operandString should be shown instead -->
                    <tr><td colSpan={4}>{ this.state.operand1 }</td></tr>
                    <tr><td colSpan={4}>{ this.state.operator }</td></tr>
                    <!-- When operand2 is undefined, something else should be shown, but what? -->
                    <tr><td colSpan={4}>{ this.state.operand2 }</td></tr>
                    <tr>
                        <button value="7" onClick={ appendToOperandString }>7</button>
                        <button value="8" onClick={ appendToOperandString }>8</button>
                        <button value="9" onClick={ appendToOperandString }>9</button>
                        <button value="+" onClick={ setOperator }>+</button>
                    </tr>
                    <tr>
                        <button value="4" onClick={ appendToOperandString }>4</button>
                        <button value="5" onClick={ appendToOperandString }>5</button>
                        <button value="6" onClick={ appendToOperandString }>6</button>
                        <button value="-" onClick={ setOperator }>-</button>
                    </tr>
                    <tr>
                        <button value="1" onClick={ appendToOperandString }>1</button>
                        <button value="2" onClick={ appendToOperandString }>2</button>
                        <button value="3" onClick={ appendToOperandString }>3</button>
                        <button> </button>
                    </tr>
                    <tr>
                        <button value="0" onClick={ appendToOperandString }>0</button>
                        <button> </button>
                        <button value="=" onClick={ compute }>=</button>
                        <button> </button>
                    </tr>
                </table>
            </div>
        );
    }
}
