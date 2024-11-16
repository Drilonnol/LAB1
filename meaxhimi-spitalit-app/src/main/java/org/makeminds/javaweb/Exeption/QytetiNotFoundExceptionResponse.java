package org.makeminds.javaweb.Exeption;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QytetiNotFoundExceptionResponse {
	//message: vlera
	private String departmentNotFoundMessage;

	public QytetiNotFoundExceptionResponse(String message) {
		super();
		this.departmentNotFoundMessage = message;
	}	
}
