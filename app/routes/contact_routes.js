const express = require("express");
const contacts = require("../controllers/contact_controller.js");

module.exports = app=>{
    const router = express.Router();

    router.post('/',contacts.create);

    router.get('/',contacts.findAll);

    router.get('/favorite',contacts.findAllFavourite);

    router.get('/:id',contacts.findOne);

    router.put('/:id',contacts.update);

    router.delete('/:id',contacts.delete);

    router.delete('/',contacts.deleteAll);

    app.use("/api/contacts",router);
};