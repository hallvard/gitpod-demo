package calc;

import java.util.function.BinaryOperator;

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
        if (model.operand1 != null && model.operator == null) {
            throw new IllegalStateException("cannot specify operand 2 before the operator");
        }
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
        model.operandString = "";
        updateView();
    }

    private BinaryOperator<Double> getBinaryOperator(String operatorString) {
    	switch (operatorString) {
    	case "+": return (n1, n2) -> n1 + n2;
    	case "-": return (n1, n2) -> n1 - n2;
        default: return null;
        }
    }

    @FXML
    private void compute() {
        BinaryOperator<Double> binaryOperator = getBinaryOperator(model.operator);
        if (binaryOperator == null) {
            throw new IllegalStateException("Unknown operator: " + model.operator);
        }
        if (model.operand2 == null) {
            model.operand2 = getOperand(model.operandString);
            model.operandString = "";
        }
        model.operand1 = binaryOperator.apply(model.operand1, model.operand2);
        model.operator = null;
        model.operand2 = null;
        updateView();
    }
}