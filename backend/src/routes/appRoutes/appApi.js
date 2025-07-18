const express = require('express');
const { catchErrors } = require('@/handlers/errorHandlers');
const router = express.Router();

const appControllers = require('@/controllers/appControllers');
const { routesList } = require('@/models/utils');
//--------------QUERY-ADD-AND-DELETE----------------
const queryAddNote = require('@/controllers/appControllers/queryController/addNote');
const queryDeleteNote = require('@/controllers/appControllers/queryController/deleteNote');
//--------------------------INVOICE-AI-SUMMARY------------------------------
const summarizeNotes = require('@/controllers/appControllers/invoiceController/summarizeNotes');

const routerApp = (entity, controller) => {
  router.route(`/${entity}/create`).post(catchErrors(controller['create']));
  router.route(`/${entity}/read/:id`).get(catchErrors(controller['read']));
  router.route(`/${entity}/update/:id`).patch(catchErrors(controller['update']));
  router.route(`/${entity}/delete/:id`).delete(catchErrors(controller['delete']));
  router.route(`/${entity}/search`).get(catchErrors(controller['search']));
  router.route(`/${entity}/list`).get(catchErrors(controller['list']));
  router.route(`/${entity}/listAll`).get(catchErrors(controller['listAll']));
  router.route(`/${entity}/filter`).get(catchErrors(controller['filter']));
  router.route(`/${entity}/summary`).get(catchErrors(controller['summary']));

  if (entity === 'invoice' || entity === 'quote' || entity === 'payment') {
    router.route(`/${entity}/mail`).post(catchErrors(controller['mail']));
  }

  if (entity === 'quote') {
    router.route(`/${entity}/convert/:id`).get(catchErrors(controller['convert']));
  }
};

routesList.forEach(({ entity, controllerName }) => {
  const controller = appControllers[controllerName];
  routerApp(entity, controller);
});

//FOR-CREATING-NOTE
router.post('/query/:id/notes/create', catchErrors(queryAddNote));
//FOR-DELETING-NOTE
router.delete('/query/:id/notes/delete/:noteId', catchErrors(queryDeleteNote));
//FOR-AI-SUMMARY
router.get('/invoice/notes/summary/:id', catchErrors(summarizeNotes));

module.exports = router;
