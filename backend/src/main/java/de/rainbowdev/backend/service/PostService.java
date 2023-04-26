package de.rainbowdev.backend.service;

import de.rainbowdev.backend.model.Post;
import de.rainbowdev.backend.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post addPost(Post post) {
        return postRepository.save(post);
    }
}
