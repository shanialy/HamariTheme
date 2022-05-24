import PropTypes, { arrayOf } from "prop-types";
import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useSort, useFilter, useWindowSize } from "@hooks";
import LoadMore from "@components/shop/elements/LoadMore";
import ShopOptions from "@components/shop/elements/ShopOptions";
import ShopFilters from "@components/shop/elements/ShopFilters";
import { gql, useQuery } from "@apollo/client";
import { useSearchkitVariables } from "@searchkit/client";
import ShopProducts from "@components/shop/elements/ShopProducts";
const query = gql`
  query resultSet(
    $query: String
    $filters: [SKFiltersSet]
    $page: SKPageInput
    $sortBy: String
  ) {
    results(query: $query, filters: $filters) {
      summary {
        total
        appliedFilters {
          id
          identifier
          display
          label
          ... on DateRangeSelectedFilter {
            dateMin
            dateMax
            __typename
          }
          ... on ValueSelectedFilter {
            value
            __typename
          }
          __typename
        }
        sortOptions {
          id
          label
          __typename
        }
        query
        __typename
      }
      hits(page: $page, sortBy: $sortBy) {
        page {
          total
          totalPages
          pageNumber
          from
          size
          __typename
        }
        sortedBy
        items {
          ... on ResultHit {
            id
            fields {
              gender
              title
              image
              vendor
              price
              price_before_sale
              domain
              product_type
              is_on_sale
              updatedAt
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      facets {
        identifier
        type
        label
        display
        entries {
          label
          count
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;

const ShopGrid = ({
  //   products,
  pageTitle,
  sidebar,
  sidebarPosition,
  containerFluid,
}) => {
  const arr = [
    {
      domain: "brandsroots.com",
      gender: "",
      image:
        "https://cdn.shopify.com/s/files/1/0271/2993/8003/products/next-long-sleeve-crew-neck-jersey-lycra-blouse-for-ladies-slate-grey-with-stripes-an3885_1.jpg?v=1646237398",
      is_on_sale: true,
      price: "999",
      price_before_sale: "3499",
      product_type: "jersey",
      title:
        "Nxt Long Sleeve Crew Neck Jersey Lycra Strech Blouse For Ladies-Slate Grey With Stripes-AN3885",
      updatedAt: "2022-03-02T21:14:37+05:00",
      vendor: "Next",
    },
    {
      domain: "brandsroots.com",
      gender: "",
      image:
        "https://cdn.shopify.com/s/files/1/0271/2993/8003/products/next-long-sleeve-crew-neck-jersey-lycra-blouse-for-ladies-slate-grey-with-stripes-an3885_1.jpg?v=1646237398",
      is_on_sale: true,
      price: "999",
      price_before_sale: "3499",
      product_type: "jersey",
      title:
        "Nxt Long Sleeve Crew Neck Jersey Lycra Strech Blouse For Ladies-Slate Grey With Stripes-AN3885",
      updatedAt: "2022-03-02T21:14:37+05:00",
      vendor: "Next",
    },
    {
      domain: "brandsroots.com",
      gender: "",
      image:
        "https://cdn.shopify.com/s/files/1/0271/2993/8003/products/next-long-sleeve-crew-neck-jersey-lycra-blouse-for-ladies-slate-grey-with-stripes-an3885_1.jpg?v=1646237398",
      is_on_sale: true,
      price: "999",
      price_before_sale: "3499",
      product_type: "jersey",
      title:
        "Nxt Long Sleeve Crew Neck Jersey Lycra Strech Blouse For Ladies-Slate Grey With Stripes-AN3885",
      updatedAt: "2022-03-02T21:14:37+05:00",
      vendor: "Next",
    },
  ];
  const variables = useSearchkitVariables();
  const {
    previousData,
    data = previousData,
    loading,
  } = useQuery(query, {
    variables: variables,
  });
  console.log(data);
  let arry = [
    {
      domain: "brandsroots.com",
      gender: "",
      image:
        "https://cdn.shopify.com/s/files/1/0271/2993/8003/products/next-long-sleeve-crew-neck-jersey-lycra-blouse-for-ladies-slate-grey-with-stripes-an3885_1.jpg?v=1646237398",
      is_on_sale: true,
      price: "999",
      price_before_sale: "3499",
      product_type: "jersey",
      title:
        "Nxt Long Sleeve Crew Neck Jersey Lycra Strech Blouse For Ladies-Slate Grey With Stripes-AN3885",
      updatedAt: "2022-03-02T21:14:37+05:00",
      vendor: "Next",
    },
  ];
  // const arr = data?.results?.hits?.items;
//   data?.results?.hits?.items.map((item) => {
//     arry = [...arry, { item }];

//     //...arr --> spread operator
//   });
//   console.log("new", arry);
  const [windowSize] = useWindowSize();
  const [productPerPage, setProductPerPage] = useState(containerFluid ? 12 : 8);
  const [layout, setLayout] = useState(
    sidebar ? "tt-col-three" : "tt-col-four"
  );
  //   const { allProducts, filterPanelShow, filterPanelHandler, getFilterParam } =
  //     useFilter(products);
  //   const { onSortHandler, sortProducts } = useSort(allProducts);

  const getLayout = (col) => {
    setLayout(col);
  };

  const onProductPerPageHandler = (e) => {
    const value = parseInt(e.target.value, 10);
    setProductPerPage(value);
  };

  //   const onLoadMorHandler = async () => {
  //     const productShowPerPage = (prevValue) =>
  //       prevValue < allProducts.length
  //         ? allProducts.length - prevValue > 4
  //           ? (prevValue += 4)
  //           : (prevValue += allProducts.length - prevValue)
  //         : prevValue;
  //     setProductPerPage((prevState) => productShowPerPage(prevState));
  //   };

  useEffect(() => {
    // Window Viewport specific product grid
    if (!sidebar) {
      if (!containerFluid) {
        (windowSize <= 499 && setLayout("tt-col-one")) ||
          (windowSize > 499 && windowSize <= 799 && setLayout("tt-col-two")) ||
          (windowSize > 800 &&
            windowSize <= 1024 &&
            setLayout("tt-col-three")) ||
          (windowSize >= 1025 && setLayout("tt-col-four"));
      } else {
        (windowSize <= 499 && setLayout("tt-col-one")) ||
          (windowSize > 499 && windowSize <= 799 && setLayout("tt-col-two")) ||
          (windowSize > 800 &&
            windowSize <= 1024 &&
            setLayout("tt-col-three")) ||
          (windowSize >= 1025 && setLayout("tt-col-six"));
      }
    } else {
      (windowSize <= 499 && setLayout("tt-col-one")) ||
        (windowSize > 499 && windowSize <= 799 && setLayout("tt-col-two")) ||
        (windowSize > 800 && setLayout("tt-col-three"));
    }
  }, [windowSize]);

  return (
    <div className="content-indent shop-no-sidebar">
      <Container
        fluid={containerFluid}
        className="container-fluid-custom-mobile-padding"
      >
        <Row
          className={
            sidebar && sidebarPosition === "right" ? "flex-sm-row-reverse" : ""
          }
        >
          <Col
            md={4}
            lg={3}
            // className={`leftColumn ${
            //   sidebar && sidebarPosition === "right" ? "rightColumn" : ""

            // } aside ${!sidebar ? "desktop-no-sidebar" : ""} ${
            //   filterPanelShow ? "column-open" : "column-close"
            // }`}
          >
            <ShopFilters
              sidebar={sidebar}
              //   onSortHandler={onSortHandler}
              //   getFilterParam={getFilterParam} //print krky hardcode pass krna  usefilter mn se aega
              productPerPage={productPerPage} //print krky hardcode pass krna 8 item size aaega
              //   filterPanelHandler={filterPanelHandler}
              onProductPerPageHandler={onProductPerPageHandler}
            />
          </Col>

          <Col xs={12} lg={sidebar ? 9 : 12}>
            <div className="content-indent container-fluid-custom-mobile-padding-02">
              <ShopOptions
                layout={layout}
                sidebar={sidebar}
                pageTitle={pageTitle}
                getLayout={getLayout}
                // onSortHandler={onSortHandler}
                productPerPage={productPerPage} // aik page ky item
                productLength={10} // total lenth products ki aaray ki
                // filterPanelHandler={filterPanelHandler}
                onProductPerPageHandler={onProductPerPageHandler}
              />
              <ShopProducts
                layout={layout}
                products={arr}
                productPerPage={productPerPage}
              />

              {/* <LoadMore
                                className="mt-5"
                                productPerPage={productPerPage} //  //8
                                productLength={allProducts.length} // 323 all array
                                onLoadMorHandler={onLoadMorHandler}
                            /> */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// ShopGrid.propTypes = {
//   products: PropTypes.array.isRequired,
// };

export default ShopGrid;
