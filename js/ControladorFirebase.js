//imports
const admin = require("firebase-admin");

//firebase
// const serviceAccount = require("../arg-stock-bot-firebase-adminsdk-we592-92aa118e6b.json");
const { database } = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  }),
  databaseURL: "https://arg-stock-bot.firebaseio.com",
});
const db = admin.database();

const getDBFirebase = () => {
  return new Promise((resolve, reject) => {
    let chats = [];
    db.ref("RegistroGrupos").on(
      "value",
      function (snapshot) {
        snapshot.forEach(function (child) {
          let objeto = { id: child.val().id, titulo: child.val().title };
          chats.push(objeto);
        });
        resolve(chats);
      },
      function (errorObject) {
        reject(errorObject);
      }
    );
  });
};

const deleteDBFirebase = (GroupID) => {
  db.ref("RegistroGrupos/")
    .once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        if (GroupID === childSnapshot.val().id) {
          db.ref("RegistroGrupos/").child(childSnapshot.key).remove();
        }
      });
    });
};

const setDBFirebase = (GroupID, GroupTITLE) => {
  let existe = false;
  db.ref("RegistroGrupos/")
    .once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        if (GroupID === childSnapshot.val().id) {
          existe = true;
        }
      });
      if (!existe) {
        db.ref("RegistroGrupos").push().set({
          id: GroupID,
          title: GroupTITLE,
        });
      }
    });
};

module.exports = {
  getDBFirebase,
  deleteDBFirebase,
  setDBFirebase,
};
