package aldi.anComplete.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/barcode")
public class BarcodePageController {
	
	@GetMapping
	public String getBarcodePage() {
		return "barcode";
	}
	
}
