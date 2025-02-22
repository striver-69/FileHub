package com.filehub.backend.service;

import com.filehub.backend.model.FileMetadata;
import com.filehub.backend.repository.FileMetadataRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Service for handling file storage operations.
 * <p>
 * This service handles the physical storage of files on disk in the "storage" directory,
 * as well as persisting and retrieving file metadata from the SQL database.
 * </p>
 */
@Service
public class FileStorageService {

    /**
     * Directory where uploaded files are stored.
     * This value can be configured in application.properties using the key 'file.upload-dir'.
     */
    @Value("${file.upload-dir:storage}")
    private String uploadDir;

    private final FileMetadataRepository fileMetadataRepository;

    /**
     * Constructs a new FileStorageService.
     *
     * @param fileMetadataRepository the repository for persisting file metadata
     */
    public FileStorageService(FileMetadataRepository fileMetadataRepository) {
        this.fileMetadataRepository = fileMetadataRepository;
    }

    /**
     * Stores an uploaded file on disk and persists its metadata in the database.
     *
     * @param file       the uploaded file
     * @param uploadedBy the UUID of the user who uploaded the file
     * @return the saved {@link FileMetadata} object containing metadata about the file
     * @throws IOException if an error occurs while storing the file
     */
    public FileMetadata storeFile(MultipartFile file, String uploadedBy) throws IOException {
        // Ensure the storage directory exists
        Path storagePath = Paths.get(uploadDir);
        if (!Files.exists(storagePath)) {
            Files.createDirectories(storagePath);
        }

        // Generate a unique file ID and file name
        String fileId = UUID.randomUUID().toString();
        String originalFilename = file.getOriginalFilename();
        String uniqueFileName = fileId + "_" + originalFilename;
        Path targetLocation = storagePath.resolve(uniqueFileName);

        // Save the file to disk
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        // Create and populate the metadata entity
        FileMetadata metadata = new FileMetadata();
        metadata.setFileId(fileId);
        metadata.setFileName(originalFilename);
        metadata.setFilePath(targetLocation.toAbsolutePath().toString());
        metadata.setFileSize(file.getSize());
        metadata.setFileType(file.getContentType());
        metadata.setUploadedBy(uploadedBy);
        metadata.setUploadedAt(LocalDateTime.now());
        // lastModified will be handled by the DB update via annotation

        return fileMetadataRepository.save(metadata);
    }

    /**
     * Retrieves the content of a stored file as a string.
     * <p>
     * This method assumes the file is text-based.
     * </p>
     *
     * @param fileId the UUID (as String) of the file to retrieve
     * @return the file content as a String
     * @throws IOException if an error occurs while reading the file
     * @throws RuntimeException if no file is found with the given ID
     */
    public String getFileContent(String fileId) throws IOException {
        Optional<FileMetadata> fileOpt = fileMetadataRepository.findById(fileId);
        if (fileOpt.isEmpty()) {
            throw new RuntimeException("File not found with id: " + fileId);
        }
        FileMetadata metadata = fileOpt.get();
        Path filePath = Paths.get(metadata.getFilePath());
        return Files.readString(filePath);
    }

    public List<FileMetadata> getAllFiles(String uploadedBy, String fileType) {
        if (uploadedBy != null && fileType != null) {
            return fileMetadataRepository.findByUploadedByAndFileType(uploadedBy, fileType);
        } else if (uploadedBy != null) {
            return fileMetadataRepository.findByUploadedBy(uploadedBy);
        } else if (fileType != null) {
            return fileMetadataRepository.findByFileType(fileType);
        }
        return fileMetadataRepository.findAll();
    }
}
