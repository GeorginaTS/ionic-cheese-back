import admin from 'firebase-admin';

import * as serviceAccount from './private/cheese-29925-firebase.json';
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const auth = admin.auth();
export const db = admin.firestore();