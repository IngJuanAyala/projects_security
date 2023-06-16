'use strict';
/* istanbul ignore file */
const mysql = require('../index')

const LookForApp = async (app_name) => {
    const response = await mysql.query(`select * from application where app = '${app_name}'`);
    return response;
}

const LookForUser = async (id_user, token) => {
    return await mysql.query(`select * from user where id_user = '${id_user}' and token = '${token}'`)
}

const RegisterUser = async (pk_app, id_user, token) => {
    return await mysql.query(`insert into user(pk_app,id_user,token) values (${pk_app},${id_user},'${token}')`)
}

const UnregisterUser = async (pk_app, id_user, token) => {
    return await mysql.query(`delete from user where pk_app = ${pk_app} and id_user = ${id_user} and token = '${token}'`)
}

const LookForUserByIdAndAPP = async (id_user, pk_app) => {
    return await mysql.query(`select * from user where id_user = ${id_user} and  pk_app= ${pk_app}`)
}

const ValidateBasicAuth = async (token) => {
    return await mysql.query(`select * from application_users where token = '${token}'`)
}

module.exports = {
    LookForApp,
    LookForUser,
    RegisterUser,
    UnregisterUser,
    LookForUserByIdAndAPP,
    ValidateBasicAuth
}
