const {getFirestore} = require('firebase-admin/firestore');

const db = getFirestore();

/**
 *
 * @param {string} paymentID - payment ID
 * @return {object} payment Data
 */
async function getPaymentID(paymentID) {
  try {
    const paymentIDRef = db.collection('payments').doc(paymentID);
    const paymentIDSnapshot = await paymentIDRef.get();

    if (paymentIDSnapshot.exists) {
      const paymentIDData = paymentIDSnapshot.data();
      return paymentIDData;
    } else {
      return null;
    }
  } catch (err) {
    console.error('Error occured while getting the paymentID from firestore: ', err.message);
    throw err;
  }
}

/**
 *
 * @param {string} userID - unique id of user
 * @param {string} regionID - unique id of region
 * @return {object} result
 */
async function getMemberships(userID, regionID) {
  try {
    const membershipRef = db.collection('memberships');
    const membershipSnapshot = await membershipRef.where('userID', '==', userID).where('regionID', '==', regionID).get();
    if (membershipSnapshot.empty) {
      return [];
    }
    const membershipData=[];
    membershipSnapshot.forEach((doc)=>{
      membershipData.push(doc.data());
    });
    return membershipData;
  } catch (err) {
    console.error('Error occured while getting the memberships data from firestore: ', err.message);
    throw err;
  }
}

/**
 *
 * @param {string} userID
 * @return {object} result
 */
async function getPaymentMethodsByUser(userID) {
  try {
    const paymentMethodsRef = db.collection('paymentMethods');
    const paymentMethodSnapshot = await paymentMethodsRef.where('userID', '==', userID).where('active', '==', true).get();

    if (paymentMethodSnapshot.empty) {
      return null;
    }
    const paymentMethodData=[];
    paymentMethodSnapshot.forEach((doc)=>{
      paymentMethodData.push(doc.data());
    });
    return paymentMethodData;
  } catch (err) {
    console.error('Error occured while getting the payment methods data from firestore: ', err.message);
    throw err;
  }
}

/**
 *
 * @param {string} paymentMethodID
 * @return {object} result
 */
async function getPaymentMethodsID(paymentMethodID) {
  try {
    const paymentMethodsRef = db.collection('paymentMethods');
    const paymentMethodSnapshot = await paymentMethodsRef.where('id', '==', paymentMethodID).where('active', '==', true).get();

    if (paymentMethodSnapshot.empty) {
      return null;
    }
    const paymentMethodData=[];
    paymentMethodSnapshot.forEach((doc)=>{
      paymentMethodData.push(doc.data());
    });
    return paymentMethodData;
  } catch (err) {
    console.error('Error occured while getting the payment methods data from firestore: ', err.message);
    throw err;
  }
}

/**
 *
 * @param {object} stripeData - paymentmethod object
 * @return {object} result
 */
async function addPaymentMethod(stripeData) {
  try {
    const paymentMethodRef = db.collection('paymentMethods').doc(stripeData.id);
    await paymentMethodRef.set(stripeData);
    return paymentMethodRef;
  } catch (err) {
    console.error('Error occured while adding the payment methods data to firestore: ', err.message);
    throw err;
  }
}

module.exports = {getPaymentMethodsID, addPaymentMethod, getPaymentID, getMemberships, getPaymentMethodsByUser};
