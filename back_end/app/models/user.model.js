const passportLocalMongoose = require('passport-local-mongoose');
module.exports = mongoose => {
    const Akun = mongoose.model(
      "akun",
      mongoose.Schema(
        {
            username: String,
            password: String,
            roles: {
            type : String,
            enum : ["user", "admin"],
            },
        }
        ).plugin(passportLocalMongoose)
    );
    return Akun;
  };