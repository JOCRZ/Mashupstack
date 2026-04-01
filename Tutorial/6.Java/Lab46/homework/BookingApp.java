
import java.util.Scanner;

abstract class Ride{
	abstract int calculateFare(int distance);
	
	public void rideType() {
		System.out.println("Generic Ride");
	}
}

class AutoRide extends Ride{
	public int calculateFare(int distance) {
		
		int rate = 10;
		int fare = distance * rate;
		return fare;
	}
	
	public void rideType() {
		System.out.println("Auto Ride");
	}
}


class CarRide extends Ride{
	public int calculateFare(int distance) {
		
		int rate = 20;
		int fare = distance * rate;
		return fare;
	}
	
	public void rideType() {
		System.out.println("Car Ride");
	}
}

public class BookingApp {

	public static void main(String[] args) {
		
		Scanner input = new Scanner(System.in);
		
		System.out.print("Enter Ride Type (auto or car) : ");
		String type = input.nextLine();
		System.out.println();
		System.out.print("Enter Distance to travel in (km) : ");
		int km = input.nextInt();
		
		if("auto".equals(type)){
			
			AutoRide a = new AutoRide();
			a.rideType();
			System.out.printf("Total fare is %d ",a.calculateFare(km));
		}
		else {
			CarRide c = new CarRide();
			c.rideType();
			System.out.printf("Total fare is %d ",c.calculateFare(km));
		}
		
		input.close();
		
	}
}
