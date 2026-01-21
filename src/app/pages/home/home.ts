import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormInput } from '../../components/shared/form-input/form-input';
import { CloseButton } from '../../components/shared/close-button/close-button';
import { Button } from '../../components/shared/button/button';
import { Card } from '../../components/shared/card/card';
import { Alert } from '../../components/shared/alert/alert';
import { FormCheckbox } from '../../components/shared/form-checkbox/form-checkbox';
import { FormSelect } from '../../components/shared/form-select/form-select';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';
import { LoginForm } from '../../components/shared/login-form/login-form';
import { RegisterForm } from '../../components/shared/register-form/register-form';

// Phase 1 Components
import { ThemeSwitcher } from '../../components/shared/theme-switcher/theme-switcher';
import { DomManipulation } from '../../components/shared/dom-manipulation/dom-manipulation';
import { EventDemo } from '../../components/shared/event-demo/event-demo';
import { HamburgerMenu } from '../../components/shared/hamburger-menu/hamburger-menu';
import { InteractiveModal } from '../../components/shared/interactive-modal/interactive-modal';
import { InteractiveTabs } from '../../components/shared/interactive-tabs/interactive-tabs';
import { InteractiveTooltip } from '../../components/shared/interactive-tooltip/interactive-tooltip';

// Phase 2 Components
import { SiblingSender } from '../../components/shared/sibling-sender/sibling-sender';
import { SiblingReceiver } from '../../components/shared/sibling-receiver/sibling-receiver';
import { LoadingDemo } from '../../components/shared/loading-demo/loading-demo';

// Phase 3 Components
import { ContactFormReactive } from '../../components/shared/contact-form-reactive/contact-form-reactive';
import { InvoiceForm } from '../../components/shared/invoice-form/invoice-form';
import { ProfileForm } from '../../components/shared/profile-form/profile-form';

// Additional components
import { CardList } from '../../components/shared/card-list/card-list';

/**
 * Home Page
 * 
 * Component demonstration page
 */
@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    FormInput,
    CloseButton,
    Button,
    Card,
    Alert,
    FormCheckbox,
    FormSelect,
    FormTextarea,
    LoginForm,
    RegisterForm,
    // Phase 1
    ThemeSwitcher,
    DomManipulation,
    EventDemo,
    HamburgerMenu,
    InteractiveModal,
    InteractiveTabs,
    InteractiveTooltip,
    // Phase 2
    SiblingSender,
    SiblingReceiver,
    LoadingDemo,
    // Phase 3
    ContactFormReactive,
    InvoiceForm,
    ProfileForm,
    // Additional components
    CardList
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // Notification visibility control
  showNotification = false;

  // Options for style guide select
  selectOptions = [
    { value: 'es', label: 'Spain' },
    { value: 'fr', label: 'France' },
    { value: 'it', label: 'Italy' },
    { value: 'de', label: 'Germany' },
    { value: 'uk', label: 'United Kingdom' }
  ];

  // Example data for CardList
  cardListImages = [
    { src: '/assets/Images_For_Card_1.jpg', alt: 'Twin Peaks' },
    { src: '/assets/Images_For_Card_2.jpg', alt: 'Stranger Things' },
    { src: '/assets/Image_For_Card_3.jpg', alt: 'Alien: Earth' },
    { src: '/assets/Image_For_Card_4.jpg', alt: 'The Haunting of Hill House' }
  ];

  // Handler for the close button
  onClose(): void {
    console.log('Close button clicked');
  }

  // Form handlers
  onLoginSubmit(data: any): void {
    console.log('Login submitted:', data);
  }

  onRegisterSubmit(data: any): void {
    console.log('Register submitted:', data);
  }

  onCreateAccountRequest(): void {
    console.log('Create account requested');
  }
}
