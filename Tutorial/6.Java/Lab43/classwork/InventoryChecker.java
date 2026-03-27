
public class InventoryChecker {
     public static void main(String[] args) {
		 
		 int arr[] = {20,15,30,0,25};
		 
		 for (int i : arr) {
			 
			 if (i == 0) {
				 
				 System.out.println("Out of Stock");
				 break;
			 }
			 else {
				 
				 if (i < 50) {
					 System.out.println("Low Stock");
				 }
				 else if (i >= 50 && i <= 100) {
					 System.out.println("Moderate Stock");
				 }
				 else {
					 System.out.println("Good Stock");
				 }
			 }
		 }
	 }
}
