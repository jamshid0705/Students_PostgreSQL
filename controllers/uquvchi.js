const pool = require("../config/database");

const getAll = async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT uquvchilar.id,uquvchilar.tugilgan_kun,uquvchilar.tel,uquvchilar.gender ,uquvchilar.name AS uquvchi_name, sinf.name AS sinf_name FROM uquvchilar JOIN sinf ON uquvchilar.sinf_id=sinf.id"
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
      `INSERT INTO uquvchilar(name,tugilgan_kun,tel,gender,sinf_id) VALUES($1,$2,$3,$4,$5) RETURNING *`,
      [req.body.name,req.body.tugilgan_kun,req.body.tel,req.body.gender, req.body.sinf_id]
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
    const old = await pool.query("SELECT * FROM uquvchilar WHERE id=$1", [
      req.params.id,
    ]);
    console.log(old.rows[0]);
    const data = await pool.query(
      "UPDATE uquvchilar SET name=$1,tugilgan_kun=$2,tel=$3,gender=$4,sinf_id=$5 WHERE id=$6 RETURNING *",
      [
        req.body.name || old.rows[0].name,
        req.body.tugilgan_kun || old.rows[0].tugilgan_kun,
        req.body.tel || old.rows[0].tel,
        req.body.gender || old.rows[0].gender,
        req.body.sinf_id || old.rows[0].sinf_id,
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
    await pool.query("DELETE FROM uquvchilar WHERE id=$1", [req.params.id]);
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
      "SELECT sinf.name AS sinf_name, .name AS tuman_name FROM maktab  JOIN tuman ON maktab.tuman_id=tuman.id where maktab.id=$1",
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
