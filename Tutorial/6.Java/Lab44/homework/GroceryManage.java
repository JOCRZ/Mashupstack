
import java.util.Scanner;

public class GroceryManage {
	
	static class Bill {
		public int cost (int[] price, int[] quantity) {
			
			int sum = 0;
			
			for (int i=0; i < 5; i++) {
				
				sum += (price[i] * quantity[i]);
			}
			
			return sum;
		}
		
	}
	
	
	
	public static void main(String[] args) {
		
		Scanner input = new Scanner(System.in);
		
		// constant items and price
		String items[] = {"Rice", "Sugar", "Oil", "Soap", "Milk"};
		int price[] = {50, 40, 100, 25, 30};
		
		// to display available products
		System.out.println("Available Products to Purchase \n");
		
		for ( int p = 0; p < 5; p++) {
			
			System.out.printf("%s  %dRs \n",items[p],price[p]);
		}
		
		// getting quantity from user 
		 int[] quantity = new int[5];
		
		System.out.println();
		System.out.println("Enter quantity");
		for ( int q = 0; q < 5; q++) {
			
			System.out.printf("%s  quantity:",items[q]);
			quantity[q] = input.nextInt();
			System.out.println();
			
		}
		
		Bill item = new Bill();
		System.out.printf("Total %d Rs",item.cost(price,quantity));
		
		input.close();
	}
}
