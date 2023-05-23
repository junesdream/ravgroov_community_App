package de.rainbowdev.backend.model;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("mongoUsers")
public record MongoUser (
        @Id
        String id,
        @NotBlank
        @Size(min = 3, max = 16)
        String username,

        @NotBlank
        @Size(min = 3, max = 32)
        String password


) {

        public MongoUser(String username, String password) {
                this(null, username, password);
        }
}
