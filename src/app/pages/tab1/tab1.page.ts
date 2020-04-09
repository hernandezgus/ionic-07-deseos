import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
// import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
                 public deseosService: DeseosService,
                 private router: Router,
                 public alertController: AlertController
              ) { }

  agregarLista( id: number ) {
    this.router.navigateByUrl( `/tabs/tab1/agregar/${ id }` );
  }

  // navegarLista( lista: Lista ){
  //   this.router.navigateByUrl( `/tabs/tab1/agregar/${ lista.id }` );
  // }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Título de la lista..'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Crear',
          handler: ( data ) => {
            if (!data.titulo) {
              return;
            }
            const createdId = this.deseosService.crearLista( data.titulo );
            this.agregarLista( createdId );
          }
        }
      ]
    });

    await alert.present();
  }

}
