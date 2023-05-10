package de.rainbowdev.backend.service;

import de.rainbowdev.backend.model.Post;
import de.rainbowdev.backend.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;
    private final CloudinaryService cloudinaryService;


    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(String id) {
        return postRepository.findById(id).orElseThrow();
    }

    public Post addPost(Post post, MultipartFile image) throws IOException {

        if (image != null){
            String url = cloudinaryService.uploadImage(image);
            post = post.withUrl(url);
        }
        return postRepository.save(post);

    }


    public Post updatePost(Post post) {
        return postRepository.save(post);
    }

    public void delete(String id) {
        postRepository.deleteById(id);
    }

}

