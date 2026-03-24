package profile;

import java.util.Scanner;

public class Userinput {

 public String get(){

    Scanner input = new Scanner(System.in);

    System.out.println("User Profile Signup");
    System.out.print("Enter Your Name: ");
    String name = input.nextLine();

    return name;
 }
    
}
