import { Link } from "react-router";

const HomePage = () => {
  return (
    <main className="flex flex-wrap justify-center items-center gap-24 md:gap-10 py-10 px-4">
      <section className="text-center md:text-left">
        <h2 className="text-2xl my-2 font-bold md:text-4xl text-[var(--color-stone-cold)]">
          Welcome to your{" "}
          <span className="text-[var(--color-primary)] font-normal">
            blogging{" "}
          </span>
          space.
        </h2>
        <p className="text-lg md:text-xl text-[var(--color-carbon)] italic">
          A place to share your thoughts and discover new ideas.
        </p>

        <Link
          to="/blog"
          className="mt-6 inline-block bg-[var(--color-black-pearl)] text-[var(--color-surface)] px-6 py-3 rounded-lg hover:bg-[var(--color-carbon)] transition-colors font-bold"
        >
          Explore Blogs
        </Link>
      </section>

      <section id="image">
        <img src="/homepage.png" alt="homepage image" />
      </section>
    </main>
  );
};

export default HomePage;
