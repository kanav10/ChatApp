import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  firedata = firebase.database().ref('/chatusers')
  constructor(public afireauth: AngularFireAuth) {

  }
  adduser(newuser) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: ''
        }).then(() => {
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,

            displayName: newuser.displayName,
            photoURL: 'http://cdn.shopify.com/s/files/1/1482/3564/products/hello_grande.jpg?v=1480478786'
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err);
          })
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  passwordreset(email) {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })

    })
    return promise;
  }

  updateimage(imageurl) {
    var promise = new Promise((resolve,reject)=>{
      this.afireauth.auth.currentUser.updateProfile({
        displayName : this.afireauth.auth.currentUser.displayName,
        photoURL : imageurl
      }).then(()=>{
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
          displayName : this.afireauth.auth.currentUser.displayName,
          photoUrl : imageurl,
          uid : firebase.auth().currentUser.uid
        }).then(()=>{
          resolve({success: true});
        }).catch((err)=>{
          reject(err);
        })
      }).catch((err)=>{
        reject(err);
      })
    })
    return promise;
  }
}
