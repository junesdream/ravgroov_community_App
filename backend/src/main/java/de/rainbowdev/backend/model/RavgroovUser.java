package de.rainbowdev.backend.model;

import org.springframework.data.annotation.Id;

import java.sql.Timestamp;
import java.util.List;

public record RavgroovUser(
        @Id
        String id,
        String userId,
        String userImg,
        String email,
        List<String> friends,
        Timestamp joiningDate


) {

}

