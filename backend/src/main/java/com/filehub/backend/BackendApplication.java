package com.filehub.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

	@Autowired
	private DataSource dataSource; // Spring Boot auto-configures this based on your application.properties

	public static void main(String[] args) {
		System.out.println("Hello World");
		System.out.println("plz workwegwe");
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		try (Connection connection = dataSource.getConnection()) {
			System.out.println("Connected to MySQL via Spring Boot!");
			try (Statement stmt = connection.createStatement();
				 ResultSet rs = stmt.executeQuery("SELECT 1")) {
				if (rs.next()) {
					System.out.println("Query result: " + rs.getInt(1));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
