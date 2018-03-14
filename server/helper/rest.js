var jsonwebtoken = require("jsonwebtoken")

module.exports = {
    APIError: function (code, message) {
        this.code = code || 'internal:unknown_error'
        this.message = message || ''
    },
    restify: (pathPrefix) => {
        pathPrefix = pathPrefix || '/api/'
        return async (ctx, next) => {

            // var token = ctx.request.headers['authorization'].split(" ")[1]
            // if (token) {
            //     var user = jsonwebtoken.decode(token)
            //     console.log(user)
            //     // ctx.status.user = 
            // }

            if (ctx.request.path.startsWith(pathPrefix)) {
                console.log(`Process API ${ctx.request.method} ${ctx.request.url}...`)
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json'
                    ctx.response.body = data
                }
                try {
                    await next()
                } catch (e) {
                    console.log('Process API error...')
                    ctx.response.status = 400
                    ctx.response.type = 'application/json'
                    ctx.response.body = {
                        code: e.code || 500,
                        message: e.message || ''
                    }
                    console.log(e)
                }
            } else {
                await next()
            }
        }
    }
}