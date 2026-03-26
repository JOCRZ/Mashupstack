
public class StoreTrack {
    public static void main(String[] args) {
       
        int[][] salesData = {
            {120, 80, 50},  
            {100, 90, 45},  
            {150, 70, 60},  
            {130, 85, 55},  
            {110, 95, 40}  
        };

        String[] productNames = {"Product A", "Product B", "Product C"};

        System.out.println("--- Weekly Sales Report ---");

       
        for (int col = 0; col < 3; col++) {
            int totalSales = 0;

          
            for (int row = 0; row < 5; row++) {
                totalSales += salesData[row][col];
            }

           
            String performance;
            if (totalSales >= 500) {
                performance = "Target Achieved";
            } else if (totalSales >= 300) {
                performance = "Average Performance";
            } else {
                performance = "Needs Improvement";
            }

           
            System.out.println(productNames[col] + ": Total Sales = " + totalSales + " | " + performance);
        }
    }
}