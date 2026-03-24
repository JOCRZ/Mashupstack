package Lab39.homework;

public class SmallShop {
	
	public static void main(String[] args) {
		
		String item = "Soap";
		int quantity = 4;
		Double unit_price = 18.75;
		Double price = unit_price * quantity;
		
		System.out.println("Small Shop Bill");
		System.out.println("________________");
		System.out.println("Item  *  Quantity  = Price");
		System.out.printf("%s        %d        %f",item,quantity,price);
				
	}

}