
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;


public class FileHandling2 {

	public static void main(String[] args) {
		
		String data = "Book order placed at [your preferred time]";
		
		// File creation
		
		File file = new File("log.txt");
		
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
		
		// File write
		try {
			
		FileWriter output = new FileWriter("log.txt");
		output.write(data);
		System.out.println("Successfully written");
		output.close();
		
		}
		catch(Exception e) {
			e.getStackTrace();
		}
		
		// File read
		
		char[] array = new char[100];
		
		try {
			FileReader view = new FileReader("log.txt");
			view.read(array);
			System.out.println("Succssfully read");
			System.out.println(array);
			view.close();
		}
		catch(Exception e) {
			e.getStackTrace();
		}
		
		boolean value2 = file.delete();
		
		 if (value2) {
			 System.out.println("File has been deleted");
		 }
		 else {
			 System.out.println("File has not been deleted");
		 }
		
		
	}
}

    
