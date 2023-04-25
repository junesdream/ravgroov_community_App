package de.rainbowdev.backend.repository;

import de.rainbowdev.backend.model.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
@Repository
public class PostRepository {

//    private final List<Post> postList;

    private final Map<String, Post> posts = new HashMap<>();

   /* public List<Post> findAll() {
        return postList;
    }*/

    public List<Post> findAll() {
        return new ArrayList<>(posts.values());
    }


}
