CREATE TABLE tickets(
    id VARCHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    full_name VARCHAR(512) NOT NULL,
    ticket_spec_id VARCHAR(36),
    amount INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_spec_id ) REFERENCES ticket_spec(id)
);