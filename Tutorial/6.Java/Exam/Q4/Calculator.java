package Exam.Q4;

import java.util.Scanner;

class Operation{
	
	void calculate(int x, char txt, int y) {
		
		switch (txt) {
		
		case '+' :
			System.out.printf("%d + %d = %d",x,y,x+y);
			break;
		case '-' :
			System.out.printf("%d - %d = %d",x,y,x-y);
			break;
		case '*' :
			System.out.printf("%d × %d = %d",x,y,x*y);
			break;
		case '/':
			System.out.printf("%d ÷ %d = %d",x,y,x/y);
			break;
		default:
			System.out.printf("Invalid Input");
			
		}
	}
}

public class Calculator {

	public static void main(String[] args) {
		
		Scanner input = new Scanner(System.in);
		System.out.println("Enter your Operand 1 : ");
		int x = input.nextInt();
		System.out.println("Enter your Operand 2 : ");
		int y = input.nextInt();
		System.out.println("Enter your Operator ( + , - , / , * )  : ");
		char txt = input.next().charAt(0);
		
		Operation op = new Operation();
		op.calculate(x,txt,y);
		
		input.close();
		
		
	}
}
