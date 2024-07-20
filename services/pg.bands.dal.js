const DEBUG = true;

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bands',
  password: '1234',
  port: 5432,
});


//this function gets all the bands using promises with debug mode

function getBands() {
  if(DEBUG) console.log("getBands()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * FROM bands ORDER BY band_name ASC"
    pool.query(sql, [], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

//this function gets a single band by id using promises with debug mode

function getBandByBandId(id) {
  if(DEBUG) console.log("getBandByBandId()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * FROM bands WHERE band_id = $1";
    pool.query(sql, [id], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

//this function adds a band using promises with debug mode

function addBand(band) {
  if(DEBUG) console.log("addBand()");
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO bands (band_name, band_singer, band_label, number_albums, favourite_album) VALUES ($1, $2, $3, $4, $5);";
    pool.query(sql, [band.band_name, band.band_singer, band.band_label, band.number_albums, band.favourite_album], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
}

//this function updates a band using promises with debug mode

function updateBand(band) {
  if(DEBUG) console.log("updateBand()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE bands SET band_name = $1, band_singer = $2, band_label = $3, number_albums = $4, favourite_album = $5 WHERE band_id = $6";
    pool.query(sql, [band.band_name, band.band_singer, band.band_label, band.number_albums, band.favourite_album, band.band_id], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
}

//this function deletes a band using promises with debug mode

function deleteBandByID(id) {
  if(DEBUG) console.log("deleteBand()");
  return new Promise(function(resolve, reject) {
    const sql = "DELETE FROM bands WHERE band_id = $1";
    pool.query(sql, [id], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
}

module.exports = {
  getBands,
  getBandByBandId,
  addBand,
  updateBand,
  deleteBandByID
};
