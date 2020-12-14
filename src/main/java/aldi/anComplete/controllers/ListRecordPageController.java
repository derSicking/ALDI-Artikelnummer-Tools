package aldi.anComplete.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class ListRecordPageController {
	
	@GetMapping
	public String getListRecordPage() {
		return "list";
	}
	
}
