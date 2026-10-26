export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-[#FCFAF4]">
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-10 md:py-16">
        <h1
          className="mb-10 text-4xl font-semibold text-[#1D3B29] md:text-5xl"
          style={{ fontFamily: "var(--font-peachi)" }}
        >
          Returns & Refunds
        </h1>

        <div className="space-y-10 font-inter text-sm leading-7 text-[#333333] md:text-base">
          {/* Return Eligibility */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#1D3B29]">
              Return Eligibility
            </h2>

            <p className="mb-3">Products can be returned only if:</p>

            <ul className="list-disc space-y-3 pl-6">
              <li>Incorrect product received</li>
              <li>Damaged product received</li>
              <li>Product received in defective condition</li>
            </ul>
          </section>

          {/* Return Conditions */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#1D3B29]">
              Return Conditions
            </h2>

            <ul className="list-disc space-y-3 pl-6">
              <li>
                Return requests must be submitted within{" "}
                <strong>7 days</strong> of delivery.
              </li>
              <li>
                Products should remain unused and in original packaging.
              </li>
            </ul>
          </section>

          {/* Non-Returnable Items */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#1D3B29]">
              Non-Returnable Items
            </h2>

            <p className="mb-3">Returns are not accepted for:</p>

            <ul className="list-disc space-y-3 pl-6">
              <li>Opened or used products</li>
              <li>Personal care products damaged due to misuse</li>
              <li>Items purchased during special sale events</li>
            </ul>
          </section>

          {/* Refund Process */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#1D3B29]">
              Refund Process
            </h2>

            <ul className="list-disc space-y-3 pl-6">
              <li>
                Approved refunds will be processed within{" "}
                <strong>5–7 business days</strong> after inspection.
              </li>
              <li>
                Refund amount will be credited to the original payment method.
              </li>
            </ul>
          </section>

          {/* Contact Support */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#1D3B29]">
              Contact Support
            </h2>

            <p className="mb-2">For return or refund assistance:</p>

            <div className="space-y-1">
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@vstories.in"
                  className="text-[#1D3B29] underline underline-offset-2"
                >
                  support@vstories.in
                </a>
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:+916383921957"
                  className="text-[#1D3B29] underline underline-offset-2"
                >
                  +91 6383921957
                </a>
              </p>

              <p>
                <strong>Location:</strong> Kilakarai, Tamil Nadu
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}