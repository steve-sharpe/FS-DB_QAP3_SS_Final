const DEBUG = true;

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bands',
  password: '1234',
  port: 5432,
});


//this function gets all the bands

async function getBands() {
  if (DEBUG) console.log("getBands called");
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM bands');
    return res.rows;
  }
  finally {
    client.release();
  }
}

// this function gets the band name

async function getBandName() {
  if (DEBUG) console.log("getBandName called");
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT band_name FROM bands');
    return res.rows;
  }
  finally {
    client.release();
  }
}


//this function gets a band by its id

async function getBandByBandId(id) {
  if (DEBUG) console.log("getBandByBandId called");
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM bands WHERE band_id = $1', [id]);
    return res.rows;
  }
  finally {
    client.release();
  }
}

//this function adds a band

async function addBand(band_name, band_singer, band_label, number_albums, favourite_album) {
  if (DEBUG) console.log("addBand called");
  const client = await pool.connect();
  try {
    await client.query('INSERT INTO bands (band_name, band_singer, band_label, number_albums, favourite_album) VALUES ($1, $2, $3, $4, $5)', [band_name, band_singer, band_label, number_albums, favourite_album]);
  }
  finally {
    client.release();
  }
}

//this function updates a band

async function updateBand(id, band_name, band_singer, band_label, number_albums, favourite_album) {
  if (DEBUG) console.log("updateBand called");
  const client = await pool.connect();
  try {
    await client.query('UPDATE bands SET band_name = $1, band_singer = $2, band_label = $3, number_albums = $4, favourite_album = $5 WHERE band_id = $6', [band_name, band_singer, band_label, number_albums, favourite_album, id]);
  }
  finally {
    client.release();
  }
}

//this function deletes a band

async function deleteBand(band) {
  if (DEBUG) console.log("deleteBand called");
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM bands WHERE band_id = $1', [band]);
  }
  finally {
    client.release();
  }
}

//this function deletes a band by its id

async function deleteBandById(id) {
  if (DEBUG) console.log("deleteBandById called");
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM bands WHERE band_id = $1', [id]);
  }
  finally {
    client.release();
  }
}

module.exports = {
  getBands,
  getBandByBandId,
  addBand,
  updateBand,
  deleteBand,
  deleteBandById,
  getBandName
};


