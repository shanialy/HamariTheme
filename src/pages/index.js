import Head from "next/head";
// import {getBlogPosts} from "@utils/blog";
// import LatestBlog from "@components/blog";
import { Fragment, useContext } from "react";
// import {getProductsBySkin} from "@utils/product";
// import sliderData from "@data/slider/home-one.json";
import { HeaderOne as Header } from "@components/header";
// import {SliderOne as Slider} from "@components/slider";
import { FooterOne as Footer } from "@components/footer";
import { ProductsContext } from "@global/ProductsContext";
import { HomePagesNavData as navContent } from "@data/navbar";
// import {ServicesOne as Services} from "@components/services";
// import {CategoriesOne as Categories} from "@components/categories";
import { ContentWrapperOne as ContentWrapper } from "@components/wrapper";
// import {PromoBannerOne as PromoBanners} from "@components/promo-banners";
// import {BestSelling, TendingProducts as Tending} from "@components/products";
import { withSearchkit, withSearchkitRouting } from "@searchkit/client";
import dynamic from "next/dynamic";
import withApollo from "../hocs/withApollo";
import PageShopLeftSidebar from "./shop/left-sidebar";

const Search = dynamic(() => import("../components/try/index"), { ssr: false });

const Home = ({ blogs }) => {
  // const {products} = useContext(ProductsContext);
  // const productsFashion = getProductsBySkin(products, "fashion");
  const logo = "/assets/images/no-placeholder/logo.png";

  return (
    <Fragment>
      <Search/>
      <PageShopLeftSidebar />
    </Fragment>
  );
};

// export async function getStaticProps() {
//     const blogs = getBlogPosts([
//         'title',
//         'excerpt',
//         'date',
//         'author',
//         'thumb',
//         'slug',
//         'categories'
//     ], 3);

//     return {
//         props: {
//             blogs: blogs
//         }
//     }
// }

export default withApollo(withSearchkit(withSearchkitRouting(Home)));
