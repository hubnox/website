import React, { useEffect } from "react";

const Privacy: React.FC = () => {

  useEffect(() => {
    setTimeout(() => {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }, 100); 
  }, []);

  return (
    <main>
      <section className="hero">
        <div className="custom-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="h1 mb-4">Hubnox — <span>Privacy Policy</span></h1>
              <p className="text-lg text-gray-400"><em>Last updated: July 28, 2025</em></p>
            </div>
            
            <div className="prose prose-lg max-w-none text-white">
              <div className="mb-8">
                <p className="text-lg">Hubnox Inc. ("<strong>Hubnox,</strong>" "<strong>we,</strong>" "<strong>us</strong>") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile applications, website, and related services (collectively, the <strong>"Service"</strong>).</p>
                <p className="mt-4">If you do not agree with the practices described here, please do not use the Service. Capitalized terms not defined in this Policy have the meanings given in our Terms of Use.</p>
              </div>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">1. Scope of This Policy</h2>
                <p>This Policy applies to personal information that we process in connection with your use of the Service worldwide. Separate privacy notices may apply to employees, contractors, or specific promotions; those notices supplement this Policy.</p>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">2. Information We Collect</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-600 mb-6">
                    <thead>
                      <tr className="bg-[#39405a]">
                        <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Category</th>
                        <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Examples</th>
                        <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-600 px-4 py-3"><strong>Account Information</strong></td>
                        <td className="border border-gray-600 px-4 py-3">Name, email, password hash, profile photo, display name (pseudonym)</td>
                        <td className="border border-gray-600 px-4 py-3">You</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-3"><strong>Creator & Event Data</strong></td>
                        <td className="border border-gray-600 px-4 py-3">Event titles, descriptions, dates, ticket prices, recordings, chat messages</td>
                        <td className="border border-gray-600 px-4 py-3">You / Creators</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-3"><strong>Transaction Data</strong></td>
                        <td className="border border-gray-600 px-4 py-3">Purchase amount, currency, last 4 digits of card, billing address</td>
                        <td className="border border-gray-600 px-4 py-3">Stripe (we never store full card numbers)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-3"><strong>Usage Data</strong></td>
                        <td className="border border-gray-600 px-4 py-3">Pages viewed, links clicked, referral URL, session duration</td>
                        <td className="border border-gray-600 px-4 py-3">Automatic</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-3"><strong>Device & Log Data</strong></td>
                        <td className="border border-gray-600 px-4 py-3">IP address, device ID, OS, browser type, crash logs</td>
                        <td className="border border-gray-600 px-4 py-3">Automatic</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-3"><strong>Cookies & Similar Tech</strong></td>
                        <td className="border border-gray-600 px-4 py-3">Session cookies, analytics cookies, marketing pixels</td>
                        <td className="border border-gray-600 px-4 py-3">Automatic</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-3"><strong>Support & Communications</strong></td>
                        <td className="border border-gray-600 px-4 py-3">Emails, in-app messages, survey responses</td>
                        <td className="border border-gray-600 px-4 py-3">You</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-300">We do <strong>not</strong> knowingly collect data from children under 13. If you believe we have collected such data, contact us at <strong>hello@hubnox.com</strong> and we will delete it.</p>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">3. How We Use Your Information</h2>
                <p className="mb-4">We use personal information to:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li><strong>Provide and maintain the Service</strong> (create accounts, host events, process payments, pay Creators).</li>
                  <li><strong>Improve and personalize</strong> the Service, including AI-powered recommendations.</li>
                  <li><strong>Communicate</strong> with you about your account, transactions, and changes to our terms.</li>
                  <li><strong>Market</strong> events or features you may like (you can opt out at any time).</li>
                  <li><strong>Detect, prevent, and address</strong> fraud, abuse, security incidents, and legal claims.</li>
                  <li><strong>Comply</strong> with legal obligations and enforce our Terms of Use.</li>
                </ol>
                <p className="mt-4 text-sm text-gray-300">Where required by law, we rely on the following legal bases: (a) performance of a contract; (b) your consent; (c) our legitimate interests (e.g., service improvement, marketing); and (d) compliance with a legal obligation.</p>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">4. How We Share Information</h2>
                <p className="mb-4">We share information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>With Creators.</strong> If you buy a ticket, your name, email, and attendance status are shared with the Creator so they can run the Event.</li>
                  <li><strong>With Service Providers.</strong> Payment processing (Stripe), cloud hosting, analytics, email delivery, customer-support tools.</li>
                  <li><strong>As Required by Law.</strong> To regulators, courts, or law-enforcement when we believe disclosure is required.</li>
                  <li><strong>Business Transfers.</strong> In connection with a merger, acquisition, or asset sale. You will be notified of any change in ownership.</li>
                </ul>
                <p className="mt-4">We do <strong>not</strong> sell personal information for money. We do not allow third-party advertising networks on the Service.</p>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">5. Cookies &amp; Tracking Technologies</h2>
                <p>We use cookies and similar technologies to keep you signed in, remember preferences, and measure Site performance. You can control cookies through your browser settings; however, disabling cookies may limit certain features.</p>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">6. Your Privacy Rights</h2>
                
                <div className="mb-6">
                  <h3 className="h3 mb-3">6.1 European Economic Area (EEA/UK)</h3>
                  <p>If you are located in the EEA or UK, you have the right to access, correct, delete, restrict, or object to our processing of your personal data, and the right to data portability. You may also lodge a complaint with your local Data Protection Authority.</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="h3 mb-3">6.2 California (CCPA/CPRA)</h3>
                  <p>California residents may request (i) a list of the categories of personal information we collected, disclosed, or "shared" in the last 12 months, (ii) access to specific pieces of information, (iii) deletion, and (iv) correction. We do not "sell" or "share" personal information as those terms are defined under the CCPA.</p>
                </div>
                
                <p>To exercise any privacy right, email <strong><a href="mailto:hello@hubnox.com" className="text-[#EE46BC] hover:underline">hello@hubnox.com</a></strong>. We will verify your identity before responding.</p>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">7. Data Retention</h2>
                <p className="mb-4">We keep personal information only as long as necessary to fulfill the purposes described above, to comply with legal obligations, or to resolve disputes—whichever period is longer. Typical retention periods are:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Account data: while your account is active and for up to 2 years after closure.</li>
                  <li>Transaction records: 7 years (for tax and accounting).</li>
                  <li>Event recordings: until the Creator requests deletion or 2 years after the Event, whichever comes first.</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">8. Security</h2>
                <p>We employ industry-standard technical and organizational measures such as encryption in transit and at rest, access controls, and regular security audits. No system is 100% secure, so we cannot guarantee absolute security.</p>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">9. International Transfers</h2>
                <p>We are headquartered in the United States and store data on U.S. servers. If you access the Service from outside the U.S., you consent to transferring your data to the U.S. Where required, we use Standard Contractual Clauses or rely on adequacy decisions to legitimize transfers.</p>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">10. Children's Privacy</h2>
                <p>The Service is <strong>not directed to children under 13</strong>. Parents or guardians who believe their child provided us personal information may contact <strong><a href="mailto:hello@hubnox.com" className="text-[#EE46BC] hover:underline">hello@hubnox.com</a></strong> to request deletion.</p>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">11. Changes to This Policy</h2>
                <p>We may modify this Policy. We will give at least <strong>7 days' notice</strong> via email or in-app message before material changes take effect. Continued use after the effective date constitutes acceptance.</p>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">12. Contact Us</h2>
                <p>Questions about this Policy or our privacy practices? Email <strong><a href="mailto:hello@hubnox.com" className="text-[#EE46BC] hover:underline">hello@hubnox.com</a></strong></p>
              </section>
              
              <div className="bg-[#39405a] p-6 rounded-lg mt-8">
                <p className="mb-0 text-sm italic text-gray-400">This Privacy Policy is provided for general informational purposes and does not constitute legal advice. Consult a qualified attorney to ensure compliance with all applicable laws.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Privacy;
