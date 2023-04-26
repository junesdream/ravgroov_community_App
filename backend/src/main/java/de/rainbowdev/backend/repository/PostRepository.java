package de.rainbowdev.backend.repository;


import de.rainbowdev.backend.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String> {

}


