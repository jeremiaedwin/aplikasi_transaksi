const db = require("../models");
const Transaksi = db.transaksi;
// Create and Save a new Transaction
exports.create = (req, res) => {
    
};
// Retrieve all Transactions from the database.
exports.findAll = (req, res) => {
  
};
// Find a single Transaction with an id
exports.findOne = (req, res) => {
  
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
// Delete a Transaction with the specified id in the request
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