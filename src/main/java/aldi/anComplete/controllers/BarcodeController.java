package aldi.anComplete.controllers;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferInt;
import java.awt.image.RenderedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.zxing.oned.EAN13Writer;
import com.google.zxing.oned.EAN8Writer;

@Controller
@RequestMapping(value = { "/barcode" })
public class BarcodeController {

	@GetMapping
	@ResponseBody
	public void getComplete(@RequestParam String an, HttpServletResponse response) {
		boolean[] bars;
		if (an.length() == 8) {
			try {
				bars = new EAN8Writer().encode(an);
			} catch (Exception e) {
				response.setStatus(400);
				return;
			}
		} else if (an.length() == 13) {
			try {
				bars = new EAN13Writer().encode(an);
			} catch (Exception e) {
				response.setStatus(400);
				return;
			}
		} else {
			response.setStatus(400);
			return;
		}
		BufferedImage barcode = new BufferedImage(bars.length, bars.length, BufferedImage.TYPE_INT_RGB);
		for (int i = 0; i < bars.length; i++) {
			for (int j = 0; j < bars.length; j++) {
				barcode.setRGB(i, j, bars[i] ? Color.BLACK.getRGB() : Color.WHITE.getRGB());
			}
		}
		response.setContentType(MediaType.IMAGE_PNG_VALUE);
		try {
			response.getOutputStream().write(toByteArray(barcode, "png"));
		} catch (IOException e) {
			response.setStatus(500);
			return;
		}
	}

	private byte[] toByteArray(BufferedImage bi, String format) throws IOException {

		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ImageIO.write(bi, format, baos);
		byte[] bytes = baos.toByteArray();
		return bytes;

	}
}
