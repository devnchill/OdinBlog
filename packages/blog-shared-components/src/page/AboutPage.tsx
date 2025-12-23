const AboutPage = () => {
  return (
    <main className="w-full flex justify-center px-4 py-10 text-[var(--color-surface)]">
      <section className="max-w-3xl bg-[var(--color-darkish)] border border-[var(--color-border)] rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-6 text-center">
          About Chill Times
        </h1>

        <p className="text-[var(--color-muted)] leading-relaxed mb-6">
          Chill Times is a space built for people who love writing, learning,
          and sharing ideas without noise or clutter. Our goal is simple: let
          voices be heard. Whether you want to express a thought, document a
          journey, or explore what others are thinking, this is your corner of
          the internet.
        </p>

        <p className="text-[var(--color-muted)] leading-relaxed mb-6">
          The platform is designed to be fast, accessible, and distraction-free.
          Powered by a clean theme, a sharp color palette, and a smooth reading
          experience, it encourages writers to focus entirely on their craft.
        </p>

        <p className="text-[var(--color-muted)] leading-relaxed mb-6">
          Built with modern tools, strong architecture, and thoughtful design,
          Chill Times continues to evolve—driven by a commitment to simplicity
          and expression.
        </p>

        <p className="text-[var(--color-primary-glow)] text-lg font-semibold text-center">
          Thanks for being here. Keep writing. Keep exploring.
        </p>
      </section>
    </main>
  );
};

export { AboutPage };
