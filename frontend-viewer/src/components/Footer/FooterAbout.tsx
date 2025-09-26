import { Link } from "react-router";

const FooterAbout = () => {
  return (
    <div>
      <div className="mb-8">
        <Link to={"/"} className="text-2xl text-[var(--color-primary)]">
          Chill Times
        </Link>
        <p>Share your story with the world.</p>
      </div>
      <p>
        A modern platform for writers and readers to share ideas, stories, and
        knowledge in a beautiful, engaging way.
      </p>
    </div>
  );
};

export default FooterAbout;
