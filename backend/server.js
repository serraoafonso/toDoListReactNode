const express = require('express');
const cors = require('cors');
const router = require('./router');
const port = 4000;
const app = express();

app.use(express.json());
app.use(cors())
app.use(router)

app.listen(port, ()=>console.log('Servidor rodando'))