/* eslint-disable react/no-unescaped-entities */
export default function Terms() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="space-y-6 text-zinc-300">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using TikFlow, you agree to be bound by these Terms of Service and our Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
            <p>TikFlow provides tools for managing and analyzing TikTok content. We reserve the right to modify or discontinue the service at any time.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>You must provide accurate information when using our service</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You agree to comply with TikTok's terms of service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Limitations of Liability</h2>
            <p>TikFlow is provided "as is" without any warranties. We are not liable for any damages arising from your use of the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Changes to Terms</h2>
            <p>We may update these terms from time to time. Continued use of TikFlow after changes constitutes acceptance of new terms.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
