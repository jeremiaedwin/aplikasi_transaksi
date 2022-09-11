const db = require("../models");
const Transaksi = db.transaksi;
// Create and Save a transaksi
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nama_produk) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Creattransaksi
    const _transaksi = Transaksi({
        nama_produk: req.body.nama_produk,
        status_pembayaran : req.body.status_pembayaran,
        tipe_penjualan: req.body.tipe_penjualan,
        harga: req.body.harga
    });
    // Stransaksi in the database
    _transaksi
      .save(_transaksi)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating transaksi."
        });
      });
  };
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const data_transaksi = req.query._id;
    var condition = data_transaksi? { data_transaksi: { $regex: new RegExp(_id), $options: "i" } } : {};
    Transaksi.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving transaksi."
        });
      });
  };
// Find a sintransaksi with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Transaksi.findById(id)
    .then(data => {
        if (!data)
            res.status(404).send({ message: "Not found transaksi with id " + id });
        else res.send(data);
    })
    .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving transaksi with id=" + id });
      });
};
// Update a Transaction by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            essage: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Transaksi.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
        res.status(404).send({
            message: `Cannot update Transaction with id=${id}. Maybe Transaction was not found!`
        });
        } else res.send({ message: "Transaction was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({
        message: "Error updating Transaction with id=" + id
        });
    });
};
// Delettransaksi with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Transaksi.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete Transaction with id=${id}. Maybe Transaction was not found!`
        });
        } else {
            res.send({
            message: "Transaction was deleted successfully!"
          });
        }
      })
    .catch(err => {
        res.status(500).send({
        message: "Could not delete Transaction with id=" + id
        });
    });
};
// Delete all Transactions from the database.
exports.deleteAll = (req, res) => {
    Transaksi.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Transactions were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Transaction."
      });
    });
};