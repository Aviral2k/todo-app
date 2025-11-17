const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.syncTodos = functions.https.onCall(async (data, context) => {
  // Shared logic for data sync
  const todos = await admin.firestore().collection('todos').get();
  return todos.docs.map(doc => doc.data());
});