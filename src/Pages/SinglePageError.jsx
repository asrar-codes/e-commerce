import { useRouteError } from "react-router-dom";

const SinglePageError = () => {
  const error = useRouteError();
  return (
    <section>
      <p className="text-xl font-semibold">{error.message}</p>
    </section>
  );
};

export default SinglePageError;
