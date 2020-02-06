# React calculator

This project contains a simple React calculator, similar to the [JavaFX calculator](../javafx-calculator/README.md).
There are text fields for the current operands and operator and buttons for entering digits and operators.

As an example it highlights

- the use of **npm** for configuring the project
- **typescript** and **react** for making a web app shown in the `Preview` pane
- running a development server with instant refresh of app

The implementation is a straight-forward port of the [JavaFX app](../javafx-calculator/README.md), so may not be according to best typescript and react practice.
It does, however, show important similarities between **JavaFX+FXML** and **react**:

- explicit model of app UI state: `CalcState` in [CalcComponent.tsx](src/CalcComponent.tsx) and `CalcModel` in [CalcController.java](../javafx-calculator/src/calc/CalcController.java)
- markup for UI structure and contents: `render` method in [CalcComponent.tsx](src/CalcComponent.tsx) and [Calc.fxml](../javafx-calculator/src/calc/Calc.fxml)
- controller class for linking state and UI and implementing its behavior: [CalcComponent.tsx](src/CalcComponent.tsx) and [CalcController.java](../javafx-calculator/src/calc/CalcController.java)
- a similar update cycle, where events trigger state updates and re-rendering og UI

## Configuration

The project is an npm project, initially configured with `npx create-react-app react-calculator --template typescript`.
See [original README](create-react-app.md) for details. 

## Usage

Compile and build with `yarn build` in the Terminal.

Run a development server for the app on port `3000` with `yarn start`. Open the `Open Ports` with `View > Open Ports`in the menubar
and select `Expose`and then `Open Preview` or open another browser tab or window.

Similar to the [JavaFX counterpart](../javafx-calculator/README.md), the implementation isn't complete:

- The display of the operands and the operator doesn't work properly.
- The calculator has some empty buttons intended for the decimal point (`.`) `*`and `/` operators, add them!

This will require editing [CalcComponent.tsx](src/CalcComponent.tsx).

Try to add the power (`^`) operator, too!
