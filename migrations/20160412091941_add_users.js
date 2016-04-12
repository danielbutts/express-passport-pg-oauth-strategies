
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('email').unique();
    table.string('oauth_service');
    table.string('oauth_service_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
