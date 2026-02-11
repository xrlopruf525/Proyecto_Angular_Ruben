import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importamos lo necesario para formularios (Reactive)
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

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
      const serviceID = 'service_kln1tzf';
      const templateID = 'template_5j5iijh'; 
      const publicKey = '2Z6NvX-E_ZiOUv-t8';   

      try {
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

        Swal.fire({
          icon: 'success',
          title: '¡Mensaje enviado!',
          text: 'Te responderemos lo antes posible.',
          confirmButtonColor: '#3085d6'
        });

        this.contactoForm.reset();

      } catch (error) {
        console.error('Error al enviar:', error);
                Swal.fire({
          icon: 'error',
          title: 'Error al enviar',
          text: 'Hubo un problema con el servidor de correo. Inténtalo más tarde.',
        });
      }
    }
  }
}