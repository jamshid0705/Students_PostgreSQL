const pool = require("../config/database");

const getAll = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM tuman");
    res.status(200).json({
      data:data.rows,
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
      `INSERT INTO tuman(name) VALUES($1) RETURNING *`,
      [req.body.name]
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


const edit=async(req,res)=>{
  try {
    const data=await pool.query('UPDATE tuman SET name=$1 WHERE id=$2 RETURNING *',[req.body.name,req.params.id])

    res.status(200).json({
      data:data.rows
    })
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}


const deleteData=async(req,res)=>{
  try {
    await pool.query('DELETE FROM tuman WHERE id=$1',[req.params.id])
    res.status(200).json({
      message:'Malumot ochirildi'
    })
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}

const getOne=async(req,res)=>{
  try {
    const data=await pool.query('SELECT * FROM tuman WHERE id=$1',[req.params.id])
    res.status(200).json({
      data:data.rows
    })
  } catch (error) {
    res.status(404).json({
      message:error.message
    })
  }
}

module.exports = { getAll, add ,edit,deleteData,getOne};
