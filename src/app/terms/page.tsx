export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FCFAF4]">
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-10 md:py-16">
        <h1
          className="mb-10 text-4xl font-semibold text-[#1D3B29] md:text-5xl"
          style={{ fontFamily: "var(--font-peachi)" }}
        >
          Terms & Conditions
        </h1>

        <div className="space-y-8 font-inter text-sm leading-7 text-[#333333] md:text-base">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#1D3B29]">
              1. Introduction
            </h2>
            <p>
              Welcome to Vstories. By accessing and using our website, you
              agree to comply with and be bound by these Terms & Conditions.
              Please read them carefully before using our services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#1D3B29]">
              2. Products & Information
            </h2>
            <p>
              We strive to ensure all product details, pricing, images, and
              descriptions are accurate. However, minor variations in product
              packaging, color, or appearance may occur.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#1D3B29]">
              3. Pricing & Payments
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                All prices are displayed in INR (₹) and include applicable
                taxes unless stated otherwise.
              </li>
              <li>
                We reserve the right to modify product pricing without prior
                notice.
              </li>
              <li>
                Payments can be made using approved payment methods available
                on our website.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#1D3B29]">
              4. Orders
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Orders are subject to acceptance and availability.</li>
              <li>
                Vstories reserves the right to cancel or refuse orders for any
                reason including pricing errors, stock availability, or
                suspected fraudulent activity.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#1D3B29]">
              5. User Accounts
            </h2>
            <p>
              Users are responsible for maintaining the confidentiality of
              their account credentials and activities under their account.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#1D3B29]">
              6. Intellectual Property
            </h2>
            <p>
              All website content including logos, images, designs, graphics,
              text, and product content are the property of Vstories and may
              not be copied or used without permission.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#1D3B29]">
              7. Limitation of Liability
            </h2>
            <p>
              Vstories shall not be held responsible for indirect, incidental,
              or consequential damages arising from the use of our products or
              website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#1D3B29]">
              8. Changes to Terms
            </h2>
            <p>
              We reserve the right to update these terms at any time without
              prior notice.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
