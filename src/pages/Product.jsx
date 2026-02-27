import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { addCart } from "../redux/action";

// قاموس ترجمة بيانات الـ API (أشهر المنتجات)
const apiDataTranslation = {
  1: {
    title: "حقيبة ظهر fjr",
    description:
      "حقيبة مثالية للاستخدام اليومي وحمل الكمبيوتر المحمول، متينة ومقاومة للماء.",
  },
  2: {
    title: "تيشيرت قطني رجالي",
    description: "تيشيرت مريح وعالي الجودة بتصميم عصري يناسب جميع الأوقات.",
  },
  3: {
    title: "سترة قطنية رجالية",
    description:
      "سترة خفيفة ومثالية للأجواء المعتدلة، مصنوعة من أفضل خامات القطن.",
  },
  4: {
    title: "تيشيرت كاجوال رجالي",
    description:
      "تيشيرت أنيق وبسيط، مناسب للخروجات اليومية ومريح جداً في اللبس.",
  },
  // يمكنك إضافة باقي المنتجات (5-20) هنا بنفس النمط
};

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const isLogged = localStorage.getItem("userEmail");
  const currentLang = i18n.language; // تحديد اللغة الحالية

  const addProduct = (product) => {
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
    // التحقق هل توجد ترجمة لهذا المنتج حالياً؟
    const hasTranslation =
      currentLang === "ar" && apiDataTranslation[product.id];

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
              <h4 className="text-uppercase text-muted">
                {t(product.category)}
              </h4>
              <h1 className="display-5">
                {hasTranslation
                  ? apiDataTranslation[product.id].title
                  : product.title}
              </h1>
              <p className="lead">
                {product.rating && product.rating.rate}{" "}
                <i className="fa fa-star text-warning"></i>
              </p>
              <h3 className="display-6 my-4">${product.price}</h3>
              <p className="lead">
                {hasTranslation
                  ? apiDataTranslation[product.id].description
                  : product.description}
              </p>

              <button
                className="btn btn-outline-dark"
                onClick={() => addProduct(product)}
              >
                {t("add_to_cart")}
              </button>

              {isLogged && (
                <Link to="/cart" className="btn btn-dark mx-3">
                  {t("go_to_cart")}
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
      <div className="py-4 my-4">
        <div className="d-flex">
          {similarProducts.map((item) => (
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
                  {currentLang === "ar" && apiDataTranslation[item.id]
                    ? apiDataTranslation[item.id].title.substring(0, 15)
                    : item.title.substring(0, 15)}
                  ...
                </h5>
              </div>
              <div className="card-body">
                <Link to={"/product/" + item.id} className="btn btn-dark m-1">
                  {t("details")}
                </Link>
                <button
                  className="btn btn-dark m-1"
                  onClick={() => addProduct(item)}
                >
                  {t("add_to_cart")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {loading ? (
            <div className="text-center py-5">{t("loading_msg")}</div>
          ) : (
            <ShowProduct />
          )}
        </div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="mb-4">{t("similar_products")}</h2>
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
