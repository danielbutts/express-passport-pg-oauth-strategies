var knex = require('../../db/knex');

exports.findOrCreate = function(strategy, profile_id, cb, opts) {
  opts = opts || {};
  return knex('users').where({
    oauth_service: strategy,
    oauth_service_id: profile_id
  }).first().then(function(user){
    console.log(user);
    if (user) {
      console.log('already a user...');
      return cb(null, user);
    } else {
      console.log('save a new user...');
      knex('users').insert({
        email: opts.email || null,
        oauth_service: strategy,
        oauth_service_id: profile_id
      }).returning('*').then(function(user){
        return cb(null, user);
      });
    }

  });
}
