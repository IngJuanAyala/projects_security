const SQS = require('@condor-labs/helpers/src/queue-sqs')
const CustomError = require('../../../utils/CustomError')
const { INTERNAL_ERROR, BAD_REQUEST, SUCCESS } = require('../../../utils/ExceptionsCodes')
const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_SQS_URL } = process.env
const transactions = require('../../../helpers/mysql/transactions')

module.exports = async (request, response, next) => {
    const { _App, processId } = request
    const { id_user, message } = request.body

    try {
        // Looking for the user 
        const _User = await transactions.LookForUserByIdAndAPP(id_user, _App.pk_app)

        if (_User != undefined && _User.length > 0) {
            const tokens = _User.map(user => user.token)
            const reply = { server_key: _App.server_key, tokens, message, webhook_sender: _App.webhook_sender, processId }

            if (_App.webhook_sender !== undefined) {
                //Sending the message to the SQS
                await SQS.push({
                    queueUrl: AWS_SQS_URL,
                    messageBody: JSON.stringify(reply)
                }, {
                        accessKeyId: AWS_ACCESS_KEY,
                        secretAccessKey: AWS_SECRET_ACCESS_KEY,
                        region: AWS_REGION
                    })
            }
            response.status(200).json({ code: SUCCESS.code, message: SUCCESS.messages.SENDED, id_user, processId })

        } else {
            next(new CustomError(BAD_REQUEST.messages.USER_NOT_FOUND, BAD_REQUEST.code, BAD_REQUEST.exception, _App.webhook_sender))
        }

    } catch (error) {
        next(new CustomError(INTERNAL_ERROR.messages.SQS_ERROR_AT_PUSH, INTERNAL_ERROR.code, INTERNAL_ERROR.exception, _App.webhook_sender, error.stack))
    }
}
