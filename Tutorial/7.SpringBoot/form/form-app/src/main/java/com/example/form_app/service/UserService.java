package com.example.form_app.service;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    public String processUser(String name, int age) {
        return "Received " + name + " who is " + age + " years old";
    }

}