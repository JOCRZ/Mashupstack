
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

		 for (int q = 0; q < 5; q++) {

		     while (true) {
		         try {
		             System.out.printf("%s quantity: ", items[q]);
		             quantity[q] = input.nextInt();
		             System.out.println();
		             break; 
		         } 
		         catch (Exception e) {
		             System.out.println("Invalid input! Please enter a number.");
		             input.nextLine(); 
		         }
		     }
		 }
		
		Bill item = new Bill();
		
		int total = item.cost(price,quantity);
		// Final Price = Original Price - (Original Price × Discount / 100)
		
		if (total >= 500) {
			
			int grandtotal = total - (( total * 10 ) / 100) ;
			System.out.printf("Total = %d \n after discount Grand Total %d Rs",total,grandtotal);
		}
		else {
			System.out.printf("Grand Total = %d Rs",total);
		}
		
		
		
		input.close();
	}
}
