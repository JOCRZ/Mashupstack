

interface Vehicle{
	public void start();
	public void stop();
}

interface FuelBased{
	public void refuel();
}


  class Car implements Vehicle, FuelBased {
	
	public void start() {
		System.out.println("Car engine started");
	}
	
	public void stop() {
		System.out.println("Car engine stopped");
	}
	
	public void refuel() {
		System.out.println("Car is refueling at the station");
	}
}

  class ElectricScotter implements Vehicle {
	
	public void start() {
		System.out.println("Electric scooter powered on");
	}


	public void stop() {
		System.out.println("Electric scooter powered off");
	}

}

public class RentalSystem {
	
	public static void main(String[] args) {
		
		Car car =  new Car();
		ElectricScotter scooter = new ElectricScotter();
		
        System.out.println("---- Car Simulation ----");
        car.start();    
        System.out.println("Car is driving...");
        car.stop();    
        car.refuel();    

        System.out.println("\n---- Electric Scooter Simulation ----");
        scooter.start(); 
        System.out.println("Scooter is riding...");
        scooter.stop();  
    
    }
}
