package de.rainbowdev.backend.controller;

import de.rainbowdev.backend.model.Post;
import de.rainbowdev.backend.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

    @GetMapping("/{id}")
    Post getPostById(@PathVariable String id) {
        return postService.getPostById(id);
    }

    @PostMapping
    public Post addPost(@RequestBody Post post) {
        return postService.addPost(post);
    }

    @PutMapping("/{id}")
    Post updatePost(@PathVariable String id, @RequestBody Post post) {
        if (!post.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The id in the url does not match the request body's id");
        }
        return postService.updatePost(post);
    }

    @DeleteMapping("{id}")
    void delete(@PathVariable String id) {
        postService.delete(id);
    }
}

