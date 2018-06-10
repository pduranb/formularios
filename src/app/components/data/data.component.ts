import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent  {

  forma: FormGroup;

  usuario: any = {
    nombrecompleto : {nombre: 'Pablo' ,
    apellido : 'Duran'},
    correo : 'asd@gmail.com',
    pasatiempos: ['Comer']
  };

  constructor() {



    console.log(this.usuario);
    this.forma = new FormGroup({
      'nombrecompleto': new FormGroup({
        'nombre': new FormControl('', [Validators.required, Validators.minLength(5)]),
        'apellido': new FormControl('', [Validators.required, this.noHerrera])
      }),
      'correo': new FormControl('', [Validators.required , Validators.email ] ),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      'username': new FormControl('', Validators.required , this.existeUsuario  ),
      'password1': new FormControl('', Validators.required  ),
      'password2': new FormControl()
    });
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ]);
    this.forma.controls.username.valueChanges
        .subscribe( data => {
          console.log(data);
        });
    this.forma.controls.username.statusChanges
    .subscribe( data => {
      console.log(data);
    });
    // this.forma.setValue(this.usuario);
  }
  guardarCambios() {
    console.log('Guardando Cambios');
    console.log(this.forma.value);
    console.log(this.forma);
    this.forma.reset(this.usuario);
  }
  agregarPasatiempo() {
    (<FormArray> this.forma.controls['pasatiempos']).push(
      new FormControl('dormir', Validators.required)
    );
  }
  noHerrera( control: FormControl ): { [s: string]: boolean } {
    if ( control.value === 'herrera') {
      return{
        noherrera: true
      };
    }
    return null;
  }
  noIgual( control: FormControl ): { [s: string]: boolean } {
    const forma: any = this;
    if ( control.value !== forma.controls['password1'].value) {
      return{
        noiguales: true
      };
    }
    return null;
  }

  existeUsuario(control: FormControl): Promise<any>|Observable<any> {
    const promesa = new Promise(
      ( resolve, reject ) => {
        setTimeout(() => {
          if (control.value === 'gundo') {
            resolve({ existe: true } );
          } else {
            resolve(null);
          }
        }, 3000);
      }
    );
    return promesa;
  }
}
