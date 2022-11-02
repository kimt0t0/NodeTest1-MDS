const router = require('express').Router()

router.route('/')

  .get((req, res) => {
    const headers = req.headers
    console.log(headers)
    // Prochain cours = vérifier token + créer middleware
    return res.send('COUCOU')
  })

module.exports = router
