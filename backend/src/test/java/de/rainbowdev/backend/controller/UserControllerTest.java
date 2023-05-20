package de.rainbowdev.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.rainbowdev.backend.model.MongoUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    @WithMockUser(username = "testUser")
    void login_shouldReturnUser() throws Exception {
        mockMvc.perform(post("/api/users/login")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("testUser"));
    }

    @Test
    @WithMockUser(username = "testUser")
    void login_shouldFail_whenUserIsUnauthorized() throws Exception {
        mockMvc.perform(post("/api/users/login"))
                .andExpect(status().isForbidden())
                .andExpect(content().string(""));
    }

    @Test
    @WithMockUser(username = "testUser")
    void testCreateUserBySignup() throws Exception {
        MongoUser mongoUser = new MongoUser(
                null, "username", "password");
        ObjectMapper objectMapper = new ObjectMapper();
        mockMvc.perform(post("/api/users/signup").
                        contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mongoUser))
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    @WithMockUser
    void testLoadMongoUserByUsername() throws Exception {
        String username = "username";
        MongoUser mongoUser = new MongoUser(
                null, username, "password"
        );
        ObjectMapper objectMapper = new ObjectMapper();
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mongoUser))
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isCreated());


        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/users/" + username)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();


        String responseJson = result.getResponse().getContentAsString();
        MongoUser responseUser = objectMapper.readValue(responseJson, MongoUser.class);


        assertEquals(mongoUser.username(), responseUser.username());
        assertEquals(passwordEncoder.encode(mongoUser.password()), responseUser.password());

    }



    @Test
    @WithMockUser(username = "rainbow")
    void logout_shouldLogoutUser() throws Exception {
        mockMvc.perform(post("/api/users/logout")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string(""));
    }
}
