package de.rainbowdev.backend.service;

import de.rainbowdev.backend.model.Post;
import de.rainbowdev.backend.repository.PostRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.*;

class PostServiceTest {

    PostRepository postRepository = mock(PostRepository.class);
    CloudinaryService cloudinaryService = mock(CloudinaryService.class);
    PostService postService = new PostService(postRepository, cloudinaryService);


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
                true,
                ""
        );
        when(postRepository.findById(id)).thenReturn(Optional.of(expected));
        // WHEN
        Post actual = postService.getPostById(id);

        verify(postRepository).findById(id);
        assertEquals(expected, actual);
    }

    @Test
    void addPost() throws IOException {
        //GIVEN
        Post postToSave = new Post("12345", "Spcae Disco", "A12345", "Kinda Beat", "Holidays are fine now!",  true, null);
        Post postToSaveWithId = new Post("12345", "Spcae Disco", "A12345", "Kinda Beat", "Holidays are fine now!",  true, null);


        when(cloudinaryService.uploadImage(any())).thenReturn("url");
        when(postRepository.save(postToSaveWithId)).thenReturn(postToSaveWithId);

        MultipartFile file = null;

        //WHEN
        Post actual = postService.addPost(postToSave, file);

        //THEN
        Post expected = new Post("12345", "Spcae Disco", "A12345", "Kinda Beat", "Holidays are fine now!",  true, null);
        assertEquals(expected, actual);
    }

    @Test
    void updatePostById(){
        //GIVEN
        String id = "644d62573b7e0b0684c7e41e";
        Post post = new Post("", "gloria", "gloria", "gloria", "gloria", true, "");

        //WHEN
        when(postRepository.findById(id)).thenReturn(Optional.of(post));
        postService.updatePost(post);
        //THEN
         verify(postRepository).save(post);

    }
    @Test
    void deletePostById(){
        //GIVEN
        String id ="8da792d0-55d2-4cb7-9784-af12023a19bb";

        //WHEN
        postService.delete(id);
        //THEN
        verify(postRepository).deleteById(id);
    }


    @Test
    void getAllCallsRepository() {
        // given
        Post testItem = new Post("", "", "", "", "", true, "");
        Mockito.when(postRepository.findAll())
                .thenReturn(Collections.singletonList(testItem));

        // when
        List<Post> actual = postService.getAllPosts();

        // then
        Assertions.assertThat(actual)
                .containsExactly(testItem);
    }
}