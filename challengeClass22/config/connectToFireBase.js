import admin from 'firebase-admin'
import credentials from './credenciales.json' assert { type: "json" }

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: 'https://backend-class22.firebaseio.com'
})