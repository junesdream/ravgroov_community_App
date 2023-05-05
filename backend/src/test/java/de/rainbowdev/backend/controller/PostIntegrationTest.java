package de.rainbowdev.backend.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.rainbowdev.backend.model.Post;
import de.rainbowdev.backend.repository.PostRepository;

import net.bytebuddy.description.type.TypeDescription;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.io.File;
import java.util.Map;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class PostIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    PostRepository postRepository;


    @MockBean
    Cloudinary cloudinary;

    Uploader uploader = mock(Uploader.class);

    @Test
    @WithMockUser
    void getAllPosts() throws Exception {
        mockMvc.perform(get("/api/posts"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                        ]
                        """));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void getPostById() throws Exception {
/*        mockMvc.perform(post("/api/posts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                        "id": "3939",
                                        "title": "Spcae Disco",
                                        "userName": "Kinda Beat",
                                        "postImg": " ",
                                        "description": "Holidays are fine now!",
                                        "like": true
                                }
                                """).with(csrf())
                )
                .andExpect(status().isOk());
        mockMvc.perform(get("/api/posts/3939"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                                        "id": "3939",
                                        "title": "Spcae Disco",
                                        "userName": "Kinda Beat",
                                        "postImg": " ",
                                        "description": "Holidays are fine now!",
                                        "like": true
                        }
                         """));*/

        String actual = mockMvc.perform(
                        post("/api/posts")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {                                                                    "title": "Spcae Disco",
                                                                                 "userName": "Kinda Beat",
                                                                                 "postImg": " ",
                                                                                 "description": "Holidays are fine now!",
                                                                                 "like": true}
                                        """)
                                .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                           "title": "Spcae Disco",
                                                                                 "userName": "Kinda Beat",
                                                                                 "postImg": " ",
                                                                                 "description": "Holidays are fine now!",
                                                                                 "like": true
                        }
                        """))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Post actualPost = objectMapper.readValue(actual, Post.class);
        String id = actualPost.id();

        mockMvc.perform(get("/api/posts/" + id))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "id": "<ID>"
                          "title": "Spcae Disco",
                                                                                 "userName": "Kinda Beat",
                                                                                 "postImg": " ",
                                                                                 "description": "Holidays are fine now!",
                                                                                 "like": true"
                        }
                        """.replaceFirst("<ID>", id)));
    }

    @Test
    @WithMockUser
    void addPost() throws Exception {

     /*   mockMvc.perform(post("/api/posts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                        "id": "222",
                                        "title": "Spcae Disco",
                                        "userName": "Kinda Beat",
                                        "postImg": " ",
                                        "description": "Holidays are fine now!",
                                        "like": true
                                }
                                """)
                        .with(csrf())
                )
                .andExpect(status().isOk());*/

        MockMultipartFile data = new MockMultipartFile("data",
                null,
                MediaType.APPLICATION_JSON_VALUE,
                """
                                {
                                "title": "Spcae Disco",
                                 "userName": "Kinda Beat",
                                  "postImg": " ",
                                   "description": "Holidays are fine now!",
                                    "like": true,                     
                                }
                        """.getBytes());

        MockMultipartFile file = new MockMultipartFile("file",
                "testBild.png",
                MediaType.IMAGE_PNG_VALUE,
                "testBild".getBytes()
        );
        File fileToUpload = File.createTempFile("image", null);
        file.transferTo(fileToUpload);

        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(), any())).thenReturn(Map.of("url", "test-url"));

        String actual = mockMvc.perform(
                        multipart("http://localhost:8080/api/posts")
                                .file(data)
                                .file(file)
                                .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                          "title": "Spcae Disco",
                                 "userName": "Kinda Beat",
                                  "postImg": " ",
                                   "description": "Holidays are fine now!",
                                    "like": true,
                          "url": "test-url"
                        }
                        """))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Post actualPost = objectMapper.readValue(actual, Post.class);
        assertThat(actualPost.id())
                .isNotBlank();
    }

    @Test
    @WithMockUser
    void updatePostById_Successfully() throws Exception {
        mockMvc.perform(put("/api/posts/123459").
                        contentType(MediaType.APPLICATION_JSON).
                        content("""
                                {
                                "id": "123459",
                                "title": "Spring Rite",
                                "userName": "Joy World",
                                "postImg": " ",
                                "description": "Spring break up and everything is grrowing!",
                                "like": true                              
                                 }
                                       """).with(csrf())
                )
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void updatePostById_failed() throws Exception {
        mockMvc.perform(put("/api/posts/zyredf").
                        contentType(MediaType.APPLICATION_JSON).
                        content("""
                                 {
                                "id": "123459",
                                 "title": "Spring Rite",
                                 "userName": "Joy World",
                                 "postImg": " ",
                                 "description": "Spring break up and everything is grrowing!",
                                 "like": true
                                  }
                                        """).with(csrf())
                )
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser
    void expectSuccessfulDelete() throws Exception {
        mockMvc.perform(delete("/api/posts/3939")
                .with(csrf()))
                .andExpect(status().isOk());
        mockMvc.perform(get("/api/posts"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }
}
