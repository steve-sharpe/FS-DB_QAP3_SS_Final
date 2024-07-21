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
    const sql = "SELECT band_id AS band_id, band_name, band_singer, band_label, number_albums, favourite_album FROM bands WHERE band_id = $1";
    pool.query(sql, [id], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows[0]);
      }
    });
  });
};

function getBandByBandId2(id) {
  if(DEBUG) console.log("getBandByBandId2()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT band_id AS _id WHERE band_id = $1"; 
    pool.query(sql, [id], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows[0]);
      }
    });
  });
};

//this function adds a band using promises with debug mode

function addBand(band_name, band_singer, band_label, number_albums, favourite_album) {
  if(DEBUG) console.log("addBand()");
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO bands (band_name, band_singer, band_label, number_albums, favourite_album) VALUES ($1, $2, $3, $4, $5);";
    pool.query(sql, [band_name, band_singer, band_label, number_albums, favourite_album], (err, result) => {
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



//this function updates a band using promises with debug mode.
// It is called updateBand instead of updateBandByID because the
// function signature is different from the delete function.


function updateBand(band_id, band_name, band_singer, band_label, number_albums, favourite_album) {
  if(DEBUG) console.log("updateBand()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE bands SET band_name = $2, band_singer = $3, band_label = $4, number_albums = $5, favourite_album = $6 WHERE band_id = $1";
    pool.query(sql, [band_id, band_name, band_singer, band_label, number_albums, favourite_album], (err, result) => {
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

function deleteBand(band_id) {
  if(DEBUG) console.log("deleteBand()");
  return new Promise(function(resolve, reject) {
    const sql = "DELETE FROM bands WHERE band_id = $1";
    pool.query(sql, [band_id], (err, result) => {
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
  getBandByBandId2,
  addBand,
  updateBand,
  deleteBandByID,
  deleteBand
};
