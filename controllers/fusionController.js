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
  let { id1, id2, result_name, result_icon, created_by } = req.body;

  if (!id1 || !id2 || !result_name || !result_icon || !created_by) {
    return res.status(400).json({ error: "Missing fusion data or created_by" });
  }

  if (id1 > id2) {
    [id1, id2] = [id2, id1];
  }

  try {
    await db.query(
      `INSERT INTO ProposedFusion 
       (element1_id, element2_id, result_name, result_icon, created_by)
       VALUES (?, ?, ?, ?, ?)`,
      [id1, id2, result_name, result_icon, created_by]
    );
    res.status(201).json({ message: "Fusion proposed" });
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ error: "Error proposing fusion" });
  }
};
