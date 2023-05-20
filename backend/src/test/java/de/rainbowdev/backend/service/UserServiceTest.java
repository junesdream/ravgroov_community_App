package de.rainbowdev.backend.service;


import de.rainbowdev.backend.model.MongoUser;
import de.rainbowdev.backend.repository.MongoUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import static org.mockito.Mockito.mock;
@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    private UserService userService;
    @Mock
    private MongoUserRepository mongoUserRepository;
    @Mock
    private PasswordEncoder encoder;
    private MongoUser mongoUser;

    @BeforeEach
    void setup() {
        userService = new UserService(mongoUserRepository, encoder);
    }

    @Test
    void createMongoUser_Successful() {
        MongoUser mongoUser = new MongoUser(UUID.randomUUID().toString(),
                "username", "password");
        String encodedPassword = encoder.encode(mongoUser.password());
        MongoUser encodedUser = new MongoUser(mongoUser.username(),
                encodedPassword);
        when(mongoUserRepository.findMongoUserByUsername(mongoUser.username())).thenReturn(Optional.empty());

        userService.createMongoUser(mongoUser);

        verify(mongoUserRepository).save(encodedUser);
    }

    @Test
    void createMongoUser_failed() {
        MongoUser mongoUser = new MongoUser(UUID.randomUUID().toString(),
                "username", "password");
        String encodedPassword = encoder.encode(mongoUser.password());
        MongoUser encodedUser = new MongoUser(mongoUser.username(),
                encodedPassword);
        when(mongoUserRepository.findMongoUserByUsername(mongoUser.username())).thenReturn(Optional.of(encodedUser));

        assertThrows(IllegalArgumentException.class, () -> userService.createMongoUser(mongoUser));
    }

    @Test
    void findUserByUsername() {
        MongoUser mongoUser = new MongoUser(UUID.randomUUID().toString(),
                "username", "password");
        when(mongoUserRepository.findMongoUserByUsername(mongoUser.username())).thenReturn(Optional.of(mongoUser));

        userService.findUserByUsername(mongoUser.username());

        verify(mongoUserRepository).findMongoUserByUsername(mongoUser.username());
    }

}
