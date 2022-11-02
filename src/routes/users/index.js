const { getUsers, createUser, getUserById, updateUserById, deleteUserById } = require('../../controllers/users.controller')
const User = require('../../data/models/User')

const router = require('express').Router()

// comme déjà dans dossier routes, ici on est à la racine de /users:
router.route('/')

// Create a user
  .post(async (req, res) => {
    try {
      const userCreated = await createUser(req.body)
      return res.send(userCreated)
    } catch (error) {
      return res.status(500).send(error)
    }

    /* Même rôle mais moins opti:
     user.save()
    .then((data) => console.log('Réponse: ', data))
    .catch((err) => console.error('Erreur: ', err))
    res.send() */
  })

//   Récupération tous utilisateurs
  .get(async (req, res) => {
    const users = await getUsers()
    return res.send(users)
  })

// Nouvelle route
router.route('/:id')

// Récupération un utilisateur par id dans l'URL
  .get(async (req, res) => {
    const id = req.params.id

    try {
      const user = await getUserById(id)
      return res.send(user)
    } catch (e) {
      return res.status(500).send(e)
    }
  })

// Màj utilisateur
  .patch(async (req, res) => {
    const id = req.params.id
    const user = req.body
    try {
      const updatedUser = await updateUserById(id, user)
      return res.send(updatedUser)
    } catch (e) {
      return res.status(500).send(e)
    }
  })

// Suppression utilisateur
  .delete(async (req, res) => {
    const id = req.params.id

    try {
      await deleteUserById(id)
      return res.send(`L'utilisateur avec l'ID ${id} a été supprimé !`)
    } catch (e) {
      return res.status(500).send(e)
    }
  })

module.exports = router
