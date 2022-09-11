module.exports = mongoose => {
    const Transaksi = mongoose.model(
      "transaksi",
      mongoose.Schema(
        {
          nama_produk: String,
          status_pembayaran: {
            type : String,
            enum : ["Success", "Void"]
          },
          tipe_penjualan: {
            type : String,
            enum : ["Dine In", "Take Away"],
            default : "Dine In"
          }, 
          harga: Number
        },
        { timestamps: true }
      )
    );
    return Transaksi;
  };