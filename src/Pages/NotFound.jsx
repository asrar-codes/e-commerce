import { Link, useRouteError } from "react-router-dom";
import notFoundSvg from "../assets/notFound.svg";
const NotFound = () => {
  const error = useRouteError();
  if (error && error.status === 404) {
    return (
      <section className="page text-center grid grid-cols-2">
        <div>
          <p className="text-8xl text-center">404</p>
          <p className="text-4xl">The page you're looking for doesn't exist.</p>
          <button className="mt-4">
            <Link to="/" className="capitalize text-xl text-blue-500">
              back to home
            </Link>
          </button>
        </div>
        <div className="img-container">
          <img src={notFoundSvg} alt="Page Not Found" />
        </div>
      </section>
    );
  }
  console.log(error);

  return (
    <section className="page">
      <h3>Error: {error.message}</h3>
    </section>
  );
};

export default NotFound;
