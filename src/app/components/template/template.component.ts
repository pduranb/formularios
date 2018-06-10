import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../clases/usuario';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: []
})
export class TemplateComponent  {

  usuario: Usuario = {
    nombre : null,
    apellido : null,
    correo : null,
    pais: '',
    sexo: 'Mujer',
    acepta: false
  };

  paises = [{
    codigo: 'ESP',
    nombre: 'España'
  }, {
    codigo: 'CL',
    nombre: 'Chile'
  }
  ];
  sexos = ['Hombre', 'Mujer'];


  constructor() { }

  guardar(forma: NgForm) {
    console.log('Formulario posteado');
    console.log('NgForm', forma);
    console.log('valor', forma.value);
    console.log('Usuario', this.usuario);
  }
}
