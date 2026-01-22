import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * Terms of Service Page
 * 
 * Legal terms and conditions for using the platform
 */
@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './terms.html',
  styleUrl: './terms.scss',
})
export class Terms {
  lastUpdated = 'January 15, 2026';
  effectiveDate = 'January 1, 2026';

  sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      content: `By accessing or using BROADCASTTD ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access or use the Service. We reserve the right to modify these terms at any time, and your continued use of the Service constitutes acceptance of any changes.`
    },
    {
      id: 'account',
      title: '2. User Accounts',
      content: `To access certain features of the Service, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must be at least 13 years of age to create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate and complete.`
    },
    {
      id: 'usage',
      title: '3. Acceptable Use',
      content: `You agree to use the Service only for lawful purposes and in accordance with these Terms. You may not: use the Service in any way that violates applicable laws; attempt to gain unauthorized access to any portion of the Service; use automated systems or software to extract data from the Service; interfere with or disrupt the integrity or performance of the Service; harass, abuse, or harm other users; or upload or transmit viruses or malicious code.`
    },
    {
      id: 'content',
      title: '4. User Content',
      content: `You retain ownership of any content you submit, post, or display on the Service ("User Content"). By submitting User Content, you grant BROADCASTTD a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content in connection with the Service. You represent that you have all necessary rights to grant this license and that your User Content does not violate any third-party rights.`
    },
    {
      id: 'intellectual',
      title: '5. Intellectual Property',
      content: `The Service and its original content, features, and functionality are owned by BROADCASTTD and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. Our trademarks may not be used in connection with any product or service without prior written consent. Series information and metadata are provided by third-party sources and remain the property of their respective owners.`
    },
    {
      id: 'privacy',
      title: '6. Privacy',
      content: `Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information.`
    },
    {
      id: 'termination',
      title: '7. Termination',
      content: `We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the Service will cease immediately. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.`
    },
    {
      id: 'disclaimer',
      title: '8. Disclaimer of Warranties',
      content: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. BROADCASTTD DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.`
    },
    {
      id: 'limitation',
      title: '9. Limitation of Liability',
      content: `IN NO EVENT SHALL BROADCASTTD, ITS DIRECTORS, EMPLOYEES, PARTNERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU, IF ANY, FOR ACCESSING THE SERVICE DURING THE TWELVE (12) MONTHS PRECEDING THE CLAIM.`
    },
    {
      id: 'governing',
      title: '10. Governing Law',
      content: `These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved exclusively in the state or federal courts located in San Francisco County, California.`
    },
    {
      id: 'changes',
      title: '11. Changes to Terms',
      content: `We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use the Service after revisions become effective, you agree to be bound by the revised terms.`
    },
    {
      id: 'contact',
      title: '12. Contact Information',
      content: `If you have any questions about these Terms, please contact us at legal@broadcasttd.com or by mail at: BROADCASTTD Legal Department, 123 Series Street, Suite 456, San Francisco, CA 94102, United States.`
    }
  ];
}
