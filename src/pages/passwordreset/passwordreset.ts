import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the PasswordresetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider, public alertCtrl: AlertController) {
  }

  reset() {
    let alert = this.alertCtrl.create({
      buttons: ['ok']
    });
    this.userService.passwordreset(this.email).then((res: any) => {
      if (res.success) {
        alert.setTitle('Email Sent');
        alert.setSubTitle('Please follow the instructions in the Email to reset your password');
      }
      else {
        alert.setTitle('Process Failed');
      }
    })

  }
  goback() {
    this.navCtrl.setRoot('LoginPage');
  }
}
