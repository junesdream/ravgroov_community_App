package de.rainbowdev.backend.model;


public record Post(

    String id,
    String title,
    String userId,
    String userName,
    String postImg,
    Boolean like
) {
    public Post() {
        this(null, null, null, null, null, null);
    }
}
