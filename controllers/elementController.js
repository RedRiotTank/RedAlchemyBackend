const db = require("../db");

exports.getAllElements = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Element");
    res.json(rows);
  } catch (error) {
    console.error("DB error:", error);
    res
      .status(500)
      .json({ error: "Error fetching elements", details: error.message });
  }
};
