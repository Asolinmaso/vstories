export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#FCFAF4]">
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-10 md:py-16">
        <h1
          className="mb-10 text-4xl font-semibold text-[#1D3B29] md:text-5xl"
          style={{ fontFamily: "var(--font-peachi)" }}
        >
          Shipping & Cancellations
        </h1>

        <div className="space-y-10 font-inter text-sm leading-7 text-[#333333] md:text-base">
          {/* Shipping Policy */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#1D3B29]">
              Shipping Policy
            </h2>

            <ul className="list-disc space-y-3 pl-6">
              <li>
                Orders are generally processed within{" "}
                <strong>1–3 business days</strong> after payment confirmation.
              </li>
              <li>
                Delivery timelines may vary depending on location and courier
                availability.
              </li>
              <li>
                Estimated delivery time:
                <ul className="mt-2 list-disc space-y-2 pl-6">
                  <li>
                    Metro cities: <strong>3–5 business days</strong>
                  </li>
                  <li>
                    Other locations: <strong>5–8 business days</strong>
                  </li>
                </ul>
              </li>
              <li>
                Customers will receive tracking details after dispatch.
              </li>
            </ul>
          </section>

          {/* Shipping Charges */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#1D3B29]">
              Shipping Charges
            </h2>

            <ul className="list-disc space-y-3 pl-6">
              <li>
                Free shipping on orders above <strong>₹799</strong>
              </li>
              <li>
                Standard shipping charges may apply to orders below the
                minimum value.
              </li>
            </ul>
          </section>

          {/* Cancellation Policy */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#1D3B29]">
              Cancellation Policy
            </h2>

            <ul className="list-disc space-y-3 pl-6">
              <li>Orders may be cancelled before they are shipped.</li>
              <li>
                Once an order has been dispatched, cancellation requests may
                not be accepted.
              </li>
              <li>
                Refunds for cancelled orders will be processed to the original
                payment method.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}