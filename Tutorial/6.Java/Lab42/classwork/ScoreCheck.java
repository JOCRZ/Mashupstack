
public class ScoreCheck {
 
	public static void main(String[] args) {
		
		
		int score[] = {79,90,65,30,84};
		
		for (int i = 0; i < score.length; i++) {
			
			if (score[i] >= 90) {
				
				System.out.println("Excellent");
			}
			else if(score[i] >= 75 && score[i] <= 89 ) {
				System.out.println("Good");
			}
			else if(score[i] >= 50 && score[i] <= 74) {
				System.out.println("Average");
			}
			else if(score[i] < 50) {
				System.out.println("Fail");
			}
			else {
				System.out.println("Enter valid input");
			}
		
		}
		
	}
}
