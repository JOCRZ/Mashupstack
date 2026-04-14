
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

// Q6 Java Program to Swap Two Numbers
class Swapper {

    void swap(int g, int h) {

        System.out.printf("Before swap %d and %d%n", g, h);

        int temp = g;
        g = h;
        h = temp;

        System.out.printf("After swap %d and %d%n", g, h);
    }
}

// Q7 Java Program to Check Whether a Number is Even or Odd
class EOcheck{
	void checkEO(int i) {
		if ( i %2 == 0) {
			System.out.println("Even Number");
		}
		else {
			System.out.println("Odd Number");
		}
	}
}

//Q8 Java Program to Check Whether an Alphabet is Vowel or Consonant
class Sound {
 void vowel(char j) {

     char vowels[] = new char[5];
     vowels[0] = 'a';
     vowels[1] = 'e';
     vowels[2] = 'i';
     vowels[3] = 'o';
     vowels[4] = 'u';

     boolean found = false;

     for (int k = 0; k < vowels.length; k++) {
         if (vowels[k] == j) {
             found = true;
             break;
         }
     }

     if (found) {
         System.out.println("Is Vowel");
     } else {
         System.out.println("Not Vowel");
     }
 }
}

// Q9 Java Program to Find the Largest Among Three Numbers
class Largest{
	void large(int l, int m, int n) {
		if ( (l > m) && (l > n)) {
			System.out.printf("%d is the greatest among",l);
		}
		else if ( (m > l) && (m > n)) {
			System.out.printf("%d is the greatest among",m);
		}
		else {
			System.out.printf("%d is the greates among", n);
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
		
		// Question 6
		/*
        Swapper num = new Swapper();
        System.out.println("Enter numbers to swap : ");
        int g = input.nextInt();
        int h = input.nextInt();
        num.swap(g, h);
		*/
		
		// Question 7 
		/*
		EOcheck num = new EOcheck();
		System.out.println("Enter integer : ");
		int i = input.nextInt();
		num.checkEO(i);
		*/
		
		// Question 8
		/*
		Sound txt = new Sound();
		System.out.println("Enter the character : ");
		char j = input.next().charAt(0);
		txt.vowel(j);
		*/
		
		// Question 9
		Largest num = new Largest();
		System.out.println("Enter 3 number to find largest among : ");
		int l = input.nextInt();
		int m = input.nextInt();
		int n = input.nextInt();
		num.large(l, m, n);
		
		
		input.close();
	}
}