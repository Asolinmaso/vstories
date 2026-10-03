export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FCFAF4]">
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-10 md:py-16">
        <h1
          className="mb-10 text-4xl font-semibold text-[#1D3B29] md:text-5xl"
          style={{ fontFamily: "var(--font-peachi)" }}
        >
          Privacy Policy
        </h1>

        <div className="space-y-8 font-inter text-sm leading-7 text-[#333333] md:text-base">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#1D3B29]">
              1. Information We Collect
            </h2>
            <p>We may collect:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
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
            <h2 className="mb-3 text-xl font-semibold text-[#1D3B29]">
              2. How We Use Your Information
            </h2>
            <p>We use collected information to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Process and deliver orders</li>
              <li>Improve website experience</li>
              <li>Provide customer support</li>
              <li>Send updates, promotions, and offers</li>
              <li>Improve our products and services</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#1D3B29]">
              3. Data Security
            </h2>
            <p>
              We implement appropriate security measures to protect your
              personal information from unauthorized access, misuse, or
              disclosure.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#1D3B29]">
              4. Cookies
            </h2>
            <p>
              Our website may use cookies to improve user experience and
              analyze website traffic.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#1D3B29]">
              5. Third-Party Services
            </h2>
            <p>We may share necessary information with trusted service providers including:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Payment providers</li>
              <li>Delivery partners</li>
              <li>Marketing services</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#1D3B29]">
              6. User Rights
            </h2>
            <p>
              Users may request access, updates, or deletion of their personal
              information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#1D3B29]">
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