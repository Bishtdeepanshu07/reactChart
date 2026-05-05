import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm italic text-gray-400 mb-1">Last Modified: 8 April 2026</p>
        <p className="text-sm text-gray-400 mb-12">
          Previous Version: <span className="underline">8 April 2026</span>
        </p>

        <div className="space-y-10 text-gray-300 leading-relaxed text-[15px] sm:text-base font-sans">
          <p>
            Welcome to our website. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
          </p>

          <Section title="1. Information We Collect">
            <p className="mb-4">We may collect the following types of information:</p>

            <h4 className="font-semibold text-gray-200 mb-2">a) Personal Information</h4>
            <ul className="list-disc pl-6 mb-5 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Login credentials</li>
            </ul>

            <h4 className="font-semibold text-gray-200 mb-2">b) Usage Data</h4>
            <ul className="list-disc pl-6 mb-5 space-y-1">
              <li>Browser type</li>
              <li>Pages visited</li>
              <li>Time spent on the website</li>
            </ul>

            <h4 className="font-semibold text-gray-200 mb-2">c) Uploaded Data</h4>
            <p>Any files (e.g., Excel data) uploaded by admin for dashboard analysis</p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide and maintain our services</li>
              <li>Authenticate users and manage accounts</li>
              <li>Display personalized dashboards</li>
              <li>Improve website performance and user experience</li>
              <li>Communicate with users (if needed)</li>
            </ul>
          </Section>

          <Section title="3. Data Storage and Security">
            <p className="mb-4">
              We use secure backend services (such as Supabase) to store and manage your data.
            </p>
            <p className="mb-4">We take reasonable steps to:</p>
            <ul className="list-disc pl-6 mb-5 space-y-1">
              <li>Protect your data from unauthorized access</li>
              <li>Prevent data loss or misuse</li>
            </ul>
            <p>However, no method of transmission over the internet is 100% secure.</p>
          </Section>

          <Section title="4. Sharing of Information">
            <p className="mb-4">We do not sell or rent your personal data.</p>
            <p className="mb-4">We may share data only:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>With trusted services required to run the website (e.g., backend services)</li>
              <li>If required by law</li>
            </ul>
          </Section>

        
          <Section title="5. User Rights">
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Stop using the service at any time</li>
            </ul>
          </Section>

          <Section title="6. Third-Party Services">
            <p>
              We may use third-party tools (like analytics or backend services). These services may collect data according to their own privacy policies.
            </p>
          </Section>

          <Section title="7. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised date.
            </p>
          </Section>

          <Section title="8. Contact Us">
            <p className="mb-4">If you have any questions about this Privacy Policy, you can contact us at:</p>
            <p>
              Email:{' '}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=support@adventmcs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 underline hover:text-white transition-colors"
              >
                support@adventmcs.com
              </a>
            </p>
          </Section>

          <p className="pt-6 border-t border-gray-700 text-gray-500 text-sm">
            By using our website, you agree to this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">{title}</h2>
    {children}
  </section>
);

export default PrivacyPolicy;
