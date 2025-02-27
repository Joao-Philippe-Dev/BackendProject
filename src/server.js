const express = require('express')
const cors = require('cors')
const database = require('./config/database')
const cookieParser = require('cookie-parser');

const UserApi = require('./api/user')
const UserRouter = require('./routes/user')
const TaskRouter = require('./routes/task')

const ProjectRouter = require('./routes/project')

const app = express()
app.use(cookieParser());
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' })
})

app.post('/api/v1/login', UserApi.login)
app.post('/api/v1/user', UserApi.createUser)

app.use(UserApi.validateToken)
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/task', TaskRouter)
app.use('/api/v1/project', ProjectRouter)

database.db.sync()
    .then(_ => {
        app.listen(8000, _ => {
            console.log('Server running on port 8000')
        })
    })
    .catch(e => {
        console.error(`Erro ao inicializar o banco ${e}`)
    })

    module.exports = app;