const router = require('express').Router()
const admin = require('firebase-admin')
let data = []

router.get('/', (req, res) => {
  return res.send('users')
})

router.get('/jwtVerification', async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(404).json({ message: 'Token not found!' })
  }

  const token = req.headers.authorization.split(' ')[1]
  try {
    const decodedValue = await admin.auth().verifyIdToken(token)

    if (!decodedValue) res.status(404).json({ message: 'Unauthorized user!' })

    return res.status(200).json({ data: decodedValue })
  } catch (error) {
    res.status(500).send({ message: error })
  }
})

const listAllUsers = (nextPageToken) => {
  return new Promise((resolve, reject) => {
    let data = []

    const fetchUsers = (nextPageToken) => {
      admin
        .auth()
        .listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
          listUsersResult.users.forEach((userRecord) => {
            data.push(userRecord.toJSON())
          })

          if (listUsersResult.pageToken) {
            fetchUsers(listUsersResult.pageToken)
          } else {
            resolve(data) // Resolve the promise when all users are fetched
          }
        })
        .catch((error) => {
          reject(error)
        })
    }

    fetchUsers(nextPageToken)
  })
}

router.get('/all', async (req, res) => {
  try {
    const allUsersData = await listAllUsers()
    return res.status(200).json({ data: allUsersData })
  } catch (error) {
    res.status(500).send({ message: error })
  }
})

module.exports = router
