CREATE TABLE Element (
    id CHAR(36) PRIMARY KEY,        
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(10)                
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


INSERT INTO Element (id, name, icon)
VALUES
  (UUID(), 'Fuego', '🔥'),
  (UUID(), 'Agua', '💧'),
  (UUID(), 'Tierra', '🌱');

SELECT * FROM Element;

CREATE TABLE Fusion (
    element1_id CHAR(36) NOT NULL,
    element2_id CHAR(36) NOT NULL,
    result_id   CHAR(36) NOT NULL,
    PRIMARY KEY (element1_id, element2_id),
    FOREIGN KEY (element1_id) REFERENCES Element(id) ON DELETE CASCADE,
    FOREIGN KEY (element2_id) REFERENCES Element(id) ON DELETE CASCADE,
    FOREIGN KEY (result_id)   REFERENCES Element(id) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

