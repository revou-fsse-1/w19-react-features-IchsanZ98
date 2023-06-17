import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <>
      <section >
        <div >
          <h1 >ERROR</h1>
          <h2 >Oopsie!</h2>
          <p>The page you're looking for isn't here</p>
          <Link
            to="/"
        
          >
            <span>Go Back</span>
          </Link>
        </div>
      </section>
    </>
  );
};
