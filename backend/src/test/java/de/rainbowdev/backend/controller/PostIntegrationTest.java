package de.rainbowdev.backend.controller;

import de.rainbowdev.backend.repository.PostRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.springframework.http.MediaType;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class PostIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    PostRepository postRepository;

    @Test
    void getAllPosts() throws Exception {
        mockMvc.perform(get("/api/posts"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                        ]
                        """));
    }

    @Test
    void addPost() throws Exception {
        mockMvc.perform(post("/api/posts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                        "id": "222",
                                        "title": "Spcae Disco",
                                        "userId": "A123456",
                                        "userName": "Kinda Beat",
                                        "postImg": " ",
                                        "like": true
                                }
                                """)
                )
                .andExpect(status().isOk());
    }
}
