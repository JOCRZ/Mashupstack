

class Course{
	
	final String trainingCenter = "MashupStack";
	String name;
	int duration;
	static int coursecount = 0;
	
	// Default
	Course(){
		 name = "Full Stack Development";
		 duration = 6;
		 coursecount ++;
		 System.out.println("Default Construtor is called");
	}
	
	// Parameterized
	Course(String n,int d){
		this.name = n;
		this.duration = d;
		coursecount ++;
		System.out.println("Parameterized Constutor is called");
	}
	
	void show() {
		System.out.printf("Course: %s and Duration: %d",name,duration);
	}
	
	class CourseMaterial{
		void display() {
			System.out.println("Materal Provided for the Course");
		}
	}
}


public class TrainingCenter {

	public static void main(String[] args) {
		
		Course s1 = new Course();
		System.out.printf("Course: %s and Duration: %d",s1.name,s1.duration);
		
		System.out.println();
		Course s2 = new Course("Data Analyst",3);
		s2.show();
		System.out.println();
		System.out.printf("Course count: %d",Course.coursecount);
		System.out.println();
		
		Course outter = new Course();
		Course.CourseMaterial material = outter.new CourseMaterial();
		material.display();
	}
}
