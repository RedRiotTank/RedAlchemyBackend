-- ELEMENT TABLE --
CREATE TABLE IF NOT EXISTS Element (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(10),
    created_by VARCHAR(100), -- puede ser un username o email
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- BASE ELEMENTS --
INSERT IGNORE INTO Element (id, name, icon, created_by)
VALUES
  ("6482d073-4bc2-11f0-83bb-00e04c73347e", 'Fire', '🔥', 'system'),
  ("6482d54b-4bc2-11f0-83bb-00e04c73347e", 'Water', '💧', 'system'),
  ("6482d6c6-4bc2-11f0-83bb-00e04c73347e", 'Dirt', '🌱', 'system'),
  ("75993a14-4c2d-11f0-83bb-00e04c73347e", 'Air', '💨', 'system');

-- EXAMPLE GENERATED ELEMENT --
INSERT IGNORE INTO Element (id, name, icon, created_by)
VALUES ("75993a75-4c2d-11f0-83bb-00e04c73347e", 'Lava', '🌋', 'system');

-- FUSION TABLE --
CREATE TABLE IF NOT EXISTS Fusion (
    element1_id CHAR(36) NOT NULL,
    element2_id CHAR(36) NOT NULL,
    result_id   CHAR(36) NOT NULL,
    created_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (element1_id, element2_id),
    FOREIGN KEY (element1_id) REFERENCES Element(id) ON DELETE CASCADE,
    FOREIGN KEY (element2_id) REFERENCES Element(id) ON DELETE CASCADE,
    FOREIGN KEY (result_id)   REFERENCES Element(id) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- EXAMPLE FUSION dirt + fire = lava --
INSERT IGNORE INTO Fusion (element1_id, element2_id, result_id, created_by)
VALUES (
  LEAST('6482d073-4bc2-11f0-83bb-00e04c73347e', '6482d6c6-4bc2-11f0-83bb-00e04c73347e'),
  GREATEST('6482d073-4bc2-11f0-83bb-00e04c73347e', '6482d6c6-4bc2-11f0-83bb-00e04c73347e'),
  '75993a75-4c2d-11f0-83bb-00e04c73347e',
  'system'
);

-- PROPOSED ELEMENTS TABLE --
CREATE TABLE IF NOT EXISTS ProposedElement (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(10),
    created_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- PROPOSED FUSIONS TABLE --
CREATE TABLE IF NOT EXISTS ProposedFusion (
    element1_id CHAR(36) NOT NULL,
    element2_id CHAR(36) NOT NULL,
    result_name VARCHAR(100) NOT NULL,
    result_icon VARCHAR(10),
    created_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (element1_id, element2_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
