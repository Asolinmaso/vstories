export default function ReturnsRefundsPage() {
  return (
    <main className="min-h-screen bg-[#F7EDE2]">
      <div className="max-w-[1000px] mx-auto px-6 py-16 md:py-24">
        <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-[#1D3B29] mb-10">
          Returns & Refunds
        </h1>

        <div className="font-inter text-[#2E2E2E] text-base md:text-lg leading-8 space-y-8">
          <section>
            <h2 className="font-semibold text-xl md:text-2xl mb-3">
              Return Eligibility
            </h2>

            <p>Products can be returned only if:</p>

            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Incorrect product received</li>
              <li>Damaged product received</li>
              <li>Product received in defective condition</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-xl md:text-2xl mb-3">
              Return Conditions
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Return requests must be submitted within <strong>7 days</strong>{" "}
                of delivery.
              </li>
              <li>
                Products should remain unused and in original packaging.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-xl md:text-2xl mb-3">
              Non-Returnable Items
            </h2>

            <p>Returns are not accepted for:</p>

            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Opened or used products</li>
              <li>Personal care products damaged due to misuse</li>
              <li>Items purchased during special sale events</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-xl md:text-2xl mb-3">
              Refund Process
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Approved refunds will be processed within{" "}
                <strong>5–7 business days</strong> after inspection.
              </li>
              <li>
                Refund amount will be credited to the original payment method.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-xl md:text-2xl mb-3">
              Contact Support
            </h2>

            <p>For return or refund assistance:</p>

            <div className="mt-3 space-y-1">
              <p>
                <strong>Email:</strong> support@vstories.in
              </p>
              <p>
                <strong>Phone:</strong> +91 6383921957
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