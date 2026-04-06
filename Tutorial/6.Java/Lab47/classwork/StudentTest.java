

class Student {
    private String name;
    private int rollno;
    private int percentage;

    // Setter method
    public void setDetails(String n, int roll, int perc) {
        this.name = n;
        this.rollno = roll;
        this.percentage = perc;
    }

    // Getter method
    public void getDetails() {
        System.out.printf("Student %s roll number %d percentage %d%n",
                name, rollno, percentage);
    }
}

public class StudentTest {

    public static void main(String[] args) {

        Student stud1 = new Student();
        stud1.setDetails("Akhil", 123, 50);
        stud1.getDetails();
    }
}