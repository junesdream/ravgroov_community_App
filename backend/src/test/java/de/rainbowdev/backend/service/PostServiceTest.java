package de.rainbowdev.backend.service;

import de.rainbowdev.backend.model.Post;
import de.rainbowdev.backend.repository.PostRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.*;

class PostServiceTest {

    PostRepository postRepository = mock(PostRepository.class);
    PostService postService = new PostService(postRepository);

    @Test
    void getAllPostsReturnEmptyList() {
        //GIVE
        List<Post> expected = Collections.emptyList();
        when(postRepository.findAll()).thenReturn(Collections.emptyList());

        //WHEN
        List<Post> actual = postService.getAllPosts();

        //THEN
        verify(postRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void addPost() {
        //GIVEN
        Post post = new Post(null, "Spcae Disco", "A12345", "Kinda Beat", " ", true);
        when(postRepository.save(post)).thenReturn(post);

        //WHEN
        Post actual = postService.addPost(post);

        //THEN
        verify(postRepository).save(post);
        assertEquals(post, actual);
    }
}