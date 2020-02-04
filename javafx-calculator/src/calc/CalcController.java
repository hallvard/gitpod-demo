package calc;

import java.util.function.BinaryOperator;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;

public class CalcController {

    @FXML TextField operand1Field;
    @FXML TextField operatorField;
    @FXML TextField operand2Field;

    @FXML
    private void append(ActionEvent actionEvent) {
    	String label = ((Button) actionEvent.getSource()).getText();
    	TextField operandField = operand2Field;
    	if (operatorField.getText().equals("")) {
    		operandField = operand1Field;
    	}
		operandField.setText(operandField.getText() + label);
    }
    
    @FXML
    private void op(ActionEvent actionEvent) {
    	String label = ((Button) actionEvent.getSource()).getText();
    	operatorField.setText(label);
    }

    private void compute(BinaryOperator<Double> op) {
    	double operand1 = Double.valueOf(operand1Field.getText());
    	double operand2 = Double.valueOf(operand2Field.getText());
    	double result = op.apply(operand1, operand2);
    	operand1Field.setText(String.valueOf(result));
    	operatorField.setText("");
    	operand2Field.setText("");
    }
    
    @FXML
    private void compute() {
    	switch (operatorField.getText()) {
    	case "+": compute((n1, n2) -> n1 + n2); break;
    	case "-": compute((n1, n2) -> n1 - n2); break;
    	case "*": compute((n1, n2) -> n1 * n2); break;
    	case "/": compute((n1, n2) -> n1 / n2); break;
    	}
    }
}