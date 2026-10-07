export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F7EDE2]">
      <div className="max-w-[1000px] mx-auto px-6 py-16 md:py-24">
        <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-[#1D3B29] mb-10">
          Privacy Policy
        </h1>

        <div className="font-inter text-[#2E2E2E] text-base md:text-lg leading-8 space-y-8">
          <section>
            <h2 className="font-semibold text-xl md:text-2xl mb-3">
              1. Information We Collect
            </h2>
            <p>We may collect:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Shipping and billing address</li>
              <li>Payment information</li>
              <li>Order history</li>
              <li>Website usage information</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-xl md:text-2xl mb-3">
              2. How We Use Your Information
            </h2>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Process and deliver orders</li>
              <li>Improve website experience</li>
              <li>Provide customer support</li>
              <li>Send updates, promotions, and offers</li>
              <li>Improve our products and services</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-xl md:text-2xl mb-3">
              3. Data Security
            </h2>
            <p>
              We implement appropriate security measures to protect your
              personal information from unauthorized access, misuse, or
              disclosure.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl md:text-2xl mb-3">
              4. Cookies
            </h2>
            <p>
              Our website may use cookies to improve user experience and
              analyze website traffic.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl md:text-2xl mb-3">
              5. Third-Party Services
            </h2>
            <p>We may share necessary information with trusted service providers including:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Payment providers</li>
              <li>Delivery partners</li>
              <li>Marketing services</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-xl md:text-2xl mb-3">
              6. User Rights
            </h2>
            <p>
              Users may request access, updates, or deletion of their personal
              information.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl md:text-2xl mb-3">
              7. Policy Updates
            </h2>
            <p>
              This policy may be updated periodically without prior notice.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}