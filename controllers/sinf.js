const pool = require("../config/database");

const getAll = async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT sinf.id ,sinf.name AS sinf_name, maktab.name AS maktab_name FROM sinf JOIN maktab ON sinf.maktab_id=maktab.id"
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
      `INSERT INTO sinf(name,maktab_id) VALUES($1,$2) RETURNING *`,
      [req.body.name, req.body.maktab_id]
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
    const old = await pool.query("SELECT * FROM sinf WHERE id=$1", [
      req.params.id,
    ]);
    console.log(old.rows[0]);
    const data = await pool.query(
      "UPDATE sinf SET name=$1,maktab_id=$2 WHERE id=$3 RETURNING *",
      [
        req.body.name || old.rows[0].name,
        req.body.maktab_id || old.rows[0].maktab_id,
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
    await pool.query("DELETE FROM sinf WHERE id=$1", [req.params.id]);
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
      "SELECT sinf.name AS sinf_name, maktab.name AS maktab_name FROM sinf JOIN maktab ON sinf.maktab_id=maktab.id where sinf.id=$1",
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
