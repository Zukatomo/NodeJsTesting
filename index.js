const jsonServer = require('json-server')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const yup = require('yup')
const server = jsonServer.create();
const db = require('./db');
const router = jsonServer.router(db())
const middlewares = jsonServer.defaults();
const port = 3000

const eventSchema = yup.object().shape({
    name:yup.string().required(),
    description: yup.string().required(),
    startTime: yup.number().positive().required(),
    address: yup.object().shape({
        country:yup.string().required(),
        county:yup.string().required(),
        city:yup.string().required(),
        streetAddress: yup.string().required(),
    }),
    organizedBy: yup.object().shape({
        companyName: yup.string().required(),
        domain: yup.string().required(),
        email: yup.string().required(),
        contactPerson: yup.object().shape({
            firstName: yup.string().required(),
            lastName: yup.string().required(),
            email: yup.string().required(),
            phone: yup.string().required(),
        })
    })
})

server.use(middlewares)
server.use(bodyParser())
server.use(cookieParser())

server.get('/login',(req, res)=>{
    const email = req.query.email
    const pass = req.query.pass
    if(email === 'admin@email.com' && pass === 'adminpass'){
        res.setHeader('Set-Cookie','authcookie=666')
        res.send('OK')
    }else{
        res.statusCode = 401
        res.send()
    }
})

server.use((req, res, next)=>{
    if(req.method === "GET"){
        next()
    }else if(req.method === "POST"){
        if(req.cookies["authcookie"] === '666'){
            next()
        }else{
            res.statusCode = 401
            res.send()
        }
    }else{
        res.statusCode = 404
        res.send()
    }
})

server.post('/events',async (req, res, next)=>{
    const ok = await eventSchema.isValid(req.body)
    if(!ok){
        res.statusCode = 422
        res.send()
    }else{
        next()
    }
    
})

server.use(router)
server.listen(port,()=>{
    console.log(`Json Server running on port: ${port}`)
})