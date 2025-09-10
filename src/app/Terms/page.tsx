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
        <div style={{ display: 'flex', flexDirection: 'column', padding: '10%' }}>
          <h1>Privacy Policy for Zannya Africa Foundation</h1>

          <p><strong>Effective Date: August 5, 2025</strong></p>

          <p><strong>Zannya Africa Foundation,</strong> we respects your privacy and is committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard the information you provide while visiting our website.</p>


          <p style={{marginTop: '2%'}}><strong>1. Information We Collect</strong></p>

          <p>We may collect the following types of personal information:</p>

          <p>Name, email address, and phone number (e.g., via contact forms)</p>

          <p>IP address, browser type, and device information (through analytics tools)</p>

        <p>Any other data you voluntarily provide (e.g., event registrations or donations)</p>

        <p style={{marginTop: '2%'}}><strong>2. How We Use Your Information</strong></p>

        <p>We use the collected information for the following purposes:</p>

        <p>To respond to inquiries and provide support</p>

        <p>To improve our website, programs, and services</p>

        <p>To send updates, newsletters, or invitations </p>

        <p>To comply with legal obligations</p>

        <p style={{marginTop: '2%'}}><strong>3. Cookies and Tracking</strong></p>

        <p>Our website may use cookies to enhance your experience. You can control cookie settings through your browser.</p>

        <p style={{marginTop: '2%'}}><strong>4. Data Sharing</strong></p>
        <p>We do not sell or rent your personal information. We may share your data with trusted third-party service providers (e.g., analytics platforms, email services) who are obligated to keep your data secure.</p>

          <p style={{marginTop: '2%'}}><strong>5. Data Security</strong></p>

          <p>We take appropriate measures to secure your personal data, including encryption and access restrictions.</p>

          <p style={{marginTop: '2%'}}><strong>6. Your Rights</strong></p>

          <p>You have the right to:</p>

          <p>Request access to your data</p>

          <p>Ask us to correct or delete your data</p>

          <p>Withdraw your consent at any time</p>


          <p>Please contact us at <li><a href="mailto: contact@zannyaafricafoundation.org">contact@zannyaafricafoundation.org</a></li> for any data-related requests.</p>

          <p style={{marginTop: '2%'}}><strong>7. Childrens Privacy</strong></p>

          <p>We do not knowingly collect data from children under the age of 13. If we learn we have done so, we will delete the data promptly.</p>

          <p style={{marginTop: '2%'}}><strong>8. Changes to This Privacy Policy</strong></p>

          <p>We reserve the right to update this policy. Changes will be posted on this page with an updated effective date.</p>


          <p style={{marginTop: '2%'}}><strong>Legal Terms & Disclaimer</strong></p>

          <p>1. Ownership and Copyright</p>

          <p>All content on this website (text, images, logos, videos) is the property of Zannya Africa Foundation unless otherwise stated. Unauthorized use or reproduction is prohibited.</p>

          <p style={{marginTop: '2%'}}><strong>2. Acceptable Use</strong></p>

          <p>By accessing our site, you agree not to:</p>

          <p>Use the site for illegal or unauthorized purposes</p>

          <p>Attempt to hack or disrupt our services</p>

          <p>Upload harmful or inappropriate content</p>


          <p style={{marginTop: '2%'}}><strong>3. External Links</strong></p>

          <p>Our site may contain links to external websites. We are not responsible for the content or practices of those sites.</p>

          <p style={{marginTop: '2%'}}><strong>4. Limitation of Liability</strong></p>

          <p>We strive to provide accurate information, but we do not guarantee completeness or accuracy. We are not liable for any losses or damages arising from use of our site.</p>

          <p style={{marginTop: '2%'}}><strong>5. Changes to Legal Terms</strong></p>

          <p>We may update these terms at any time. Continued use of the website means you accept the changes.</p>


          <p style={{marginTop: '2%'}}>For questions or concerns, contact us at: Zannya Africa Foundation</p>
          <p><strong>Email:</strong> <a href="mailto:zannyaafricafoundation@gmail.com">zannyaafricafoundation@gmail.com</a></p>
          <p><strong>Phone:</strong> +256 786 797 963</p>

          <p style={{marginTop: '2%'}}><strong>Thank you for trusting us with your information.</strong></p>
        <p style={{ textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center', paddingTop: '30px' }}><strong>For more you can follow us on our socialplatforms:</strong></p><div style={{ display: "flex", justifyContent: "center", gap: "40px", fontSize: "30px", paddingTop: '10px' }}></div>
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
        </div><p style={{ textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center' }}><strong>Or you can email us for:</strong></p><div style={{ display: 'flex', paddingTop: '10px', flexDirection: 'row', justifyContent: 'center', gap: '30px' }}>
          <ul>
            <li><a href="mailto: info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a></li>
            <li><a href="mailto: support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a></li>
          </ul>
        </div><div style={{ margin: '3%', width: '100%' }}>
          <ContactUs />
        </div><div style={{ margin: '0%', width: '100%' }}>
          <OptionalFeatures />
        </div>
        </div>
        
    )
}