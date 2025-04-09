const { DbConnection } = require("./src/config/db.connection");
const express = require('express');
const app = express();
const userRoutes = require('./src/routes/user.routes');

DbConnection();

app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/', (req, res) => {
    res.send('server is running');
})

app.listen(3000, () => {
    console.log(('server is running on port 3000'));

})