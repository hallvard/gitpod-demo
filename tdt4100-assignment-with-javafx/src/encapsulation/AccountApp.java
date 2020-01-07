package encapsulation;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class AccountApp extends Application{

	@Override
	public void start(final Stage primaryStage) throws Exception {
		primaryStage.setTitle("Account");
		Parent parent = FXMLLoader.load(AccountApp.class.getResource("Account.fxml"));
		primaryStage.setScene(new Scene(parent));
		primaryStage.show();
	}

	public static void main(final String[] args) {
		AccountApp.launch(args);
	}
}
