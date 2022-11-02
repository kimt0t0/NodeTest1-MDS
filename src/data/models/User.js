const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { Schema } = mongoose // <-> const Schema = mongoose.Schema  --- extracts Schema from the mongoose module

const userSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/
  },
  password: {
    type: String,
    required: true
  }
}, { timestamp: true })

// remplace le mdp par un crypté avant d'enregistrer dans la BDD
userSchema.pre('save', function (next) {
  // récupération utilisateur via this
  const user = this
  // si mot de passe a changé ou nouvel utilisateur...
  if (this.isModified('password') || this.isNew) {
    // génération de sel = clé aléatoire pour hasher le mdp
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        throw new Error(err)
      }
      // hashage du mdp
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          throw new Error(err)
        }
        // remplacement mdp par hash obtenu
        user.password = hash
        // passage au middleware suivant
        return next()
      })
    })
  }
})

userSchema.methods.comparePassword = (password, callback) => {
  bcrypt.compare(password, this.password, (error, isMatch) => {
    if (error) return callback(error, null)
    return callback(null, isMatch)
  })
}

module.exports = mongoose.models.User || mongoose.model('User', userSchema)
