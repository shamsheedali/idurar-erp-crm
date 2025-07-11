const { globSync } = require('glob');
const path = require('path');
const mongoose = require('mongoose'); 
const modelFilesPattern = path.join(__dirname, 'models', '**', '*.js');
const allModelFilePaths = globSync(modelFilesPattern);

for (const modelPath of allModelFilePaths) {
  try {
    // Use an absolute path to ensure correct module resolution
    require(path.resolve(modelPath));
  } catch (error) {
    console.error(`Error loading Mongoose model file: ${modelPath}`, error.message);
    // Depending on the severity, you might want to throw the error here
    // if a core model failing to load should prevent the app from starting.
    // For now, we'll just log it.
  }
}

const express = require('express');

const cors = require('cors');
const compression = require('compression');

const cookieParser = require('cookie-parser');

const coreAuthRouter = require('./routes/coreRoutes/coreAuth');
const coreApiRouter = require('./routes/coreRoutes/coreApi');
const coreDownloadRouter = require('./routes/coreRoutes/coreDownloadRouter');
const corePublicRouter = require('./routes/coreRoutes/corePublicRouter');
const adminAuth = require('./controllers/coreControllers/adminAuth');

const errorHandlers = require('./handlers/errorHandlers');
const erpApiRouter = require('./routes/appRoutes/appApi');

const fileUpload = require('express-fileupload');
// create our Express app
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());

// // default options
// app.use(fileUpload());

// Here our API Routes

app.use('/api', coreAuthRouter);
app.use('/api', adminAuth.isValidAuthToken, coreApiRouter);
app.use('/api', adminAuth.isValidAuthToken, erpApiRouter);
app.use('/download', coreDownloadRouter);
app.use('/public', corePublicRouter);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// production error handler
app.use(errorHandlers.productionErrors);

// done! we export it so we can start the site in start.js
module.exports = app;
