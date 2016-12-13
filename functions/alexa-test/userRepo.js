'use strict';

const db = require('./db');

module.exports = {
  getUserByName
}

///////////////////////////////////////////

function getUserByName(userName){
  return db.users.find( user => {
    return user.name.toUpperCase() === userName.toUpperCase();
  });
}