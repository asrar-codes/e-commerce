import { Carousel, Contact, FeaturedProducts } from "../components";
import { customFetch } from "../utils/customFetch";
const products_url = `https://strapi-store-server.onrender.com/api/products?featured=true`;

export const loader = async () => {
  const { data } = await customFetch(`${products_url}`);

  let noOfPages = data.meta.pagination.pageCount;
  return { products: data.data, noOfPages };
};

const Home = () => {
  // console.log("first");
  return (
    <>
      <Carousel />
      <FeaturedProducts />
      <Contact />
    </>
  );
};

export default Home;
