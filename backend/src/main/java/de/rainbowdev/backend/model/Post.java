package de.rainbowdev.backend.model;


public record Post(

    String id,
    String title,
    String userName,
    String postImg,
    String description,
    Boolean like
) {

}
