package de.rainbowdev.backend.model;

import java.sql.Timestamp;
import java.util.List;

public record RavgroovUser(

        String id,
        String userImg,
        String email,
        List<String> friends,
        Timestamp joiningDate

) {

}
