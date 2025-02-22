CREATE TABLE files_metadata (
                                file_id CHAR(36) PRIMARY KEY, -- Use UUID as a string (36 characters)
                                file_name VARCHAR(255) NOT NULL,
                                file_path TEXT NOT NULL,
                                file_size BIGINT NOT NULL,
                                file_type VARCHAR(50) NOT NULL,
                                uploaded_by CHAR(36) NOT NULL, -- Reference to a user's UUID; assumes a users table exists
                                uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX idx_file_name ON files_metadata(file_name);
CREATE INDEX idx_uploaded_by ON files_metadata(uploaded_by);
CREATE INDEX idx_file_type ON files_metadata(file_type);

INSERT INTO files_metadata (file_id, file_name, file_path, file_size, file_type, uploaded_by)
VALUES ('123e4567-e89b-12d3-a456-426614174000', 'example.txt', '/uploads/example.txt', 1024, 'text/plain', 'user-123');