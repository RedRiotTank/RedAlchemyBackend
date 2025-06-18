import db from "../db.js";
import { v4 as uuidv4 } from "uuid";

export const getBaseElements = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Element LIMIT 4");
    res.json(rows);
  } catch (error) {
    console.error("DB error:", error);
    res
      .status(500)
      .json({ error: "Error fetching base elements", details: error.message });
  }
};

export const getAllElements = async (req, res) => {
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

export const proposeElement = async (req, res) => {
  const { name, icon, created_by } = req.body;

  if (!name || !icon || !created_by) {
    return res.status(400).json({ error: "Missing name, icon, or created_by" });
  }

  try {
    const id = uuidv4();
    await db.query(
      "INSERT INTO ProposedElement (id, name, icon, created_by) VALUES (?, ?, ?, ?)",
      [id, name, icon, created_by]
    );
    res.status(201).json({ message: "Element proposed", id });
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ error: "Error proposing element" });
  }
};
