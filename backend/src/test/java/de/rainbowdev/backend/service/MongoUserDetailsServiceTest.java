package de.rainbowdev.backend.service;

import de.rainbowdev.backend.model.MongoUser;
import de.rainbowdev.backend.repository.MongoUserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class MongoUserDetailsServiceTest {
    final MongoUserRepository mongoUserRepository = mock(MongoUserRepository.class);

    final MongoUserDetailsService mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepository);

    @Test
    void loadUserByUsername_shouldReturnUser() {
        //GIVE
        MongoUser mongoTestUser = new MongoUser("1", "testUser", "test");
        Mockito.when(mongoUserRepository.findMongoUserByUsername("testUser"))
                .thenReturn(Optional.of(mongoTestUser));

        //WHEN
        UserDetails actual = mongoUserDetailsService.loadUserByUsername("testUser");
        UserDetails expected = new User(mongoTestUser.username(), mongoTestUser.password(), Collections.emptyList());

        //THENW
        verify(mongoUserRepository).findMongoUserByUsername("testUser");
        assertEquals(expected, actual);
    }
}
