package Exam.Q1;

import java.util.Scanner;

class Shape{
	void show(int n) {

		for (int i = 1; i <= n; i++) {
			for(int j = 1; j <= i; j++) {
				System.out.print("*" + "");
			}
			System.out.println();
		}
	}
	
}

public class Pattern {

		public static void main(String[] args) {
			
			Scanner input = new Scanner(System.in);
			System.out.println("Enter your value : ");
			int n = input.nextInt();
			
			Shape shape = new Shape();
			shape.show(n);
			input.close();
			
		}
}
