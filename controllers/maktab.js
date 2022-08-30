const pool = require("../config/database");

const getAll = async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT maktab.id ,maktab.name AS maktab_name, tuman.name AS tuman_name FROM maktab JOIN tuman ON maktab.tuman_id=tuman.id"
    );
    res.status(200).json({
      data: data.rows,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const add = async (req, res) => {
  try {
    const data = await pool.query(
      `INSERT INTO maktab(name,tuman_id) VALUES($1,$2) RETURNING *`,
      [req.body.name, req.body.tuman_id]
    );
    res.status(201).json({
      data: data.rows,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const edit = async (req, res) => {
  try {
    const old = await pool.query("SELECT * FROM maktab WHERE id=$1", [
      req.params.id,
    ]);
    console.log(old.rows[0]);
    
    const data = await pool.query(
      "UPDATE maktab SET name=$1,tuman_id=$2 WHERE id=$3 RETURNING *",
      [
        req.body.name || old.rows[0].name,
        req.body.tuman_id || old.rows[0].tuman_id,
        req.params.id,
      ]
    );

    res.status(200).json({
      data: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteData = async (req, res) => {
  try {
    await pool.query("DELETE FROM maktab WHERE id=$1", [req.params.id]);
    res.status(200).json({
      message: "Malumot ochirildi",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOne = async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT maktab.name AS maktab_name, tuman.name AS tuman_name FROM maktab  JOIN tuman ON maktab.tuman_id=tuman.id where maktab.id=$1",
      [req.params.id]
    );
    res.status(200).json({
      data: data.rows,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = { getAll, add, edit, deleteData, getOne };
