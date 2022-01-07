const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//creating userSchema(bluePrint)

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//hasing password using bcryptjs npm
//8 round of salting

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

//creating model using userSchema
const User = mongoose.model("user", userSchema);

module.exports = User;
