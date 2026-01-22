import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Contact Page
 * 
 * Contact information and ways to reach the team
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  contactMethods = [
    {
      icon: 'email',
      title: 'Email Support',
      description: 'Get help with your account, billing, or technical issues',
      contact: 'support@broadcasttd.com',
      responseTime: 'Response within 24 hours'
    },
    {
      icon: 'business',
      title: 'Business Inquiries',
      description: 'Partnership opportunities and enterprise solutions',
      contact: 'business@broadcasttd.com',
      responseTime: 'Response within 48 hours'
    },
    {
      icon: 'press',
      title: 'Press & Media',
      description: 'Media inquiries, interviews, and press releases',
      contact: 'press@broadcasttd.com',
      responseTime: 'Response within 72 hours'
    },
    {
      icon: 'api',
      title: 'API & Developer Support',
      description: 'Technical questions about our API and integrations',
      contact: 'developers@broadcasttd.com',
      responseTime: 'Response within 24 hours'
    }
  ];

  socialLinks = [
    { name: 'Twitter', handle: '@broadcasttd', url: 'https://twitter.com' },
    { name: 'Discord', handle: 'BROADCASTTD Community', url: 'https://discord.com' },
    { name: 'Reddit', handle: 'r/broadcasttd', url: 'https://reddit.com' }
  ];

  faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.'
    },
    {
      question: 'Can I export my watch history?',
      answer: 'Yes! Go to Profile > Settings > Export Data to download your complete watch history.'
    },
    {
      question: 'How do I report a bug?',
      answer: 'Send us an email at support@broadcasttd.com with details about the issue and screenshots if possible.'
    }
  ];
}
