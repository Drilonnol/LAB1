package org.makeminds.javaweb.Exeption;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

public class CostumResponseEntityExeption extends ResponseEntityExceptionHandler {
	@ExceptionHandler
	public final ResponseEntity<?> handleDepartmentNotFoundException(RepartiNotFoundException ex){
		RepartiNotFoundExeptionResponse repartiNotFoundExceptionResponse = new RepartiNotFoundExeptionResponse(ex.getMessage());
	    return new ResponseEntity<>(repartiNotFoundExceptionResponse, HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler
	public final ResponseEntity<?> handleMjeketNotFoundException(MjeketNotFoundExeption ex){
		MjeketNotFoundExeptionResponse mjeketNotFoundExceptionResponse = new MjeketNotFoundExeptionResponse(ex.getMessage());
	    return new ResponseEntity<>(mjeketNotFoundExceptionResponse, HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler
	public final ResponseEntity<?> handleTakimettNotFoundException(TakimetNotFoundException ex){
		TakimetNotFoundExeptionResponse takimetNotFoundExceptionResponse = new TakimetNotFoundExeptionResponse(ex.getMessage());
	    return new ResponseEntity<>(takimetNotFoundExceptionResponse, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler
	public final ResponseEntity<?> handleQytetiNotFoundException(QytetiNotFoundException ex){
		QytetiNotFoundExceptionResponse qytetiNotFoundExceptionResponse = new QytetiNotFoundExceptionResponse (ex.getMessage());
		return new ResponseEntity<> (qytetiNotFoundExceptionResponse, HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler
	public final ResponseEntity<?> handleEmployeeNotFoundException(SpitaliNotFoundException ex){
		SpitaliNotFoundExeptionResponse employeeNotFoundException = new SpitaliNotFoundExeptionResponse(ex.getMessage());
		return new ResponseEntity<> (employeeNotFoundException, HttpStatus.BAD_REQUEST);
	}
}