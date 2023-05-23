package de.rainbowdev.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("mongoUsers")
public record MongoUser (
        @Id
        String id,
        String username,
        String password


) {

        public MongoUser(String username, String password) {
                this(null, username, password);
        }
}
