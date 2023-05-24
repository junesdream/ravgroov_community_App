package exception;

import java.time.Instant;

public record ApiError (
        String message,
        Instant timestamp
){

    public String getMessage() {
        return message;
    }

    public Instant getTimestamp() {
        return timestamp;
    }
}