const pool = require('../utils/pool');

module.exports = class Cat {
  id;
  catName;
  age;
  favoriteToy;

  constructor(row) {
    this.id = row.id;
    this.catName = row.cat_name;
    this.age = row.age;
    this.favoriteToy = row.favorite_toy;
  }

  static async insert({ catName, age, favoriteToy }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          cats (cat_name, age, favorite_toy)
        VALUES
          ($1, $2, $3)
        RETURNING
          *;
      `,
      [catName, age, favoriteToy]
    );
    
    return new Cat(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          cats
      `
    );
    
    return rows.map((row) => new Cat(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          cats
        WHERE
          id=$1
      `,
      [id]
    );
    
    return new Cat(rows[0]);
  }

  static async updateById(id, { catName, age, favoriteToy }) {
    const { rows } = await pool.query(
      `
        UPDATE
          cats
        SET
          cat_name=$2,
          age=$3,
          favorite_toy=$4
        WHERE
          id=$1
        RETURNING
          *;
      `,
      [id, catName, age, favoriteToy]
    );
    if (!rows[0]) return null;
    return new Cat(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
          cats
        WHERE
          id=$1
        RETURNING
          *
      `,
      [id]
    );
    
    return new Cat(rows[0]);
  }
};
