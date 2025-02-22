package com.filehub.backend.repository;

import com.filehub.backend.model.FileMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileMetadataRepository extends JpaRepository<FileMetadata, String> {
    List<FileMetadata> findByUploadedBy(String uploadedBy);
    List<FileMetadata> findByFileType(String fileType);
    List<FileMetadata> findByUploadedByAndFileType(String uploadedBy, String fileType);
}
