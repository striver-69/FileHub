package com.filehub.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

	private final Environment env;

	public BackendApplication(Environment env) {
		this.env = env;
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) {
		// Print active profiles to confirm configuration loading
		String[] profiles = env.getActiveProfiles();
		if (profiles.length == 0) {
			System.out.println("No active Spring profiles set, using default configuration.");
		} else {
			System.out.println("Active Spring Profiles: " + String.join(", ", profiles));
		}
	}
}
