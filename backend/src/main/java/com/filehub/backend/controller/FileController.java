package com.filehub.backend.controller;

import com.filehub.backend.model.FileMetadata;
import com.filehub.backend.service.FileStorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

/**
 * REST controller for handling file operations.
 * <p>
 * Provides endpoints to upload files, view file content, and fetch file metadata.
 * </p>
 */
@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileStorageService fileStorageService;

    /**
     * Constructs a new FileController with the provided FileStorageService.
     *
     * @param fileStorageService the service handling file storage and metadata operations
     */
    public FileController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    /**
     * Uploads a file and stores its metadata.
     *
     * @param file       the file to be uploaded (multipart file)
     * @param uploadedBy the UUID of the user who is uploading the file
     * @return a ResponseEntity containing the saved FileMetadata if successful, or an error status otherwise
     */
    @PostMapping("/upload")
    public ResponseEntity<FileMetadata> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("uploadedBy") String uploadedBy) {
        try {
            FileMetadata metadata = fileStorageService.storeFile(file, uploadedBy);
            return ResponseEntity.ok(metadata);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Retrieves and returns the content of a file based on its ID.
     * <p>
     * This endpoint is intended for text-based files.
     * </p>
     *
     * @param fileId the UUID of the file whose content is to be retrieved
     * @return a ResponseEntity containing the file content as a String, or an error message if not found
     */
    @GetMapping("/view/{fileId}")
    public ResponseEntity<String> viewFile(@PathVariable("fileId") String fileId) {
        try {
            String content = fileStorageService.getFileContent(fileId);
            return ResponseEntity.ok(content);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error reading file content");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<FileMetadata>> getAllFiles(
            @RequestParam(required = false) String uploadedBy,
            @RequestParam(required = false) String fileType) {
        List<FileMetadata> files = fileStorageService.getAllFiles(uploadedBy, fileType);
        return ResponseEntity.ok(files);
    }

    @GetMapping("/download/{fileIdentifier}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileIdentifier) {
        try {
            Resource resource = fileStorageService.loadFileAsResource(fileIdentifier);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (FileNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
