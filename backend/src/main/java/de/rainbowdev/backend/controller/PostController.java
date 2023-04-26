package de.rainbowdev.backend.controller;

import de.rainbowdev.backend.model.Post;
import de.rainbowdev.backend.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/posts")

public class PostController {

    private final PostService postService;

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping
    public Post addPost(@RequestBody Post post) {
        return postService.addPost(post);
    }


}

