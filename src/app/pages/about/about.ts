import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * About Page
 * 
 * Information about the company/application
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  teamMembers = [
    {
      name: 'Ana García',
      role: 'CEO & Founder',
      description: 'Visionary leader with over 15 years of experience in technology.'
    },
    {
      name: 'Carlos López',
      role: 'CTO',
      description: 'Expert in software architecture and cloud solutions.'
    },
    {
      name: 'María Rodríguez',
      role: 'Lead Developer',
      description: 'Specialist in Angular and modern frontend development.'
    }
  ];

  companyStats = [
    { value: '500+', label: 'Satisfied clients' },
    { value: '10+', label: 'Years of experience' },
    { value: '99.9%', label: 'Guaranteed uptime' },
    { value: '24/7', label: 'Technical support' }
  ];
}
