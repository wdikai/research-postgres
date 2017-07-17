'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `CREATE TABLE public.countries
      (
          "id" serial NOT NULL,
          "name" character varying(100) NOT NULL,
          "border" geometry NULL,
          "createdAt" integer NOT NULL,
          "updatedAt" integer NOT NULL,
          PRIMARY KEY ("id")
      )`
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `DROP TABLE public.countries;`
    );
  }
};