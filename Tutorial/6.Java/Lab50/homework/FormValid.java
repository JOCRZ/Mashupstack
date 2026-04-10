
import java.util.Scanner;
import java.util.regex.Pattern;

class Validation {

    void Check(String n, String m, String p) {

        
        Pattern namePattern = Pattern.compile("^[A-Z][a-zA-Z\\s]*$");
        Pattern mailPattern = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
        Pattern phonePattern = Pattern.compile("^\\d{10}$");

        boolean validName = namePattern.matcher(n).matches();
        boolean validMail = mailPattern.matcher(m).matches();
        boolean validPhone = phonePattern.matcher(p).matches();

        // Name Validation
        if (validName) {
            System.out.println("Valid name");
        } else {
            System.out.println("Not Valid - Name should start with a capital letter and contain only letters or spaces.");
        }

        // Email Validation
        if (validMail) {
            System.out.println("Valid Mail ID");
        } else {
            System.out.println("Invalid Mail ID - Must contain both '@' and '.' and should not start or end with them.");
        }

        // Phone Validation
        if (validPhone) {
            System.out.println("Valid Mobile number");
        } else {
            System.out.println("Invalid - Phone number must contain exactly 10 digits.");
        }
    }
}

public class FormValid {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.print("Enter User Name: ");
        String name = input.nextLine();

        System.out.print("Enter User Mail ID: ");
        String mail = input.nextLine();

        System.out.print("Enter Mobile number: ");
        String mob = input.nextLine();

        Validation form = new Validation();
        form.Check(name, mail, mob);

        input.close();
    }
}