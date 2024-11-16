package org.makerminds.javaweb;

import java.util.Arrays;
import java.util.Collections;

import org.makerminds.javaweb.response.CustomErrorDecoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import feign.codec.ErrorDecoder;
import in.mahesh.tasks.SecurityConfig.JwtProvider;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

   /*
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests().anyRequest().permitAll();
		return http.build();
	}
	*/
	  @Bean
	    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	        http
	            .authorizeRequests(authorizeRequests ->
	                authorizeRequests
	                    .anyRequest().permitAll() // Lejohen të gjitha kërkesat; ndrysho sipas nevojës
	            )
	            .sessionManagement(sessionManagement ->
	                sessionManagement
	                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Përdor menaxhim të sesionit të papërkulur
	            )
	            .csrf().disable(); // Çaktivizo CSRF për thjeshtësi; aktivizo nëse e kërkohet

	        return http.build();
	    }
	  
	  @Bean
	    public CorsConfigurationSource corsConfigurationSource() {
	        CorsConfiguration configuration = new CorsConfiguration();
	        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
	        configuration.setAllowedMethods(Collections.singletonList("*"));
	        configuration.setAllowCredentials(true);
	        configuration.setAllowedHeaders(Collections.singletonList("*"));
	        configuration.setExposedHeaders(Arrays.asList("Authorization"));
	        configuration.setMaxAge(3600L);

	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", configuration);

	        return source;
	    }
	 @Bean
	    public ErrorDecoder errorDecoder() {
	        return new CustomErrorDecoder();
	    }
}

