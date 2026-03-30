
import java.util.Scanner;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class AttendanceSystem {

    // class to find average
    static class FindAverage {
        public int avg(int[] arr) {

            int sum = 0;                 
            int count = arr.length;

            for (int i : arr) {           
                sum += i;
            }

            if (count == 0) return 0;    

            return sum / count;
        }
    }

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.print("Enter number of Students: ");
        int count = input.nextInt();
        input.nextLine(); 

        int[] marks = new int[count];
        String[] names = new String[count];

        // Input names
        System.out.println("Enter students Names:");
        for (int i = 0; i < count; i++) {
            names[i] = input.nextLine();
        }

        // Input marks
        System.out.println("Enter students Marks:");
        for (int i = 0; i < count; i++) {
            marks[i] = input.nextInt();
        }

        // Display result
        for (int i = 0; i < count; i++) {

            if (marks[i] < 35) {
                System.out.printf("Student %s needs improvement\n", names[i]);
            } else {
                System.out.printf("Student %s and marks is %d\n", names[i], marks[i]);
            }
        }

        // Average calculation
        FindAverage value = new FindAverage();
        System.out.println("Average Marks: " + value.avg(marks));
        
        LocalDateTime currDateTime = LocalDateTime.now();
        DateTimeFormatter formatDateTime = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        String formattedDate = currDateTime.format(formatDateTime);
        System.out.println(formattedDate); 

        input.close();
    }
}