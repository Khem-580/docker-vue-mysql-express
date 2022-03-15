CREATE TABLE ticket_spec (
    id VARCHAR(36) PRIMARY KEY,
    ticket_type VARCHAR(31) NOT NULL,
    price FLOAT NOT NULL,
    min_amount_per_order INT NOT NULL,
    max_amount_per_day FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);