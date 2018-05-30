// Application root //
// Load configuraction //
require('./config/config');

// External imports //
const express=require('express');
const bodyParser=require('body-parser');
const routesAPI = require('./api/routes')

var app=express();

const PORT=process.env.PORT || 3000;

// Middleware configuration //
// Parser body in JSON format //
app.use(bodyParser.json());

// Load routes API endpoint //
routesAPI(app);

// Server start //
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports= {app};
