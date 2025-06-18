import db from "../db.js";

export const findFusion = async (req, res) => {
  let { id1, id2 } = req.query;

  if (!id1 || !id2) {
    return res.status(400).json({ error: "Missing element IDs" });
  }

  if (id1 > id2) {
    [id1, id2] = [id2, id1];
  }

  try {
    const [rows] = await db.query(
      `SELECT result_id FROM Fusion 
       WHERE element1_id = ? AND element2_id = ?`,
      [id1, id2]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No fusion found" });
    }

    const [result] = await db.query("SELECT * FROM Element WHERE id = ?", [
      rows[0].result_id,
    ]);

    res.json(result[0]);
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ error: "Error finding fusion" });
  }
};

export const proposeFusion = async (req, res) => {
  let { element1_id, element2_id, element_result_id, created_by } = req.body;

  if (!element1_id || !element2_id || !element_result_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (element1_id > element2_id) {
    [element1_id, element2_id] = [element2_id, element1_id];
  }

  try {
    await db.query(
      `INSERT INTO ProposedFusion (element1_id, element2_id, element_result_id, created_by)
       VALUES (?, ?, ?, ?)`,
      [element1_id, element2_id, element_result_id, created_by || null]
    );

    res.status(201).json({ message: "Fusion proposal added successfully" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json({ error: "Fusion proposal already exists" });
    } else {
      console.error("DB error:", error);
      res.status(500).json({ error: "Error adding fusion proposal" });
    }
  }
};
