const HttpError = require('./HttpError')

const ctrlWrapper = ctrl => {
    const func = async (req, res, next) => {
        try {
            await ctrl(req, res, next)
        } catch (error) {
            if (error instanceof require('sequelize').ValidationError) {
                next(HttpError(400, error.message))
            }
            next(error)
        }
    }
    return func;
}

module.exports = ctrlWrapper