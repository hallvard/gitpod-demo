package calc;

import java.util.function.BinaryOperator;
import java.util.function.UnaryOperator;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;

public class CalcController {

    private static class CalcModel {
        Double operand1 = null;
        String operator = null;
        Double operand2 = null;
        String operandString = "";

        @Override
        public String toString() {
            return operand1 + " " + operator + " " + operand2 + " (" + operandString + ")";
        }
    }

    private CalcModel model = new CalcModel();

    @FXML TextField operand1Field;
    @FXML TextField operatorField;
    @FXML TextField operand2Field;

    @FXML
    public void initialize() {
        updateView();
    }

    private void updateView() {
        if (model.operand1 != null) {
            operand1Field.setText(String.valueOf(model.operand1));
            if (model.operator != null) {
                operatorField.setText(model.operator);
                if (model.operand2 != null) {
                    operand2Field.setText(String.valueOf(model.operand2));
                } else {
                    operand2Field.setText(model.operandString);
                }
            } else {
                operatorField.setText("");
                operand2Field.setText("");
            }
        } else {
            operand1Field.setText(model.operandString);
            operatorField.setText("");
            operand2Field.setText("");
        }
        System.out.println(model);
    }

    private String getActionEventString(ActionEvent actionEvent) {
        return ((Button) actionEvent.getSource()).getText();
    }

    @FXML
    private void setOperand(ActionEvent actionEvent) {
        double operand = getOperand(getActionEventString(actionEvent));
        if (model.operator == null) {
            model.operand1 = operand;
        } else {
            model.operand2 = operand;
        }
        updateView();
    }

    @FXML
    private void appendToOperandString(ActionEvent actionEvent) {
        String label = getActionEventString(actionEvent);
        model.operandString += label;
        updateView();
    }

    private double getOperand(String operandString) {
        return Double.valueOf(operandString);
    }
    
    @FXML
    private void setOperator(ActionEvent actionEvent) {
        String operator = getActionEventString(actionEvent);
        if (model.operand1 == null) {
            model.operand1 = getOperand(model.operandString);
        }
        if (model.operator != null) {
            compute();
        }
        model.operator = operator;
        if (getUnaryOperator(operator) != null) {
            compute();
        }
        model.operandString = "";
        updateView();
    }

    private BinaryOperator<Double> getBinaryOperator(String operatorString) {
    	switch (operatorString) {
    	case "+": return (n1, n2) -> n1 + n2;
    	case "-": return (n1, n2) -> n1 - n2;
    	case "*": return (n1, n2) -> n1 * n2;
    	case "/": return (n1, n2) -> n1 / n2;
    	case "^": return (n1, n2) -> Math.pow(n1, n2);
        default: return null;
        }
    }

    private UnaryOperator<Double> getUnaryOperator(String operatorString) {
    	switch (operatorString) {
        case "sqrt": return n -> Math.sqrt(n);
        default: return null;
        }
    }

    @FXML
    private void compute() {
        UnaryOperator<Double> unaryOperator = getUnaryOperator(model.operator);
        if (unaryOperator != null) {
            if (model.operand1 == null) {
                model.operand1 = getOperand(model.operandString);
                model.operandString = "";
            }
            model.operand1 = unaryOperator.apply(model.operand1);
        } else {
            BinaryOperator<Double> binaryOperator = getBinaryOperator(model.operator);
            if (binaryOperator != null) {
                if (model.operand2 == null) {
                    model.operand2 = getOperand(model.operandString);
                    model.operandString = "";
                }
                model.operand1 = binaryOperator.apply(model.operand1, model.operand2);
                model.operator = null;
                model.operand2 = null;
            } else {
                throw new IllegalStateException("Unknown operator: " + model.operator);
            }
        }
        updateView();
    }
}