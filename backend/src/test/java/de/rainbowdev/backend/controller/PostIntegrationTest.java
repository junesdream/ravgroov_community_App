package de.rainbowdev.backend.controller;

import de.rainbowdev.backend.repository.PostRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class PostIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    PostRepository postRepository;


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
        mockMvc.perform(post("/api/posts")
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
                         """));
    }

    @Test
    @WithMockUser
    void addPost() throws Exception {
        mockMvc.perform(post("/api/posts")
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
                .andExpect(status().isOk());
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
