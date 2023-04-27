package de.rainbowdev.backend.repository;



import de.rainbowdev.backend.model.RavgroovUser;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RavgroovUserRepository extends MongoRepository<RavgroovUser, String> {
    Optional<RavgroovUser> findRavgroovUserById();
}
