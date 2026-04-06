

class Employee{
	
	private String name;
	private int id;
	private String department;
	private double salary;
	
	
	public void setDetails(String n, int i, String d, double s) {
		
		this.name = n;
		this.id = i;
		this.department = d;
		this.salary = s;
	}
	
	public void getDetails() {
		System.out.printf("Employee ID: %d ,Name: %s, Department: %s, Salary: %f",id,name,department,salary);
		System.out.println();
	}
}

public class HRsystem {
	
	public static void main(String[] args) {
		
		Employee Emp1 = new Employee();
		Employee Emp2 = new Employee();
		
		Emp1.setDetails("Milan",101,"Mechanical",1000000);
		Emp2.setDetails("Adrash",102,"BioMechanic",100000);
		
		Emp2.getDetails();
		Emp1.getDetails();
	}
}
