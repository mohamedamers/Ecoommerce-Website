import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addCart } from "../redux/action";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false); // إضافة حالة تحميل اختيارية

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addProduct = (product) => {
    const isLogged = localStorage.getItem("userEmail");

    if (isLogged) {
      dispatch(addCart(product));
      toast.success(t("added_success"));
    } else {
      toast.error(t("login_error"));
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  useEffect(() => {
    // التصحيح: تعريف المتغير داخل useEffect
    let componentMounted = true;

    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      const jsonData = await response.json();

      if (componentMounted) {
        setData(jsonData);
        setFilter(jsonData);
        setLoading(false);
      }
    };

    getProducts();

    // دالة التنظيف لمنع الأخطاء عند إغلاق الصفحة قبل اكتمال التحميل
    return () => {
      componentMounted = false;
    };
  }, []);

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            {t("all")}
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            {t("men_clothing")}
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            {t("women_clothing")}
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            {t("jewelery")}
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            {t("electronics")}
          </button>
        </div>

        {filter.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-12 mb-4"
            >
              <div className="card text-center h-100 p-2">
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt={product.title}
                  height={300}
                  style={{ objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-3">
                    {product.title.length > 15
                      ? product.title.substring(0, 15) + "..."
                      : product.title}
                  </h5>
                  <p className="card-text text-muted mb-auto">
                    {product.description.substring(0, 60)}...
                  </p>
                  <div className="mt-3">
                    <p className="lead fw-bold">${product.price}</p>
                    <Link
                      to={"/product/" + product.id}
                      className="btn btn-dark m-1"
                    >
                      {t("buy_now")}
                    </Link>
                    <button
                      className="btn btn-outline-dark m-1"
                      onClick={() => addProduct(product)}
                    >
                      {t("add_to_cart")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center fw-bold">
            {t("latest_products")}
          </h2>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? (
          <div className="text-center py-5">Loading...</div>
        ) : (
          <ShowProducts />
        )}
      </div>
    </div>
  );
};

export default Products;
