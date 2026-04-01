
abstract class User{
	abstract void ShowMessage();
	
	public void UserType() {
		System.out.println("User type selected");
	}
	
}

class AdminUser extends  User{
	public void ShowMessage() {
		System.out.println("Welcome, Admin");
	}
}

class GuestUser extends User{
	public void ShowMessage() {
		System.out.println("Welome, Guest");
	}
}

public class UserTest {

	public static void main(String[] args) {
		
		AdminUser a = new AdminUser();
		GuestUser g = new GuestUser();
		
		a.UserType();
		a.ShowMessage();
		
		g.UserType();
		g.ShowMessage();
	}
}
