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

type unaryOperator = (n : number) => number;

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
        if (this.getUnaryOperator(operator)) {
            this.compute();
        }
        this.model.operandString = "";
        this.updateView();

    }

    getBinaryOperator(operatorString : string | undefined) : binaryOperator | undefined{
    	switch (operatorString) {
    	case "+": return (n1, n2) => n1 + n2;
    	case "-": return (n1, n2) => n1 - n2;
    	case "*": return (n1, n2) => n1 * n2;
    	case "/": return (n1, n2) => n1 / n2;
    	case "^": return (n1, n2) => Math.pow(n1, n2);
        default: return undefined;
        }
    }

    getUnaryOperator(operatorString : string | undefined) : unaryOperator | undefined {
    	switch (operatorString) {
        case "sqrt": return n => Math.sqrt(n);
        default: return undefined;
        }
    }

    compute() {
        var unaryOperator = this.getUnaryOperator(this.state.operator);
        if (unaryOperator) {
            if (this.model.operand1 == null) {
                this.model.operand1 = this.getOperand(this.model.operandString);
                this.model.operandString = "";
            }
            this.model.operand1 = unaryOperator(this.model.operand1);
        } else {
            var binaryOperator = this.getBinaryOperator(this.model.operator);
            if (binaryOperator) {
                if (this.model.operand2 == null) {
                    this.model.operand2 = this.getOperand(this.model.operandString);
                    this.model.operandString = "";
                }
                this.model.operand1 = binaryOperator(this.model.operand1 as number, this.model.operand2);
                this.model.operator = undefined;
                this.model.operand2 = undefined;
            } else {
                throw new Error("Unknown operator: " + this.model.operator);
            }
        }
        this.updateView();
    }

    render() {
        var appendToOperandString = (event : React.MouseEvent<HTMLButtonElement>) => {
            console.log("appendToOperandString: " + event.currentTarget.value);
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
                    <tr><td colSpan={4}>{ this.state.operand1 ? this.state.operand1 : this.state.operandString }</td></tr>
                    <tr><td colSpan={4}>{ this.state.operator ? this.state.operator : "" }</td></tr>
                    <tr><td colSpan={4}>{ this.state.operand2 ? this.state.operand2 : (this.state.operand1 ? this.state.operandString : "") }</td></tr>
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
                        <button value="*" onClick={ setOperator }>*</button>
                    </tr>
                    <tr>
                        <button value="0" onClick={ appendToOperandString }>0</button>
                        <button value="." onClick={ appendToOperandString }>.</button>
                        <button value="=" onClick={ compute }>=</button>
                        <button value="/" onClick={ setOperator }>/</button>
                    </tr>
                </table>
            </div>
        );
    }
}
