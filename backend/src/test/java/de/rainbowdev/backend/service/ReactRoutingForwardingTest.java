package de.rainbowdev.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.io.IOException;


import config.ReactRoutingForwarding;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

@ExtendWith(MockitoExtension.class)
class ReactRoutingForwardingTest {

    @Mock
    private Resource mockLocation;

    @Test
    void testExistingResource() throws IOException {
        String resourcePath = "/static/image.jpg";
        Resource mockResource = mock(Resource.class);
        when(mockResource.exists()).thenReturn(true);
        when(mockResource.isReadable()).thenReturn(true);
        when(mockLocation.createRelative(resourcePath)).thenReturn(mockResource);

        ReactRoutingForwarding.ReactRoutingPathResourceResolver resolver = new ReactRoutingForwarding.ReactRoutingPathResourceResolver();
        Resource returnedResource = resolver.getResource(resourcePath, mockLocation);
        assertEquals(mockResource, returnedResource);
    }

    @Test
    void testNonExistingResource() throws IOException {
        String resourcePath = "/foo/bar";
        Resource mockResource = mock(Resource.class);
        when(mockResource.exists()).thenReturn(false);
        when(mockLocation.createRelative(resourcePath)).thenReturn(mockResource);

        ReactRoutingForwarding.ReactRoutingPathResourceResolver resolver = new ReactRoutingForwarding.ReactRoutingPathResourceResolver();
        Resource returnedResource = resolver.getResource(resourcePath, mockLocation);
        assertEquals(new ClassPathResource(ReactRoutingForwarding.DEFAULT_STARTING_PAGE), returnedResource);
    }

}
