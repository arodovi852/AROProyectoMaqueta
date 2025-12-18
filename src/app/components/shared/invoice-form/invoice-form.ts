import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Button } from '../button/button';
import { ToastService } from '../../../services/toast.service';
import { telefono, codigoPostal } from '../../../validators/custom-validators';
import { totalMinimo } from '../../../validators/cross-field-validators';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.html',
  styleUrl: './invoice-form.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Button]
})
export class InvoiceForm {
  invoiceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.invoiceForm = this.fb.group({
      customer: ['', Validators.required],
      phones: this.fb.array([]),
      addresses: this.fb.array([]),
      items: this.fb.array([])
    }, {
      validators: totalMinimo(100)
    });

    // Inicializar con un elemento de cada tipo
    this.addPhone();
    this.addAddress();
    this.addItem();
  }

  // Getters para FormArrays
  get phones(): FormArray {
    return this.invoiceForm.get('phones') as FormArray;
  }

  get addresses(): FormArray {
    return this.invoiceForm.get('addresses') as FormArray;
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  // Métodos para teléfonos
  newPhone(): FormGroup {
    return this.fb.group({
      phone: ['', [Validators.required, telefono()]]
    });
  }

  addPhone(): void {
    this.phones.push(this.newPhone());
  }

  removePhone(index: number): void {
    if (this.phones.length > 1) {
      this.phones.removeAt(index);
    }
  }

  // Métodos para direcciones
  newAddress(): FormGroup {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', [Validators.required, codigoPostal()]]
    });
  }

  addAddress(): void {
    this.addresses.push(this.newAddress());
  }

  removeAddress(index: number): void {
    if (this.addresses.length > 1) {
      this.addresses.removeAt(index);
    }
  }

  // Métodos para items de factura
  newItem(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  addItem(): void {
    this.items.push(this.newItem());
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  getItemTotal(index: number): number {
    const item = this.items.at(index).value;
    return (item.quantity || 0) * (item.price || 0);
  }

  getTotal(): number {
    return this.items.value.reduce((acc: number, item: any) => {
      return acc + (item.quantity || 0) * (item.price || 0);
    }, 0);
  }

  hasTotalMinimoError(): boolean {
    return !!this.invoiceForm.errors?.['totalMinimo'] && 
           this.items.controls.some(control => control.touched);
  }

  onSubmit(): void {
    if (this.invoiceForm.invalid) {
      this.invoiceForm.markAllAsTouched();
      this.toastService.warning('Por favor, corrige los errores del formulario');
      return;
    }

    console.log('Factura enviada:', this.invoiceForm.value);
    this.toastService.success(`Factura creada por ${this.getTotal().toFixed(2)}€`);
  }

  onReset(): void {
    this.invoiceForm.reset();
    
    // Limpiar arrays y añadir elementos iniciales
    while (this.phones.length) this.phones.removeAt(0);
    while (this.addresses.length) this.addresses.removeAt(0);
    while (this.items.length) this.items.removeAt(0);
    
    this.addPhone();
    this.addAddress();
    this.addItem();
    
    this.toastService.info('Formulario reiniciado');
  }
}
