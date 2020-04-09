import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList, { static: true } ) lista: IonList;
  @Input() terminada = true;

  constructor(  public deseosService: DeseosService,
                private router: Router,
                private alertController: AlertController ) { }

  ngOnInit() {}

  navegarLista( lista: Lista ) {
    if (this.terminada) {
      this.router.navigateByUrl( `/tabs/tab2/agregar/${ lista.id }` );
    } else {
      this.router.navigateByUrl( `/tabs/tab1/agregar/${ lista.id }` );
    }
  }

  borrarLista( lista: Lista ) {
    this.deseosService.borrarLista( lista );
  }

  editarNombreLista( lista: Lista ) {
    this.deseosService.editarNombreLista( lista );
  }

  async presentEditNombreAlertPrompt( lista: Lista ) {
    const alert = await this.alertController.create({
      header: 'Editar nombre de lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
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
            this.lista.closeSlidingItems();
          }
        }, {
          text: 'Editar',
          handler: ( data ) => {
            if (!data.titulo) {
              return;
            }
            lista.titulo = data.titulo;
            this.editarNombreLista( lista );
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    await alert.present();
  }

}
