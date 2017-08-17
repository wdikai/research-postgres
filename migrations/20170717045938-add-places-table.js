module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize
      .query(
        `CREATE TABLE IF NOT EXISTS public.places
        (
            "id" serial NOT NULL,
            "name" character varying(100) NOT NULL,
            "address" character varying(100) NOT NULL,
            "location" geometry NULL,
            "opening_hours" json NULL,
            "created_at" integer NOT NULL,
            "updated_at" integer NOT NULL,
            PRIMARY KEY ("id")
        )`
      )
      .then(() => queryInterface.sequelize.query(
        `CREATE TABLE IF NOT EXISTS public.types
        (
            "id" serial NOT NULL,
            "type" character varying(50) NOT NULL,
            PRIMARY KEY ("id")
        )`
      ))
      .then(() => queryInterface.sequelize.query(
        `CREATE TABLE IF NOT EXISTS public.types_by_places
        (
            "id" serial NOT NULL,
            "place_id" integer NOT NULL,
            "type_id" integer NOT NULL,
            PRIMARY KEY ("id"),
            CONSTRAINT "fk_place_id" FOREIGN KEY (place_id) REFERENCES public.places (id) ON UPDATE CASCADE ON DELETE CASCADE,
            CONSTRAINT "fk_type_id" FOREIGN KEY (type_id) REFERENCES public.types (id) ON UPDATE CASCADE ON DELETE CASCADE
      )`
      ))
      .then(() => queryInterface.sequelize.query(
        `INSERT INTO "places" 
        ("id","name","address","location","opening_hours","created_at","updated_at")
        VALUES 
        (DEFAULT,'Cleveroad','вулиця Трінклера, 9, Харків',ST_GeomFromGeoJSON('{"type":"Point","coordinates":[50.012619, 36.239189]}'),'{"timeZoneOffset":-180,"workShedule":{"1":{"openAt":"09:00","closeAt":"20:00"},"2":{"openAt":"09:00","closeAt":"20:00"},"3":{"openAt":"09:00","closeAt":"20:00"},"4":{"openAt":"09:00","closeAt":"20:00"},"5":{"openAt":"09:00","closeAt":"20:00"},"6":null,"7":null}}',0,0);`
      ))
      .then(() => queryInterface.sequelize.query(
        `INSERT INTO "types" 
        ("id","type")
        VALUES 
        (DEFAULT,'office');`
      ))
      .then(() => queryInterface.sequelize.query(
        `INSERT INTO "types_by_places" 
        ("id","place_id", "type_id")
        VALUES 
        (DEFAULT, 1, 1);`
      ));


  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize
      .query(
        `DROP TABLE IF EXISTS public.typesByPlaces;`
      )
      .then(() => queryInterface.sequelize.query(
        `DROP TABLE IF EXISTS public.types;`
      ))
      .then(() => queryInterface.sequelize.query(
        `DROP TABLE IF EXISTS cpublic.places;`
      ));
  }
};