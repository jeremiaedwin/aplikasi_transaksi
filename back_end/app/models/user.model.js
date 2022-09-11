const passportLocalMongoose = require('passport-local-mongoose');
module.exports = mongoose => {
    const Akun = mongoose.model(
      "akun",
      mongoose.Schema(
        {
            username : String,
            email: String,
            password: String,
            roles: {
                type : String,
                enum : ["user", "admin"],
                default : 'user'
            },
        }
        ).plugin(passportLocalMongoose)
    );
    return Akun;
  };