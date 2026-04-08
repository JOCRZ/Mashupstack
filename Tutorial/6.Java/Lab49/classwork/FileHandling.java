
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;

public class FileHandling {
 
	 public static void main(String[]  args) {
		 String path = System.getProperty("user.dir");
		 System.out.println(path);
		 
		 String data = "Java File Handling Practice";
		 
		 File file = new File("assignment.txt");
		 
		 // File creation section
		 try {
		 
		 boolean value = file.createNewFile();

		 if (value) {
			 System.out.println("File has been created");
		 }
		 else {
			 System.out.println("File already existed");
		 }
		 }
		 catch(Exception e) {
			 e.getStackTrace();
		 }
		
		 // File write section
		 
		 try {
		 FileWriter output = new FileWriter("assignment.txt");
		 
		 output.write(data);
		 System.out.println("Data has been written");
		 
		 output.close();
		 }
		 catch(Exception e) {
			 e.getStackTrace();
		 }
		 
		 // File read section
		 
		 char[] array = new char[100];
		 
		 try {
			 
			 FileReader view = new FileReader("assignment.txt");
			 
			 view.read(array);
			 System.out.println("Read from the txt file");
			 System.out.println(array);
			 view.close();
		 }
		 catch(Exception e) {
			 e.getStackTrace();
		 }
		 
		 // Delete file
		 
		 boolean value2 = file.delete();
		 if (value2) {
			 System.out.println("File has been deleted");
		 }
		 else {
			 System.out.println("File has not been deleted");
		 }
	 }
	 
}
