const swaggerAutogen = require('swagger-autogen')()

output = 'docs/swagger.json'
endpoints = ['../app.js']

swaggerAutogen(output, endpoints)