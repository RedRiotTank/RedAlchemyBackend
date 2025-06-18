const db = require("../db");

exports.findFusion = async (req, res) => {
  const { id1, id2 } = req.query;

  if (!id1 || !id2) {
    return res.status(400).json({ error: "Missing element IDs" });
  }

  try {
    const [rows] = await db.query(
      `SELECT result_id FROM Fusion 
       WHERE (element1_id = ? AND element2_id = ?) 
          OR (element1_id = ? AND element2_id = ?)`,
      [id1, id2, id2, id1] // conmutativa
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No fusion found" });
    }

    const [result] = await db.query("SELECT * FROM Element WHERE id = ?", [
      rows[0].result_id,
    ]);
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Error finding fusion" });
  }
};
