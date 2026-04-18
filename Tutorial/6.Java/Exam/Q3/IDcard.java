package Exam.Q3;

import java.util.Scanner;

class Details{
	
    
    int[]    ids   = {1, 2, 3};
    String[] names = {"rajesh", "rahul", "sruthi"};

  
    void show(int id) {
    	
        boolean found = false;

        for (int i = 0; i < ids.length; i++) {
            if (ids[i] == id) {
                System.out.println("Student Name: " + names[i]);
                found = true;
                break;
            }
        }

        if (!found) {
            System.out.println("No student found with ID: " + id);
        }
    	
    }


}

public class IDcard {

    public static void main(String[] args) {

    	  Scanner input = new Scanner(System.in);

    	  System.out.print("Enter student ID: ");
    	  int id = input.nextInt();
    	  
    	  Details details = new Details();
    	  details.show(id);


    	  input.close();
    }
}
