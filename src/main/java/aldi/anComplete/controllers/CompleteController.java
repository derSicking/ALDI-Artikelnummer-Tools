package aldi.anComplete.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = { "/complete" })
public class CompleteController {

	@GetMapping
	@ResponseBody
	public String getComplete(@RequestParam String an) {
		if (an.length() <= 4) {
			return complete4Digit(an);
		} else if (an.length() == 7) {
			return complete7Digit(an);
		}
		return an;
	}

	private int computeCheckDigit(String an) {
		int weight = 3;
		int sum = 0;
		for (int i = an.length() - 1; i >= 0; i--) {
			int digit = Integer.parseInt(Character.toString(an.charAt(i)));

			sum += weight * digit;

			if (weight == 3)
				weight = 1;
			else
				weight = 3;
		}
		if (sum % 10 == 0)
			return 0;
		return 10 - sum % 10;
	}

	private String complete4Digit(String an) {
		int lead = 4 - an.length();
		for(int i = 0; i < lead; i++)
			an = "0" + an;
		an = "290" + an;
		return an + computeCheckDigit(an);
	}

	private String complete7Digit(String an) {
		if (an.startsWith("000"))
			return complete4Digit(an.substring(3));
		else {
			an = "20090" + an;
			return an + computeCheckDigit(an);
		}
	}

}
