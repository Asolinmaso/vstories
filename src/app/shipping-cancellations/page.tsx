export default function ShippingCancellationsPage() {
  return (
    <main className="min-h-screen bg-[#F7EDE2]">
      <div className="max-w-[1000px] mx-auto px-6 py-16 md:py-24">
        <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-[#1D3B29] mb-10">
          Shipping & Cancellations
        </h1>

        <div className="font-inter text-[#2E2E2E] text-base md:text-lg leading-8 space-y-8">
          <section>
            <h2 className="font-semibold text-xl md:text-2xl mb-3">
              Shipping Policy
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Orders are generally processed within <strong>1–3 business days</strong> after payment confirmation.
              </li>
              <li>
                Delivery timelines may vary depending on location and courier availability.
              </li>
              <li>
                Estimated delivery time:
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Metro cities: <strong>3–5 business days</strong></li>
                  <li>Other locations: <strong>5–8 business days</strong></li>
                </ul>
              </li>
              <li>
                Customers will receive tracking details after dispatch.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-xl md:text-2xl mb-3">
              Shipping Charges
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Free shipping on orders above <strong>₹799</strong>
              </li>
              <li>
                Standard shipping charges may apply to orders below the
                minimum value.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-xl md:text-2xl mb-3">
              Cancellation Policy
            </h2>

            <ul className="list-disc pl-6 space-y-2">
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