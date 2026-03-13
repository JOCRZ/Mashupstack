
import java.util.Scanner;


public class Main {
    
    public static void main(String[] args){
        
        Scanner input = new Scanner(System.in);
        
        System.out.print("Enter Your Name: ");
        String name = input.nextLine();
        
        System.out.print("Enter Your Age: ");
        int age = input.nextInt();
        
        System.out.print("What is your GPA: ");
        double gpa = input.nextDouble();
        
        System.out.print("Are you a student? (true/false): ");
        boolean isStudent = input.nextBoolean();
        
        
        System.out.println(name + " is " + age + " years old" + " and your GPA is " + gpa);
        
        if(isStudent){
            System.out.println("You are enrolled");
        }
        else{
            System.out.println("You are not enrolled");
        }
        
        input.close();
    }
}