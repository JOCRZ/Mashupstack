package greetings;

import profile.Userinput;

public class GreetingDisplay {
    
 public static void show(){

    Userinput text = new Userinput();
    String name = text.get();

    System.out.printf("Hai.. %s Welcome to Website",name);
 }
}
