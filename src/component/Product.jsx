import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

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
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6">
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    const [loading, setLoading] = useState(false);
    const [defaultImage, setDefaultImage] = useState("");

    useEffect(() => {
      const fetchDefaultImage = async () => {
        try {
          const response = await fetch(`https://fakestoreapi.com/products`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const defaultImageData = await response.json();
          setDefaultImage(defaultImageData[0].image);
        } catch (error) {
          console.error("Error fetching default image:", error);
          setDefaultImage("/assets/abia.jpg"); // Đặt hình ảnh mặc định trong trường hợp lỗi
        } finally {
          setLoading(false);
        }
      };

      fetchDefaultImage();
    }, []);

    return (
      <>
        <div className="col-md-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <img
              className="card-img"
              src={product && product.image ? product.image : defaultImage}
              alt={product && product.title ? product.title : "Default Image"}
              height="400px"
              width="200px"
            />
          )}
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5"> {product.title}</h1>
          <p className="lead">
            <h1> Fjallraven </h1>
            <p>Giá: $109 </p>
          </p>
          <p className="lead">{product.description}</p>
          <button
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => addProduct(product)}
          >
            Add To Cart
          </button>
          <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
            {" "}
            Go to cart
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row py-3">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

export default Product;
