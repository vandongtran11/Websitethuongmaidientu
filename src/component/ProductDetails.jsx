import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetail = ({ product }) => {
  return (
    <>
      <div className="col-md-6">
        <img
          src={product.image}
          alt={product.title}
          height="400px"
          width="400px"
        />
      </div>
      <div className="col-md-6">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Category: {product.category}</p>
        <p>Price: ${product.price}</p>
        <p>
          Rating: {product.rating.rate} / 5 ({product.rating.count} reviews)
        </p>
        {/* Add more details as needed */}
        <Link to="/">Back to Products</Link>
      </div>
    </>
  );
};

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const productData = await response.json();
        setProduct(productData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const Loading = () => {
    return <>Loading.....</>;
  };

  const ShowProduct = () => {
    return <ProductDetail product={product} />;
  };

  return (
    <div>
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
      </div>
    </div>
  );
};

export default Product;
