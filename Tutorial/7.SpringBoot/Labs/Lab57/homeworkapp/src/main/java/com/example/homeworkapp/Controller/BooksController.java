package com.example.homeworkapp.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import com.example.homeworkapp.Repository.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import com.example.homeworkapp.Models.BooksModel; 

@Controller
public class BooksController {

	@GetMapping("/booksentry")
	public String Books(Model model) {
	    model.addAttribute("message", "Enter Your Book Details");
	    return "booksentry";
	}
	@Autowired
	private BooksRepository bookRepository;
	@PostMapping("/booksave")
	public String Books(BooksModel bookData,Model model) {
	    
	    BooksModel n = new BooksModel();
	    n.setName(bookData.getName());
	    n.setDescription(bookData.getDescription());    
	    n.setPrice(bookData.getPrice()); 
	    bookRepository.save(n);
	    
	    model.addAttribute("message", "The Book" + bookData.getName() +" is saved successfully");
	    return "booksentry"; 
	} 
	
	
	@GetMapping("/booksview")
	public String showProducts(Model model) {
		 Iterable<BooksModel> bookList = bookRepository.findAll();
	    model.addAttribute("books", bookList);
	    return "booksview";
	}

}