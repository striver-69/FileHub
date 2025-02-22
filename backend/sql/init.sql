CREATE TABLE files_metadata (
                                file_id CHAR(36) PRIMARY KEY, -- Use UUID as a string (36 characters)
                                file_name VARCHAR(255) NOT NULL,
                                file_path TEXT NOT NULL,
                                file_size BIGINT NOT NULL,
                                file_type VARCHAR(50) NOT NULL,
                                uploaded_by CHAR(36) NOT NULL, -- Reference to a user's UUID; assumes a users table exists
                                uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                storage_url TEXT NOT NULL,
                                permissions JSON NOT NULL,  -- e.g., {"user1": "read", "user2": "write"}
                                metadata JSON NOT NULL      -- e.g., {"resolution": "1920x1080", "duration": "180"}
);

-- Add indexes for performance
CREATE INDEX idx_file_name ON files_metadata(file_name);
CREATE INDEX idx_uploaded_by ON files_metadata(uploaded_by);
CREATE INDEX idx_file_type ON files_metadata(file_type);

-- Example of a generated column for a JSON attribute and indexing it
ALTER TABLE files_metadata
    ADD COLUMN duration INT GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(metadata, '$.duration')) + 0) VIRTUAL,
ADD INDEX idx_duration (duration);

INSERT INTO files_metadata (file_id, file_name, file_path, file_size, file_type, uploaded_by, storage_url, metadata,permissions)
VALUES ('123e4567-e89b-12d3-a456-426614174000', 'example.txt', '/uploads/example.txt', 1024, 'text/plain', 'user-123', 'http://storage.example.com/example.txt', '{"resolution": "1080p"}','{"user1": "read", "user2": "write"}');