'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `CREATE TABLE public.places
      (
          "id" serial NOT NULL,
          "name" character varying(100) NOT NULL,
          "type" character varying(50) NOT NULL,
          "address" character varying(100) NOT NULL,
          "location" geometry NULL,
          "createdAt" integer NOT NULL,
          "updatedAt" integer NOT NULL,
          PRIMARY KEY ("id")
      )`
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `DROP TABLE public.places;`
    );
  }
};