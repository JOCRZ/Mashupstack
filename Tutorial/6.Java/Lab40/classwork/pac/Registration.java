package pac;
import java.util.Scanner;

public class Registration {
    
    	public static void greet() {
		
		Scanner input = new Scanner(System.in); // created scanner object to access class property
		
		// Getting user input
		System.out.println("______ Registration Form ______");
		System.out.println("Enter Registration Details");
		
		System.out.print("Enter Name: ");
		String name = input.nextLine();
		
		System.out.print("Enter Age: ");
		int age = input.nextInt();
		
		// Showing user inputed data
		System.out.println("");
		System.out.println("User Details");
		System.out.printf("User name is %s and Age is %d",name,age);
		
		input.close();
		
	}
	
}
