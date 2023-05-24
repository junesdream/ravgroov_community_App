package exception;

import org.junit.jupiter.api.Test;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ApiErrorTest {

    @Test
    void testApiError() {
        String errorMessage = "An error occurred";
        Instant timestamp = Instant.now();

        ApiError apiError = new ApiError(errorMessage, timestamp);

        assertEquals(errorMessage, apiError.getMessage());
        assertEquals(timestamp, apiError.getTimestamp());
    }
}
