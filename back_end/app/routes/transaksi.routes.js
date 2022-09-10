module.exports = app => {
    const transaksi = require("../controllers/transaksi.controller.js");

    var router = require("express").Router();

    // Create a new transaksi
    router.post("/", transaksi.create);
 
    // Retrieve all transaksi
    router.get("/", transaksi.findAll);

    // Retrieve a single transksi with id
    router.get("/:id", transaksi.findOne);

    // Update a transaksi with id
    router.put("/:id", transaksi.update);

    // Delete a transaksi with id
    router.delete("/:id", transaksi.delete);

    // Delete all transaksi
    router.delete("/", transaksi.deleteAll);

    app.use("/api/transaksi", router);
};