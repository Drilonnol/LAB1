package org.makerminds.javaweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;



@SpringBootApplication(exclude= {UserDetailsServiceAutoConfiguration.class})
@EnableFeignClients(basePackages = "org.makerminds.javaweb.interfacee")
@EnableDiscoveryClient
public class MeaxhimiSpitalitAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(MeaxhimiSpitalitAppApplication.class, args);
	}
	  

}
