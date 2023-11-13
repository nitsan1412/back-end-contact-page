// const sqlite3 = require("sqlite3");
// const path = require("path");
const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(`${process.env.LINK_TO_ATLAS}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongo local db is connected"));

const createStringsForQueries = async (data) => {
  const fields = await Object.keys(data);
  const values = await Object.values(data);
  let fieldsString = "";
  let valuesString = "";
  await fields.forEach((field, index) => {
    fieldsString = fieldsString + (index !== 0 ? ", " + field : field);
    valuesString = valuesString + (index !== fields.length - 1 ? "?, " : "? ");
  });

  return { fields, values, fieldsString, valuesString };
};

exports.createItem = async (table, item) => {
  try {
    let newItem = item;
    if (table === "user") {
      const newPassword = await bcrypt.hash(item.password, 10);
      newItem = await { ...item, password: newPassword };
    }
    let { values, fieldsString, valuesString } = await createStringsForQueries(
      newItem
    );
    return await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO ${table} (${fieldsString}) VALUES (${valuesString})`,
        values,
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve("success");
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

exports.findItem = async (table, data) => {
  try {
    const { values, fieldsString, valuesString } =
      await createStringsForQueries(data);
    return await new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM ${table} WHERE ${fieldsString} = ${valuesString}`,
        values,
        (err, user) => {
          if (err) {
            reject(err);
          } else {
            resolve(user);
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

exports.count = async (table) => {
  try {
    return await new Promise((resolve, reject) => {
      db.get(`SELECT COUNT(*) as total FROM ${table}`, (err, count) => {
        if (err) {
          reject(err);
        } else {
          resolve(count);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

exports.getAllData = async (table, limit, offset) => {
  try {
    if (limit !== null) {
      return await new Promise((resolve, reject) => {
        db.all(
          `SELECT * FROM ${table} LIMIT ? OFFSET ?`,
          [limit, offset || 0],
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          }
        );
      });
    } else {
      return await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM ${table}`, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    }
  } catch (error) {
    throw error;
  }
};

exports.deleteItem = async (table, id) => {
  try {
    return await new Promise((resolve, reject) => {
      db.get(`DELETE FROM ${table} WHERE id = ? `, [id], (err, data) => {
        if (err) {
          reject("err", err);
        } else {
          resolve(data);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};
