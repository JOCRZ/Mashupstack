
class Course {

    static final String coursecreator = "CodeMentor Academy";

 
    String name;
    int duration;
    int studentCount;
    static int totalStudents = 0;

    // Parameterized constructor
    Course(String n, int d, int s) {
        this.name = n;
        this.duration = d;
        this.studentCount = s;

        totalStudents += s;
    }


    void show() {
        System.out.printf(
            "Course: %s | Duration: %d weeks | Students: %d | Creator: %s%n",
            name, duration, studentCount, coursecreator
        );
    }

    static class Platform {
        static void display() {
            System.out.println("Courses are hosted on CodeMentor");
        }
    }
}


public class CourseTest {

    public static void main(String[] args) {

        Course course1 = new Course("Java", 4, 100);
        Course course2 = new Course("Python", 6, 150);

        course1.show();
        course2.show();

        System.out.printf("Total students enrolled: %d%n", Course.totalStudents);

        Course.Platform.display();
    }
}
