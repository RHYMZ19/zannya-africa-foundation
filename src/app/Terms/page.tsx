'use client';

import router from "next/router";
import { FaHome, FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaWhatsapp } from "react-icons/fa";
import ContactUs from "../ContactUs/page";
import Gallery from "../Gallery/Gallery";
import GetInvolved from "../GetInvolved/GetInvolved";
import IncreaseIma from "../Newsp/components/IncreaseIma";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import StickyBar from "../StickyBar/StickyBar";
import styles from './Terms.module.css';

export default function
Terms() {
    return(
        <div style={{ overflow: 'hidden' }}>
            <div style={{ justifyItems: 'center', gap: '1%' }}>
        <StickyBar>
          <FaHome
            style={{ width: '25%', height: '25%' }}
            color="black"
            cursor='pointer'
            onClick={() => router.push('/')}
          >
            Home
          </FaHome>
          <GetInvolved />
          <Gallery />
          <button
            onClick={() => router.push('/Donates')}
            className={styles.arrowButton}>Donate
          </button>
          <IncreaseIma src='/log.jpg' alt="log" />
        </StickyBar>
      </div>
        <div style={{display: 'flex', flexWrap: 'wrap', padding: '20%'}}>
            Privacy Policy for Zannya Africa Foundation

Effective Date: August 5, 2025

Zannya Africa Foundation (we, our, or us) respects your privacy and is committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard the information you provide while visiting our website.


1. Information We Collect

We may collect the following types of personal information:

Name, email address, and phone number (e.g., via contact forms)

IP address, browser type, and device information (through analytics tools)

Any other data you voluntarily provide (e.g., event registrations or donations)


2. How We Use Your Information

We use the collected information for the following purposes:

To respond to inquiries and provide support

To improve our website, programs, and services

To send updates, newsletters, or invitations (with your consent)

To comply with legal obligations


3. Cookies and Tracking

Our website may use cookies to enhance your experience. You can control cookie settings through your browser.

4. Data Sharing

We do not sell or rent your personal information. We may share your data with trusted third-party service providers (e.g., analytics platforms, email services) who are obligated to keep your data secure.

5. Data Security

We take appropriate measures to secure your personal data, including encryption and access restrictions.

6. Your Rights

You have the right to:

Request access to your data

Ask us to correct or delete your data

Withdraw your consent at any time


Please contact us at [insert contact email] for any data-related requests.

7. Childrens Privacy

We do not knowingly collect data from children under the age of 13. If we learn we have done so, we will delete the data promptly.

8. Changes to This Privacy Policy

We reserve the right to update this policy. Changes will be posted on this page with an updated effective date.


Legal Terms & Disclaimer

1. Ownership and Copyright

All content on this website (text, images, logos, videos) is the property of Zannya Africa Foundation unless otherwise stated. Unauthorized use or reproduction is prohibited.

2. Acceptable Use

By accessing our site, you agree not to:

Use the site for illegal or unauthorized purposes

Attempt to hack or disrupt our services

Upload harmful or inappropriate content


3. External Links

Our site may contain links to external websites. We are not responsible for the content or practices of those sites.

4. Limitation of Liability

We strive to provide accurate information, but we do not guarantee completeness or accuracy. We are not liable for any losses or damages arising from use of our site.

5. Changes to Legal Terms

We may update these terms at any time. Continued use of the website means you accept the changes.


For questions or concerns, contact us at: Zannya Africa Foundation
Email: [insert email address]
Phone: [insert phone number]

Thank you for trusting us with your information.
        </div>
        <p style={{textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center',paddingTop: '30px'}}><strong>For more you can follow us on our socialplatforms:</strong></p>
                                  <div style={{ display: "flex",justifyContent: "center",  gap: "40px", fontSize: "30px",paddingTop: '10px'}}>
                                            <a href="https://facebook.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
                                              <FaFacebook />
                                            </a>
                                            <a href="https://instagram.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "pink" }}>
                                              <FaInstagram />
                                            </a>
                                            <a href="https://tiktok.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
                                              <FaTiktok />
                                            </a>
                                            <a href="https://twitter.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
                                              <FaTwitter />
                                            </a>
                                            <a href="https://wa.me/256743878261" target="_blank" rel="noopener noreferrer" style={{ color: 'green' }}>
                                              <FaWhatsapp />
                                            </a>
                                          </div>
                                          <p style={{textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center'}}><strong>Or you can email us for:</strong></p>
                                          <div style={{display: 'flex',paddingTop: '10px', flexDirection: 'row', justifyContent: 'center', gap: '30px'}}>
                                      <ul>
                                      <li><a href="mailto: info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a></li>
                                      <li><a href="mailto: support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a></li>
                                      </ul>
                                    </div>
        
              <div style={{ margin: '3%', width: '100%' }}>
                <ContactUs />
              </div>
        
              <div style={{ margin: '0%', width: '100%' }}>
                <OptionalFeatures />
              </div>
        </div>
    )
}