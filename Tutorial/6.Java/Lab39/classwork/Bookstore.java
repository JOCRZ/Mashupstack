package Lab39.classwork;

public class Bookstore {
	
	public static void main(String[] args) {
		
	 int price = 275;
	 int quantity = 3;
	 int discount = 10;
	 
	 double total = (double)(quantity * price);
	 double discountDecimal = (double) discount/100;
	 double savings = total * discountDecimal;
	 double finallBill = total - savings;
	 
	 System.out.println("Book Store Bill");
	 System.out.println("________________");
	 System.out.println("Quantity × Price");
	 System.out.printf("   %d        %d",quantity,price);
	 System.out.println("");
	 System.out.printf("Total %f",total);
	 System.out.println("");
	 System.out.println("Discount 10%");
	 System.out.println("________________");
	 System.out.printf("Grand Total %f",finallBill);
	 
	 
	} 
}
