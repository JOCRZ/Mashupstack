public class GradeReport {
	
		public static void main(String[] args) {
			
			int marks[] = {78, 82, 91, 65, 34};
			float avg, sum = 0;
			int count = marks.length;
			
			
			for (int sub : marks) {
				
				sum += sub;
				
			}
			
			avg = sum/ count;
			
			if (avg < 35) {
				
				System.out.println("Failed");
			}
			else if (avg > 90) {
				System.out.println("Grade A");
			}
			else if (avg >= 75 && avg <= 89) {
				System.out.println("Grade B");
			}
			else if (avg >= 60 && avg <= 74) {
				System.out.println("Grade C");
			}
			else {
				System.out.println("Grade D");
			}
			
		}
} 
       