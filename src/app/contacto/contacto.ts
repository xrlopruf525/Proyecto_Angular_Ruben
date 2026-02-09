import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importamos lo necesario para formularios (Reactive)
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.html'
})
export class Contacto {
  // Signal para mostrar el mensaje de éxito en la pantalla sin usar alert
  enviadoConExito = signal(false);

  // Definimos el formulario y sus reglas (validaciones)
  contactoForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    asunto: new FormControl('', Validators.required),
    mensaje: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  async enviarFormulario() {
    if (this.contactoForm.valid) {
      
      // Tus credenciales de EmailJS
      const serviceID = 'service_kln1tzf';
      const templateID = 'template_5j5iijh'; 
      const publicKey = '2Z6NvX-E_ZiOUv-t8';   

      try {
        // Enviamos los datos a la plantilla de EmailJS
        await emailjs.send(
          serviceID, 
          templateID, 
          {
            nombre: this.contactoForm.value.nombre,
            email: this.contactoForm.value.email,
            asunto: this.contactoForm.value.asunto,
            mensaje: this.contactoForm.value.mensaje,
            fecha: new Date().toLocaleString()          
          }, 
          publicKey
        );

        // Si todo sale bien, activamos el mensaje de éxito y limpiamos el form
        this.enviadoConExito.set(true);
        this.contactoForm.reset({
        });

      } catch (error) {
        console.error('Error al enviar:', error);
      }
    }
  }
}