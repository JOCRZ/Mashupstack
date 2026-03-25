import java.util.Scanner;

public class LoginCheck {

	public static void main(String[] args) {
		
			Scanner input = new Scanner(System.in);
			
			String username = "admin";
			String password = "java123";
			
			System.out.println("Enter your credential");
			
			System.out.print("Enter User Name: ");
			String name = input.nextLine();
			
			System.out.print("Enter User Password: ");
			String pass = input.nextLine();
			
			
			if (username.equals(name) && password.equals(pass)) {
				
				System.out.println("Login Successful");
			}else {
				
				System.out.println("Access Denied");
			}
	}
}

