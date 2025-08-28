import React, { useEffect } from 'react';

const Terms: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }, 100); 
  }, []);
  
  return (
    <main>
      <section className="hero">
        <div className="custom-container">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="h1 mb-4 text-2xl md:text-3xl lg:text-4xl">Hubnox — <span>Terms of Use</span></h1>
              <p className="text-base md:text-lg text-gray-400"><em>Last updated: July 28, 2025</em></p>
            </div>
            
            <div className="prose prose-sm md:prose-lg max-w-none text-white">
              <div className="bg-[#39405a] p-4 md:p-6 rounded-lg mb-6 md:mb-8">
                <p className="mb-0 font-medium text-sm md:text-base"><strong>Plain-English notice:</strong> These Terms form a binding contract between you and Hubnox Inc. Please read them carefully. By creating an account, purchasing a ticket, hosting an event, or otherwise using the Hubnox mobile or web apps (collectively, the <strong>"Platform"</strong>), you agree to these Terms. If you do not agree, do not use the Platform.</p>
              </div>
              
              <section className="mb-6 md:mb-8">
                <h2 className="h2 mb-3 md:mb-4 text-xl md:text-2xl">1. Who We Are</h2>
                <p className="mb-3 md:mb-4 text-sm md:text-base"><strong>Hubnox Inc.</strong></p>
                <p className="mb-3 md:mb-4 text-sm md:text-base"><strong>Legal &amp; Support Email:</strong> hello@hubnox.com</p>
                <p className="mb-3 md:mb-4 text-sm md:text-base">Hubnox is a <strong>service software</strong> where independent creators (<strong>"Creators"</strong>) host, sell, and manage live or recorded educational experiences (<strong>"Events"</strong>). Hubnox <strong>is not</strong> the organizer, operator, or insurer of any Event; we simply provide ticketing and related services.</p>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">2. Eligibility &amp; Accounts</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>No minimum age.</strong> However, if you are under 13 you must have parental or guardian consent, and you may not use the Platform if your local law prohibits online service use by minors.</li>
                  <li>You must provide accurate, complete information. Pseudonyms are allowed <strong>in addition</strong> to your legal name, which we may request at any time to verify identity.</li>
                  <li>You are responsible for all activity under your account, including compliance with these Terms.</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">3. Fees, Payments &amp; Payouts</h2>
                <ol className="list-decimal pl-6 space-y-4">
                  <li><strong>Payment Processor.</strong> All payments are processed by <strong>Stripe</strong>. By transacting on Hubnox, you agree to Stripe's Terms and Privacy Policy.</li>
                  <li><strong>Ticket Fees.</strong> Buyers pay a ticket processing fee of <strong>7%</strong>. We may introduce Platform monthly plans with at least <strong>7 days' prior notice</strong> (we will email you first).</li>
                  <li><strong>Subscriptions.</strong> Optional SaaS subscriptions renew automatically <strong>monthly or annually</strong> unless you turn off auto-renew in your account settings before the current term ends.</li>
                  <li><strong>Refunds.</strong> Refund policies vary <strong>per Event</strong>. Refunds may be issued by Hubnox or by the Creator at their discretion. Where no explicit policy is stated, all sales are final.</li>
                  <li><strong>Payouts to Creators.</strong> Net ticket proceeds (after Stripe fees and any applicable taxes/refunds) are remitted <strong>after the Event concludes</strong>. Creators must request payout by emailing hello@hubnox.com. Additional verification may be required.</li>
                </ol>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">4. User-Generated Content &amp; Intellectual Property</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Your Content.</strong> You retain ownership of all text, images, video, audio, and other materials you upload (<strong>"Content"</strong>). You grant Hubnox a <strong>non-exclusive, worldwide, royalty-free license</strong> to host, display, transmit, and publicly perform the Content for the purpose of operating, promoting, and improving the Platform.</li>
                  <li><strong>Recordings.</strong> Creators own their Event recordings. Hubnox may feature limited excerpts solely to promote the Event or the Platform; Hubnox will <strong>not</strong> sell or license full recordings without your written consent.</li>
                  <li><strong>DMCA.</strong> Hubnox responds to Digital Millennium Copyright Act takedown notices. Send claims to <strong>hello@hubnox.com</strong> with the subject line "DMCA Notice."</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">5. Acceptable Use &amp; Prohibited Activities</h2>
                <p className="mb-4">You agree <strong>not</strong> to:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Upload or distribute content that is illegal, defamatory, harassing, hateful, or pornographic.</li>
                  <li>Facilitate or teach activities involving firearms, explosives, or other regulated weapons.</li>
                  <li>Infringe any third-party IP or privacy rights.</li>
                  <li>Interfere with, hack, or attempt to disrupt the Platform.</li>
                  <li>Use automated means (bots, scrapers) without our prior written consent.</li>
                </ol>
                <p className="mt-4">Hubnox may remove content or suspend accounts <strong>immediately</strong> for violations.</p>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">6. Safety &amp; Disclaimers</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Event Liability.</strong> Hubnox is <strong>only a ticketing service</strong>. Creators are solely responsible for running their Events and for any personal injury, property damage, or other claims arising therefrom. Participants assume all risks associated with attending or participating in an Event.</li>
                  <li><strong>No Professional Endorsement.</strong> Hubnox does not certify, accredit, or endorse any Creator or their qualifications.</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">7. Termination</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You may close your account at any time via the app settings.</li>
                  <li>Hubnox may suspend or terminate any account <strong>immediately</strong> for violation of these Terms, suspected fraud, or to comply with law.</li>
                  <li>Upon termination, access to your data may be disabled, but Hubnox will retain attendee records on your behalf for compliance and audit purposes.</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">8. Modifying These Terms</h2>
                <p>We may update these Terms with at least <strong>7 days' notice</strong> posted in-app or via email. Continued use after the effective date constitutes acceptance. Material fee changes will apply only to future transactions.</p>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">9. Governing Law &amp; Dispute Resolution</h2>
                <ol className="list-decimal pl-6 space-y-4">
                  <li><strong>Governing Law.</strong> These Terms are governed by the laws of the <strong>State of Delaware</strong>, excluding its conflict-of-law rules.</li>
                  <li><strong>Arbitration Agreement.</strong> Any dispute that cannot be resolved informally shall be finally settled by <strong>binding arbitration</strong> administered by the American Arbitration Association (AAA) under its Commercial Rules. The arbitration will be in English, in Wilmington, Delaware, unless you and Hubnox agree otherwise.</li>
                  <li><strong>Opt-Out.</strong> You may opt out of this arbitration agreement by emailing <strong>hello@hubnox.com</strong> within <strong>30 days</strong> of first accepting these Terms. If you do, disputes may be resolved in the state or federal courts located in Delaware.</li>
                  <li><strong>Class-Action Waiver.</strong> ALL CLAIMS MUST BE BROUGHT <strong>INDIVIDUALLY</strong>; you and Hubnox waive any right to participate in class or representative actions.</li>
                </ol>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">10. International Users</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>No EU/UK 14-Day Withdrawal Right.</strong> By completing a purchase, you expressly request immediate performance of the service and acknowledge that you lose any statutory cooling-off period.</li>
                  <li><strong>GDPR.</strong> For details on personal-data processing and your data-subject rights, see our separate <a href="/privacy" className="text-[#EE46BC] hover:underline">[Privacy Policy]</a>, which is incorporated by reference.</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">11. Miscellaneous</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>These Terms (together with any additional policies referenced herein) constitute the entire agreement between you and Hubnox.</li>
                  <li>If any provision is found unenforceable, the rest will remain in effect.</li>
                  <li>Hubnox's failure to enforce a right is <strong>not</strong> a waiver.</li>
                  <li>You may not assign these Terms without our consent; we may assign them as part of a merger, acquisition, or asset sale.</li>
                  <li>Section headings are for convenience only.</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="h2 mb-4">12. Contact Us</h2>
                <p>Questions? Reach out at <strong><a href="mailto:hello@hubnox.com" className="text-[#EE46BC] hover:underline">hello@hubnox.com</a></strong>.</p>
              </section>
              
              <div className="bg-[#39405a] p-6 rounded-lg mt-8">
                <p className="mb-0 text-sm italic text-gray-400">These Terms are provided for informational purposes and do not constitute legal advice. Consult your attorney to ensure compliance with all applicable laws.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Terms;
