
import java.util.Scanner;

// Q1 Java Program to Print an Integer (Entered by the User)
class PrintInteger{
	
	void pinteger(int x) {
		System.out.printf("Your Integer is : %d",x);
	}
}

// Q2 Java Program to Add Two Integers
class SumInt{
	int add(int a, int b) { return a + b ;}
}

// Q3 Java Program to Multiply two Floating Point Numbers
class SumFloat{
	double add(double c, double d) { return c + d ;}
}

// Q4 Java Program to Find ASCII Value of a character
class FindAscii{
	int value(char y) {
		int val = y;
		return val;
	}
}

// Q5 Java Program to Compute Quotient and Remainder
class QuoRem{
	void divide(int e, int f) {
		
		if (e == 0) {
			System.out.println("Zero is not divisible");
		}
		else {
		int quotient =  f / e;
		int reminder = f % e;
		System.out.printf("The quotient is %d and reminder is %d",quotient,reminder);
		}
	}
}

public class Programiz {

	public static void main(String[] args) {
		
		Scanner input = new Scanner(System.in);
		
		// Question 1
		/*
		PrintInteger num = new PrintInteger();
		System.out.println("Enter Integer value : ");
		int x = input.nextInt();
		num.pinteger(x);
		*/
		
		// Question 2
		/*
		SumInt num = new SumInt();
		System.out.println("Enter two Integers : ");
		int a = input.nextInt();
		int b = input.nextInt();b
		System.out.printf("The sum of two number %d",num.add(a, b));
		*/
		
		// Question 3
		/*
		SumFloat num = new SumFloat();
		System.out.println("Enter two floating number : ");
		double c = input.nextDouble();
		double d = input.nextDouble();
		System.out.printf("The Sum of two number %f",num.add(c, d));
		*/
		
		// Question 4
		/*
		FindAscii num = new FindAscii();
		System.out.println("Enter a single character to find out it's ASCII value : ");
		char y = input.next().charAt(0);
		System.out.printf("ASCII Value of %d",num.value(y));
		*/
		
		// Question 5
		/*
		QuoRem num = new QuoRem();
		System.out.print("Enter dividend :");
		int f = input.nextInt();
		System.out.print("Enter disvisor :");
		int e = input.nextInt();
		num.divide(f,e);
		*/ 
		
		
		
		input.close();
		
	}
}
