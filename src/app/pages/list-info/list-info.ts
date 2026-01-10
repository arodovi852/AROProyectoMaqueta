import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInput } from '../../components/shared/form-input/form-input';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';
import { FormCheckbox } from '../../components/shared/form-checkbox/form-checkbox';
import { Button } from '../../components/shared/button/button';

/**
 * Página ListInfo
 * 
 * Página para crear/editar una lista de series.
 */
@Component({
  selector: 'app-list-info',
  imports: [CommonModule, FormInput, FormTextarea, FormCheckbox, Button],
  templateUrl: './list-info.html',
  styleUrl: './list-info.scss',
})
export class ListInfo {
  title = '';
  description = '';
  addGame = '';
  isPublic = false;

  onTitleChange(value: string) {
    this.title = value;
  }

  onDescriptionChange(value: string) {
    this.description = value;
  }

  onAddGameChange(value: string) {
    this.addGame = value;
  }

  onPublicChange(value: boolean) {
    this.isPublic = value;
  }

  onCreateList() {
    console.log('Creating list:', {
      title: this.title,
      description: this.description,
      addGame: this.addGame,
      isPublic: this.isPublic
    });
  }
}
