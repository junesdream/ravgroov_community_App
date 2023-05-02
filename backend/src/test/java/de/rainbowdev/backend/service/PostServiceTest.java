package de.rainbowdev.backend.service;

import de.rainbowdev.backend.model.Post;
import de.rainbowdev.backend.repository.PostRepository;
import org.junit.jupiter.api.Test;


import java.util.Collections;
import java.util.List;
import java.util.Optional;

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
    void getPostById() {

        String id = "644bb7feab61312259736934";
        Post expected = new Post(
                "644bb7feab61312259736934",
                "Spring Sound",
                "Beatland",
                "",
                "This is how i feel",
                true
        );
        when(postRepository.findById(id)).thenReturn(Optional.of(expected));
        // WHEN
        Post actual = postService.getPostById(id);

        verify(postRepository).findById(id);
        assertEquals(expected, actual);
    }

    @Test
    void addPost() {
        //GIVEN
        Post post = new Post(null, "Spcae Disco", "A12345", "Kinda Beat", "Holidays are fine now!", true);
        when(postRepository.save(post)).thenReturn(post);

        //WHEN
        Post actual = postService.addPost(post);

        //THEN
        verify(postRepository).save(post);
        assertEquals(post, actual);
    }

    @Test
    void updatePostById(){
        //GIVEM
        String id = "644d62573b7e0b0684c7e41e";
        Post post = new Post("", "gloria", "gloria", "gloria", "gloria", true);

        //WHEN
        when(postRepository.findById(id)).thenReturn(Optional.of(post));
        postService.updatePost(post);
        //THEN
         verify(postRepository).save(post);
        
    }
    @Test
    void deletePostById(){
        //GIVEN
        String id ="644bb7feab61312259736934";

        //WHEN
        postService.delete(id);
        //THEN
        verify(postRepository).deleteById(id);
    }
}
