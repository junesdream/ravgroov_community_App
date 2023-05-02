package de.rainbowdev.backend.model;


import org.springframework.data.annotation.Id;

public record Post(
        @Id
        String id,
        String title,
        String userName,
        String postImg,
        String description,
        Boolean like
) {

}
