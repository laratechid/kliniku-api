INSERT INTO `clinic` (
  `name`, `isVerified`, `lon`, `lat`, `images`, `paymentSupports`, `createdAt`, `updatedAt`, `deletedAt`
) VALUES
(
  'Clinic A', 
  1, 
  '106.8456', 
  '-6.2088', 
  JSON_ARRAY('https://dummyimage.com/600x400/4f4f4e/ffffff'), 
  JSON_ARRAY('Cash', 'Insurance'), 
  CURRENT_TIMESTAMP(6), 
  CURRENT_TIMESTAMP(6), 
  NULL
),
(
  'Clinic B', 
  0, 
  '110.4126', 
  '-7.8014', 
  JSON_ARRAY('https://dummyimage.com/600x400/4f4f4e/ffffff'), 
  JSON_ARRAY('Cash'), 
  CURRENT_TIMESTAMP(6), 
  CURRENT_TIMESTAMP(6), 
  NULL
),
(
  'Clinic C', 
  1, 
  '112.7521', 
  '-7.2575', 
  JSON_ARRAY('https://dummyimage.com/600x400/4f4f4e/ffffff'), 
  JSON_ARRAY('Insurance', 'Credit Card'), 
  CURRENT_TIMESTAMP(6), 
  CURRENT_TIMESTAMP(6), 
  NULL
);


INSERT INTO `user` (`name`, `email`, `phone`, `age`, `ktp`, `lon`, `lat`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
  ('John Doe', 'john.doe@example.com', '081234567890', 28, '1234567890123456', '106.816666', '-6.200000', 
    CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), NULL),

  ('Jane Smith', 'jane.smith@example.com', '081298765432', 34, '9876543210987654', '106.845130', '-6.208763', 
    CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), NULL),

  ('Alice Johnson', 'alice.johnson@example.com', '081377788899', 30, '5678901234567890', '107.609810', '-6.914744', 
    CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), NULL);

insert into `poly` (`image`, `name`) values ('https://dummyimage.com/600x400/4f4f4e/ffffff', 'Poli Gigi');
insert into `poly` (`image`, `name`) values ('https://dummyimage.com/600x400/4f4f4e/ffffff', 'Poli Jantung');
insert into `poly` (`image`, `name`) values ('https://dummyimage.com/600x400/4f4f4e/ffffff', 'Poli Anak');
insert into `poly` (`image`, `name`) values ('https://dummyimage.com/600x400/4f4f4e/ffffff', 'Poli Bedah');
insert into `poly` (`image`, `name`) values ('https://dummyimage.com/600x400/4f4f4e/ffffff', 'Poli Umum');