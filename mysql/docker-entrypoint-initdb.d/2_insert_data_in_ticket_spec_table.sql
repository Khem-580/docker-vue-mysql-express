INSERT INTO ticket_spec(
    ticket_type,
    price,
    min_amount_per_order,
    max_amount_per_day
) 
VALUES 
    ('A', 5000, 1 ,10),
    ('B', 2500, 2 ,20),
    ('C', 1000, 3 ,20),
    ('D', 500, 3 ,40);