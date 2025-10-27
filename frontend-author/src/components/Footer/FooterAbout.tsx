import { Link } from "react-router";

const FooterAbout = () => {
  return (
    <div className="mr-4">
      <div className="mb-8">
        <Link
          to={"/"}
          className="text-2xl text-[var(--color-primary)] cursor-pointer font-bold transition-colors hover:text-[var(--color-carbon)]"
        >
          Chill Times
        </Link>
        <p className="text-[var(--color-stone-cold)]">
          Share your story with the world.
        </p>
      </div>
      <p className="text-[var(--color-muted)]">
        A modern platform for writers and readers to share ideas, stories, and
        knowledge in a beautiful, engaging way.
      </p>
    </div>
  );
};

export default FooterAbout;
