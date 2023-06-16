const CustomError = require('../../../utils/CustomError')
const { BAD_REQUEST, INTERNAL_ERROR } = require('../../../utils/ExceptionsCodes')
const transactions = require('../../../helpers/mysql/transactions')

module.exports = async (request, response, next) => {
    const { app } = request.params
    try {
        //Lookgin up for the app 
        const [_App, ...more] = await transactions.LookForApp(app)
        if (_App != undefined) {
            request._App = _App
            return next()
        } else {
            return next(new CustomError(BAD_REQUEST.messages.APP_NOT_FOUND, BAD_REQUEST.code, BAD_REQUEST.exception))
        }
    } catch (error) {
        return next(new CustomError(error.code, INTERNAL_ERROR.code, INTERNAL_ERROR.exception, error.stack))
    }
};
