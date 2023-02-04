import admin from 'firebase-admin' 
import credentials from './credentialsFirebase.json' assert { type: "json" }

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: 'https://backend-coder82fae.firebaseio.com'
})