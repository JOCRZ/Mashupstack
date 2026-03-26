
import java.util.Scanner;

public class LoginValidation {

		public static void main(String[] args) {
			
			Scanner input = new Scanner(System.in);
			
			String apass = "1234";
			String spass = "1111";
		
			System.out.println("User code A for Admin, S for Student and G for Guest");
			System.out.println("Enter user code: ");
			String user = input.nextLine();
			
			if (user.equals("A") || user.equals("S")) {
				
				System.out.println("Enter Password: ");
				String pass = input.nextLine();
				
				if (pass.equals(apass)) {
					System.out.println("Welcome Admin. Full access granted and role ID is 1.");
				}
				else if (pass.equals(spass)) {
					System.out.println("Welcome Student. Limited access granted and role ID is 2.");
				}
				else {
					System.out.println("Enter correct password");
				}
			}
			else if (user.equals("G")) {
				System.out.println("Welcome Guest. View only access granted and role ID is 3.");
			}
			else {
				System.out.println("Enter correct code");
			}
			
			input.close();
		    
		}
}
