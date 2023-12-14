import * as admin from "firebase-admin";
import fireBaseAccountDetails from '../../entertainment-web-app';

if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(fireBaseAccountDetails),
    });
}

export default admin;
