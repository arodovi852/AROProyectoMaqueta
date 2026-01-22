import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * Privacy Policy Page
 * 
 * Information about how user data is collected and used
 */
@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './privacy.html',
  styleUrl: './privacy.scss',
})
export class Privacy {
  lastUpdated = 'January 15, 2026';

  sections = [
    {
      id: 'overview',
      title: 'Privacy Overview',
      icon: 'shield',
      content: `At BROADCASTTD, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service. We are committed to protecting your personal data and being transparent about how we use it.`
    },
    {
      id: 'collection',
      title: 'Information We Collect',
      icon: 'database',
      content: `We collect information you provide directly, including: account registration details (username, email, password), profile information you choose to add, series ratings and reviews you submit, lists you create and save, and communications you send to us. We also automatically collect: device information (browser type, operating system), usage data (pages visited, features used), IP address and approximate location, and cookies and similar tracking technologies.`
    },
    {
      id: 'usage',
      title: 'How We Use Your Information',
      icon: 'settings',
      content: `We use your information to: provide, maintain, and improve our services; personalize your experience and recommendations; process your requests and respond to inquiries; send you updates, newsletters, and promotional content (with your consent); analyze usage patterns to improve our platform; detect and prevent fraud or abuse; and comply with legal obligations.`
    },
    {
      id: 'sharing',
      title: 'Information Sharing',
      icon: 'share',
      content: `We do not sell your personal information. We may share your information with: service providers who assist in operating our platform; analytics partners to help us understand usage; legal authorities when required by law or to protect rights; other users only for information you make public (like reviews or public lists); and in connection with a merger, acquisition, or sale of assets.`
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      icon: 'cookie',
      content: `We use cookies and similar technologies to: keep you signed in; remember your preferences; understand how you use our service; deliver relevant content and ads; and measure the effectiveness of our features. You can control cookies through your browser settings. Some features may not function properly if cookies are disabled.`
    },
    {
      id: 'security',
      title: 'Data Security',
      icon: 'lock',
      content: `We implement industry-standard security measures to protect your data, including: encryption of data in transit and at rest; regular security audits and penetration testing; access controls and authentication requirements; employee training on data protection; and incident response procedures. However, no method of transmission over the internet is 100% secure.`
    },
    {
      id: 'retention',
      title: 'Data Retention',
      icon: 'clock',
      content: `We retain your information for as long as your account is active or as needed to provide services. After account deletion, we may retain certain information for legal compliance, dispute resolution, or legitimate business purposes. Anonymous or aggregated data may be retained indefinitely for analytics.`
    },
    {
      id: 'rights',
      title: 'Your Rights',
      icon: 'user',
      content: `Depending on your location, you may have rights to: access your personal data; correct inaccurate information; delete your data; export your data in a portable format; object to certain processing; restrict processing; and withdraw consent. To exercise these rights, contact us at privacy@broadcasttd.com.`
    },
    {
      id: 'children',
      title: 'Children\'s Privacy',
      icon: 'child',
      content: `Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected data from a child under 13, we will take steps to delete that information promptly.`
    },
    {
      id: 'international',
      title: 'International Transfers',
      icon: 'globe',
      content: `Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers, including standard contractual clauses and adequacy decisions where applicable.`
    },
    {
      id: 'changes',
      title: 'Changes to This Policy',
      icon: 'edit',
      content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of the service after changes constitutes acceptance of the revised policy.`
    }
  ];

  contactInfo = {
    email: 'privacy@broadcasttd.com',
    address: 'BROADCASTTD Privacy Team, 123 Series Street, Suite 456, San Francisco, CA 94102'
  };
}
