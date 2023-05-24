package de.rainbowdev.backend.service;

import config.ReactRoutingForwarding;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReactRoutingForwardingTest {

    @Test
    void testExistingResource() throws IOException {
        // Arrange
        String resourcePath = "/static/image.jpg";
        Resource mockLocation = mock(Resource.class);
        Resource mockResource = mock(Resource.class);
        when(mockResource.exists()).thenReturn(true);
        when(mockResource.isReadable()).thenReturn(true);
        when(mockLocation.createRelative(resourcePath)).thenReturn(mockResource);

        ReactRoutingForwarding.ReactRoutingPathResourceResolver resolver = new ReactRoutingForwarding.ReactRoutingPathResourceResolver();

        // Act
        Resource returnedResource = resolver.getResource(resourcePath, mockLocation);

        // Assert
        assertEquals(mockResource, returnedResource);
    }

    @Test
    void testNonExistingResource() throws IOException {
        // Arrange
        String resourcePath = "/foo/bar";
        Resource mockLocation = mock(Resource.class);
        Resource mockResource = mock(Resource.class);
        when(mockResource.exists()).thenReturn(false);
        when(mockLocation.createRelative(resourcePath)).thenReturn(mockResource);

        ReactRoutingForwarding.ReactRoutingPathResourceResolver resolver = new ReactRoutingForwarding.ReactRoutingPathResourceResolver();

        // Act
        Resource returnedResource = resolver.getResource(resourcePath, mockLocation);

        // Assert
        assertEquals(new ClassPathResource(ReactRoutingForwarding.DEFAULT_STARTING_PAGE), returnedResource);
    }

    @Test
    void testUnreadableResource() throws IOException {
        // Arrange
        String resourcePath = "/static/image.jpg";
        Resource mockLocation = mock(Resource.class);
        Resource mockResource = mock(Resource.class);
        when(mockResource.exists()).thenReturn(true);
        when(mockResource.isReadable()).thenReturn(false);
        when(mockLocation.createRelative(resourcePath)).thenReturn(mockResource);

        ReactRoutingForwarding.ReactRoutingPathResourceResolver resolver = new ReactRoutingForwarding.ReactRoutingPathResourceResolver();

        // Act
        Resource returnedResource = resolver.getResource(resourcePath, mockLocation);

        // Assert
        assertEquals(new ClassPathResource(ReactRoutingForwarding.DEFAULT_STARTING_PAGE), returnedResource);
    }

    @Test
    void testIOExceptionOnCreateRelative() throws IOException {
        // Arrange
        String resourcePath = "/static/image.jpg";
        Resource mockLocation = mock(Resource.class);
        when(mockLocation.createRelative(resourcePath)).thenThrow(IOException.class);

        ReactRoutingForwarding.ReactRoutingPathResourceResolver resolver = new ReactRoutingForwarding.ReactRoutingPathResourceResolver();

        // Act & Assert
        assertThrows(IOException.class, () -> {
            resolver.getResource(resourcePath, mockLocation);
        });
    }
}
