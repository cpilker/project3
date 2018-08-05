
// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const app = express();

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Put all API endpoints under '/api'
// app.get('/api/test', (req, res) => {
//   const fakeData = {
//     status: 'ok',
//     code: 200,
//   };
//   res.json(fakeData);
// });

// // The "catchall" handler: for any request that doesn't
// // match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

// const handleUnexpectedError = (err, req, res, next) => {
//   console.log('Unexpected error: ' + JSON.stringify(err));
//   res.json({status: 500});
// }
// app.use(handleUnexpectedError);

// module.exports = app;

