'use strict';
/* istanbul ignore file */
const mysql = require('../index')

const LookForApp = async (app_name) => {
    const query = `select * from application where app = ?`;
    const values = [app_name];
    const info = await mysql.query(query, values);
    // console.log("🚀 ~ file: index.js:9 ~ LookForApp ~ info:", JSON.stringify(info, null, 2));
    return info;
    
}

const LookForUser = async (id_user, token) => {
    //return await mysql.query(`select * from user where id_user = '${id_user}' and token = '${token}'`)
    const query = `select * from user where id_user = ? and token = ?`;
    const values = [id_user, token];
    const info = await mysql.query(query, values);
    // console.log("🚀 ~ file: index.js:9 ~ LookForApp ~ info:", JSON.stringify(info, null, 2));
    return info;

}

const RegisterUser = async (pk_app, id_user, token) => {
    //return await mysql.query(`insert into user(pk_app,id_user,token) values (${pk_app},${id_user},'${token}')`)

    const query = 'INSERT INTO user (pk_app, id_user, token) VALUES (?, ?, ?)';
    const values = [pk_app, id_user, token];
    const info = await mysql.query(query, values);
    // console.log("🚀 ~ file: index.js:9 ~ LookForApp ~ info:", JSON.stringify(info, null, 2));
    return info;
}

const UnregisterUser = async (pk_app, id_user, token) => {
    //return await mysql.query(`delete from user where pk_app = ${pk_app} and id_user = ${id_user} and token = '${token}'`)
   
    const query = 'DELETE FROM user WHERE pk_app = ? AND id_user = ? AND token = ?';
    const values = [pk_app, id_user, token];
    const info = await mysql.query(query, values);
    return info;
}

const LookForUserByIdAndAPP = async (id_user, pk_app) => {
    return await mysql.query('SELECT * FROM user WHERE id_user = ? AND pk_app = ?', [id_user, pk_app]);
}

const ValidateBasicAuth = async (token) => {
    return await mysql.query('SELECT * FROM application_users WHERE token = ?', [token]);
}

module.exports = {
    LookForApp,
    LookForUser,
    RegisterUser,
    UnregisterUser,
    LookForUserByIdAndAPP,
    ValidateBasicAuth
}
