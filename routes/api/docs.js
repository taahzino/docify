// Dependencies
const express = require("express");

// Internal Modules
const docControllers = require("../../controllers/doc");
const { common, doc: docMiddlewares } = require("../../middlewares/");

// Create the Router
const docs = express.Router();

// Middlewares
docs.use(common.authGuard);

// Request Handling
docs.route("/").get(docControllers.getAll).post(docControllers.saveOne);

docs.get("/search", docControllers.searchBySlug);
docs.get("/limit/:skip/:limit", docControllers.getFew);

docs.use("/:action/:id", docMiddlewares.checkAccess)
    .get("/data/:id", docControllers.getOne)
    .get("/download/:id", docControllers.downloadOne)
    .post("/mail/:id", docControllers.mailOne);

docs.use("/:id", docMiddlewares.checkAccess)
    .route("/:id")
    .get(docControllers.getDocFile)
    .delete(docControllers.deleteOne)
    .put(docMiddlewares.updateValidation, docControllers.updateOne);

// Export the router
module.exports = docs;
