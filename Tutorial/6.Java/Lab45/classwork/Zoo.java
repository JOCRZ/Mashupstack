

public class Zoo {

	
		interface Animal{
			public void makeSound();
			public void move();
		}
		
		
		public static class Bird implements Animal {
			
			public void makeSound() {
				System.out.println("Chirp");
			}
			
			public void move() {
				System.out.println("Fly");
			}
		}
		
		public static class Dog implements Animal {
			
			public void makeSound() {
				System.out.println("Bark");
			}
			
			public void move() {
				System.out.println("Run");
			}
		}
		
		
		public static void main(String[] args) {
			
			Bird b = new Bird();
			Dog d = new Dog();
			
			System.out.println("Bird");
			b.makeSound();
			b.move();
			
			System.out.println();
				
			System.out.println("Dog");
			d.makeSound();
			d.move();
		}
}
