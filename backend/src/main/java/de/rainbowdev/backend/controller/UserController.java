package de.rainbowdev.backend.controller;

import de.rainbowdev.backend.model.MongoUser;
import de.rainbowdev.backend.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public String getMe() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }


    @PostMapping("/login")
    public String login() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }


    @PostMapping("/signup")
    public ResponseEntity<MongoUser> createUser(@RequestBody MongoUser mongoUser) {
        MongoUser createdUser = userService.createMongoUser(mongoUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }


    @GetMapping("/{username}")
    public MongoUser loadMongoUserByName(@PathVariable String username) {
        return userService.findUserByUsername(username);
    }


    @PostMapping("/logout")
    public void logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
    }
}
