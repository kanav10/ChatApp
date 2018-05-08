import { Component ,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImghandlerProvider} from '../../providers/imghandler/imghandler';
import { UserProvider} from '../../providers/user/user';
/**
 * Generated class for the ProfilepicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})
export class ProfilepicPage {
  imgurl = 'http://cdn.shopify.com/s/files/1/1482/3564/products/hello_grande.jpg?v=1480478786';
  moveon = true;
  constructor(public navCtrl: NavController, public navParams: NavParams , public imgservice : ImghandlerProvider ,public Zone : NgZone,
              public userService : UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilepicPage');
  }
  chooseimage() {
    this.imgservice.uploadimage().then((uploadedurl: any)=>{
      this.Zone.run(()=>{
        this.imgurl = uploadedurl;
        this.moveon = false;
      })
    })
  }
    proceed() {
      this.navCtrl.setRoot('TabsPage');

    }
    updateproceed() {
      this.userService.updateimage(this.imgurl).then((res : any)=>{
        if(res.success) {
          this.navCtrl.setRoot('TabsPage');
        }
        else {
          alert(res);
        }
      })

    }
}
