package com.example.homeworkapp.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.homeworkapp.Model.Dishes;

@Controller
public class DishesController {

    @GetMapping("/Dishes/{name}/{price}")
    public String getProductDetails(@PathVariable String name,
                                    @PathVariable Float price,
                                    Model model) {

        Dishes dish = new Dishes();
        dish.setName(name);
        dish.setPrice(price);

        model.addAttribute("dish", dish);

        return "dishes-details";
    }
}