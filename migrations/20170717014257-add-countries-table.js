module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS public.countries
      (
          "id" serial NOT NULL,
          "name" character varying(100) NOT NULL,
          "border" geometry NULL,
          "created_at" integer NOT NULL,
          "updated_at" integer NOT NULL,
          PRIMARY KEY ("id")
      )`
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS public.countries;`
    ); 
  }
};