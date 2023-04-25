package de.rainbowdev.backend.service;

import de.rainbowdev.backend.model.Post;
import de.rainbowdev.backend.repository.PostRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class PostServiceTest {

    PostRepository postRepository = mock(PostRepository.class);
    PostService postService = new PostService(postRepository);

    @Test
    void getAllPosts() {
        //GIVE
        Post post1 = new Post();
         List<Post> posts = List.of(post1);

        when(postRepository.findAll()).thenReturn(posts);

        //WHEN
        List<Post> actual = postService.getAllPosts();

        //THEN
        List<Post> expected =List.of(new Post());
        assertEquals(expected, actual);

    }

}