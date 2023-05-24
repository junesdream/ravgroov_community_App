package exception;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.Instant;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.openMocks;

class GlobalExceptionHandlerTest {

    @Mock
    private NoSuchElementException mockException;

    @Test
    void testHandleNoSuchElementException() {
        openMocks(this);

        String errorMessage = "Element not found";
        GlobalExceptionHandler exceptionHandler = new GlobalExceptionHandler();

        when(mockException.getMessage()).thenReturn(errorMessage);

        ResponseEntity<ApiError> response = exceptionHandler.handleNoSuchElementException(mockException);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(errorMessage, response.getBody().getMessage());
        assertEquals(Instant.now().getEpochSecond(), response.getBody().getTimestamp().getEpochSecond());
    }
}
