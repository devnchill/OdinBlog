const ContactPage = () => {
  return (
    <main className="w-full flex justify-center px-4 py-10 text-[var(--color-surface)]">
      <section className="max-w-3xl bg-[var(--color-darkish)] border border-[var(--color-border)] rounded-2xl p-8 shadow-xl space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] text-center">
          Contact Us
        </h1>

        <p className="text-[var(--color-muted)] leading-relaxed text-center">
          Have a question, feedback, or collaboration idea? We're always open to
          hearing from you. Use the details below to reach out. We'll respond as
          soon as we can.
        </p>

        <div className="space-y-4">
          <div className="bg-[var(--color-black-pearl)] border border-[var(--color-border)] rounded-xl p-4">
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
              Email
            </h2>
            <p className="text-[var(--color-muted)]">support@chilltimes.com</p>
          </div>

          <div className="bg-[var(--color-black-pearl)] border border-[var(--color-border)] rounded-xl p-4">
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
              Business Inquiries
            </h2>
            <p className="text-[var(--color-muted)]">business@chilltimes.com</p>
          </div>

          <div className="bg-[var(--color-black-pearl)] border border-[var(--color-border)] rounded-xl p-4">
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
              Social Media
            </h2>
            <ul className="text-[var(--color-muted)] space-y-1">
              <li>Twitter: @chilltimes</li>
              <li>Instagram: @chilltimes</li>
              <li>GitHub: @chilltimes</li>
            </ul>
          </div>
        </div>

        <p className="text-center text-[var(--color-primary-glow)] font-semibold text-lg pt-4">
          We're here to help. Don't hesitate to reach out.
        </p>
      </section>
    </main>
  );
};

export default ContactPage;
