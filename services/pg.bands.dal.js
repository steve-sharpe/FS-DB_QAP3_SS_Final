//this is the file to interact with the pgadmin database
//it has the following functions:
//getBands - gets all the bands
//getBandByBandId - gets a band by its id
//addBand - adds a band
//updateBand - updates a band
//deleteBand - deletes a band

//this file uses the pg module to interact with the database
//it uses the Pool class to interact
//the Pool class is a connection pool
//it is used to manage multiple connections to the database

const DEBUG = true;

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bands',
  password: '1234',
  port: 5432,
});


const query = function(sql, params, callback) {
  pool.query(sql, params, callback);
};

var getBands = function() {
  if(DEBUG) console.log("bands.pg.dal.getBands()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT band_id AS _id, band_name, band_singer, band_label, number_albums, favourite_album FROM bands";
    query(sql, [], (err, result) => {
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

var getBandByBandId = function(id) {
  if(DEBUG) console.log("bands.pg.dal.getBandByBandId()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT band_id AS _id, band_name FROM bands WHERE band_id = $1";
    query(sql, [id], (err, result) => {
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

var addBand = function(band_name, band_singer, band_label, number_albums, favourite_album) {
  if(DEBUG) console.log("bands.pg.dal.addBand()");
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO public.bands (band_name, band_singer, band_label, number_albums, favourite_album) VALUES ($1, $2, $3, $4, $5);";
    query(sql, [band_name, band_singer, band_label, number_albums, favourite_album], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }
    );
  });
}

var putBand = function(band_id, band_name, band_singer, band_label, number_albums, favourite_album) {
  if(DEBUG) console.log("bands.pg.dal.putBand()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.bands SET band_name=$2, band_singer=$3, band_label=$4, number_albums=$5, favourite_album=$6 WHERE band_id=$1;";
    query(sql, [band_id, band_name, band_singer, band_label, number_albums, favourite_album], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
}

var patchBand = function(band_id, band_name, band_singer, band_label, number_albums, favourite_album) {
  if(DEBUG) console.log("bands.pg.dal.patchBand()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.bands SET band_name=$2, band_singer=$3, band_label=$4, number_albums=$5, favourite_album=$6 WHERE band_id=$1;";
    query(sql, [band_id, band_name, band_singer, band_label, number_albums, favourite_album], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
}

var deleteBand = function(id) {
  if(DEBUG) console.log("bands.pg.dal.deleteBand()");
  return new Promise(function(resolve, reject) {
    const sql = "DELETE FROM public.bands WHERE band_id = $1;";
    query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  }

  );  
}

module.exports = {
  getBands: getBands,
  getBandByBandId: getBandByBandId,
  addBand: addBand,
  putBand: putBand,
  patchBand: patchBand,
  deleteBand: deleteBand
};



