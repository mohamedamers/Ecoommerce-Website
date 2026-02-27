import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Footer, Navbar } from "../components";
import toast from "react-hot-toast";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // تشيك هل المستخدم مسجل دخول أم لا
  const isLogged = localStorage.getItem("userEmail");

  // 1. فانكشن الإضافة للكارت المحمية
  const addProduct = (product) => {
    if (isLogged) {
      dispatch(addCart(product));
      toast.success("Added to cart! 🛒");
    } else {
      toast.error("Please login first to shop! 🔐");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);

      const response2 = await fetch(
        `https://fakestoreapi.com/products/category/${data.category}`,
      );
      const data2 = await response2.json();
      setSimilarProducts(data2);
      setLoading(false);
    };
    getProduct();
  }, [id]);

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={product.image}
                alt={product.title}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 py-5">
              <h4 className="text-uppercase text-muted">{product.category}</h4>
              <h1 className="display-5">{product.title}</h1>
              <p className="lead">
                {product.rating && product.rating.rate}{" "}
                <i className="fa fa-star text-warning"></i>
              </p>
              <h3 className="display-6 my-4">${product.price}</h3>
              <p className="lead">{product.description}</p>

              {/* زرار الإضافة */}
              <button
                className="btn btn-outline-dark"
                onClick={() => addProduct(product)}
              >
                Add to Cart
              </button>

              {/* 2. زرار Go to Cart: يظهر فقط للمسجلين */}
              {isLogged && (
                <Link to="/cart" className="btn btn-dark mx-3">
                  Go to Cart
                </Link>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarProducts.map((item) => {
              return (
                <div
                  key={item.id}
                  className="card mx-4 text-center"
                  style={{ width: "18rem" }}
                >
                  <img
                    className="card-img-top p-3"
                    src={item.image}
                    alt="Card"
                    height={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.title.substring(0, 15)}...
                    </h5>
                  </div>
                  <div className="card-body">
                    <Link
                      to={"/product/" + item.id}
                      className="btn btn-dark m-1"
                    >
                      Details
                    </Link>
                    <button
                      className="btn btn-dark m-1"
                      onClick={() => addProduct(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {loading ? (
            <div className="text-center py-5">Loading...</div>
          ) : (
            <ShowProduct />
          )}
        </div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="mb-4">You may also Like</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              <ShowSimilarProduct />
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
