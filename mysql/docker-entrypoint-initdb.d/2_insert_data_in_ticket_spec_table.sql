INSERT INTO ticket_spec(
    id,
    ticket_type,
    price,
    min_amount_per_order,
    max_amount_per_day
) 
VALUES 
    (uuid(), 'A', 5000, 10 ,1),
    (uuid(), 'B', 2500, 20 ,2),
    (uuid(), 'C', 1000, 30 ,2),
    (uuid(), 'D', 500, 40 ,3);