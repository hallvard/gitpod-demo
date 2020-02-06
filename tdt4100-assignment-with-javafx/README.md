# Account exercise

This project contains the [Account exercise](src/encapsulation/Account.md) used in the course
[Object-oriented programming (with Java)](https://www.ntnu.edu/studies/courses/TDT4100#tab=omEmnet) - TDT4100 at NTNU.

As an example it highlights

- the use of **maven** for configuring the project
- **JUnit** for testing the student's solution and
- **JavaFX** for showing how it can be used in an app

Note that the exercise description is in Norwegian. It should, however, be difficult to auto-translate it using a service or browser plugin.

## Configuration

The project is a Java maven project, driven by Eclipse JDT and the M2E maven integration,
packaged as a language server (see [Theia's LSP documentation](https://github.com/eclipse-theia/theia/wiki/LSP-and-Monaco-integration)).

## Usage

Complete the [Account class](src/encapsulation/Account.java) skeleton according to the [specification](src/encapsulation/Account.md).

Compile with `mvn compile` in the Terminal. To compile *and* run, insert `compile` after `mvn` in the commands described below.

Run (the main method of) the [Account class](src/encapsulation/Account.java) with `mvn -PAccount exec:java` in the Terminal or invoke `Terminal > Run Test Task... > run Account` from the menubar.

Run the tests in the [AccountTest class](src/encapsulation/AccountTest.java) with `mvn -PAccount test` in the Terminal or invoke `Terminal > Run Test Task... > test Account` from the menubar.
Note that the tests are written using JUnit 3, so the built-in support for running JUnit testing won't work.

To run the [AccountApp class](src/encapsulation/AccountApp.java) with `mvn -PAccountApp exec:java` in the Terminal or invoke `Terminal > Run Test Task... > run AccountApp` from the menubar.
The app frame will open in a virtual screen that can be shown in the `Preview` pane by exposing port `6080` and then opening in `Preview`.
The `Open Ports` pane provides buttons for this. You may have to refresh the `Preview` pane to the app frame.
