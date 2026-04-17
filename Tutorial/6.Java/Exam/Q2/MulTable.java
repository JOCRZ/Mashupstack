package Exam.Q2;

import java.util.Scanner;

class Mul{
	
	void table(int x) {
		System.out.printf("Multiplication Table of Number %d\n",x);
		for (int i=1; i <= 10; i++) {
			int y ;
			y = x * i;
			System.out.printf("%d × %d = %d \n",i,x,y);
			
		}
	}
}
public class MulTable {

	public static void main(String[] args) {
		
		Scanner input = new Scanner(System.in);
		System.out.println("Enter your value : ");
		int x = input.nextInt();
		Mul value = new Mul();
		value.table(x);
		input.close();
		
	}
}
