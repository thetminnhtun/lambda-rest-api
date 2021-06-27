const { connection, connectToDatabase } = require("./db");
const { createErrorResponse, errorResponse } = require("./response");

exports.getAll = async (event, context) => {
  try {
    let search = "";

    if (event.queryStringParameters && event.queryStringParameters.search) {
      search = event.queryStringParameters.search;
    }

    await connectToDatabase();
    const data = await new Promise((resolve, reject) => {
      let sql = `SELECT *
      FROM   posts
      WHERE  title LIKE ?`;
      let params = [`%${search}%`];
      connection.query(sql, params, (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });
    await connection.end();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return errorResponse(error);
  }
};

exports.find = async (event, context) => {
  try {
    let id = "";

    if (event.queryStringParameters && event.queryStringParameters.id) {
      id = event.queryStringParameters.id;
    }

    await connectToDatabase();
    const data = await new Promise((resolve, reject) => {
      let sql = `SELECT *
      FROM   posts
      WHERE  id = ?`;
      let params = [id];
      connection.query(sql, params, (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });
    await connection.end();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return errorResponse(error);
  }
};

exports.create = async (event, context) => {
  try {
    let title = "";
    if (event.body) {
      let body = event.body;
      if (body.title) title = body.title;
    }

    await connectToDatabase();
    const data = await new Promise((resolve, reject) => {
      const sql = `INSERT INTO posts SET ?`;
      const params = { title: title };
      connection.query(sql, params, (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });
    await connection.end();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return errorResponse(error);
  }
};

exports.update = async (event, context) => {
  try {
    // const id = event.pathParameters.id;
    let id = "";
    let title = "";

    if (event.body) {
      let body = event.body;
      if (body.id) id = body.id;
      if (body.title) title = body.title;
    }

    // const post = await new Promise((resolve, reject) => {
    //   let sql = `select * from posts where id = ?`;
    //   let params = [id];
    //   connection.query(sql, params, (error, results, fields) => {
    //     if (error) reject(error);
    //     resolve(results);
    //   });
    // });

    // if (post) {
    //   post.title = title || post.title;
    // }

    const data = await new Promise((resolve, reject) => {
      let sql = `UPDATE posts
      SET    title = ?
      WHERE  id = ?  `;
      let params = [title, id];
      connection.query(sql, params, (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return errorResponse(error);
  }
};

exports.delete = async (event, context) => {
  try {
    // const id = event.pathParameters.id;
    let id = "";

    if (event.body) {
      let body = event.body;
      if (body.id) id = body.id;
    }

    const data = await new Promise((resolve, reject) => {
      let sql = `DELETE FROM posts
      WHERE  id = ?`;
      let params = [id];
      connection.query(sql, params, (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return errorResponse(error);
  }
};
