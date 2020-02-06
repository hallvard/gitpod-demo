# JavaFX calculator

This project contains a simple JavaFX calculator. There are text fields for the current operands and operator and
buttons for entering digits and operators.

As an example it highlights

- the use of **maven** for configuring the project
- **JavaFX** running on a virtual screen exposed through the `Preview` pane
- **FXML** for configuring the JavaFX GUI

## Configuration

The project is a Java maven project, driven by Eclipse JDT and the M2E maven integration,
packaged as a language server (see [Theia's LSP documentation](https://github.com/eclipse-theia/theia/wiki/LSP-and-Monaco-integration)).

## Usage

Compile with `mvn compile` in the Terminal and run with `mvn exec:java`(or combine them into `mvn compile exec:java`).

The app frame will open in a virtual screen that can be shown in the `Preview` pane by exposing port `6080` and then opening in `Preview`.
The `Open Ports` pane provides buttons for this. You may have to refresh the `Preview` pane.

The calculator has some empty buttons intended for the decimal point (`.`) `*`and `/` operators, add them!
This will require editing both the [FXML file](src/calc/Calc.fxml) and the [controller](src/calc/CalcController.java).

Try to add the power (`^`) operator, too!
