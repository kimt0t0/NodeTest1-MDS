const User = require('../data/models/User')

const getUsers = async (req) => {
  const users = await User.find().select('-password')
  return users
}

const createUser = async (user) => {
  // vérification présence champs obligatoires:
  if (!user.email || !user.password) {
    throw new Error('Donnée manquante')
  }

  const _user = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    password: user.password
  })

  const savedUser = await _user.save()
  // on transforme le résultat en objet
  const savedUserObject = savedUser.toObject()
  // on retire le mdp de la réponse
  delete savedUserObject.password
  // renvoie l'objet qu'on vient de créer - bonne pratique pour vérification
  return savedUserObject
}

const getUserById = async (id) => {
  // En cas d'absence d'id dans l'URL
  if (!id | id == null) {
    throw new Error('ID manquant')
  }

  const user = await User.findById(id).select('-password')
  const userObject = user.toObject()
  return userObject
}

const updateUserById = async (id, user) => {
  if (!id | id === null) {
    throw new Error('ID manquant')
  }
  // (Vérification utilisateur dans le corps de la requête)
  if (!user | user === null) {
    throw new Error('Pas d\'utilisateurice')
  }

  const userUpdated = await User.findByIdAndUpdate(id, user, { new: true }).select('-password')
  const userObject = userUpdated.toObject()
  return userObject
}

const deleteUserById = async (id) => {
  if (!id | id === null) {
    throw new Error('ID manquant')
  }
  await User.findOneAndDelete(id)
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById
}
