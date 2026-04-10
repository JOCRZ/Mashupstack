

import java.util.regex.Matcher;
import java.util.regex.Pattern;

class GetNum{
	
	@SuppressWarnings("unchecked") 
	void Num(String txt) {
		
	Pattern pattern = Pattern.compile("\\b\\d{10}\\b");
    Matcher matcher = pattern.matcher(txt);
    
    boolean found = false;

    while (matcher.find()) {
        System.out.println("Found: " + matcher.group());
        found = true;
    }

    if (!found) {
        System.out.println("No phone numbers found.");
    }

    
	}
}

public class ExtractNum {

	public static void main(String[] args) {
		
		String msg = "Hai My 9876543213 name is Alan 9876543212  Please contact me on 9876543211";
		GetNum get = new GetNum();
		get.Num(msg);
		
	}
}
