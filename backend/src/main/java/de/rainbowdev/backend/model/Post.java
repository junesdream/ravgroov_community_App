package de.rainbowdev.backend.model;


import org.springframework.data.annotation.Id;

public record Post(
        @Id
        String id,
        String title,
        String userName,
        String postImg,
        String description,
        Boolean like,
        String url
) {
        public Post withId(String id) {
                return new Post (id, title, userName, postImg, description, like, url);
        }

        public Post withUrl(String url) {
                return new Post(id, title, userName, postImg, description, like, url);
        }
}
