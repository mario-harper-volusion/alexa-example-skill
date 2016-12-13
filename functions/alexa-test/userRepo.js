'use strict';

const TEAM_NAMES = {
  koopas: 'koopas',
  jesters: 'jesters'
};

const db = {
  users : [
    {
      name: 'mario',
      team: TEAM_NAMES.koopas
    }
  ]
}

module.exports = {
  getUserByName
}

///////////////////////////////////////////

function getUserByName(userName){
  return db.users.find( user => {
    return user.name.toUpperCase() === userName.toUpperCase();
  });
}