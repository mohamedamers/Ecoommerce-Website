import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // جلب البيانات من الـ LocalStorage
  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName");
  const userImage = localStorage.getItem("userImage");

  // فانكشن تبديل اللغة
  const changeLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    // اتجاه الصفحة بيتغير تلقائي بناءً على إعدادات i18n.js اللي عملناها
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          React Ecommerce
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                {t("home")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                {t("products")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                {t("about")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                {t("contact")}
              </NavLink>
            </li>
          </ul>

          <div className="buttons d-flex align-items-center justify-content-center">
            {/* زرار تبديل اللغة - ضفناه هنا عشان يظهر دايماً */}
            <button
              className="btn btn-outline-dark m-2"
              onClick={changeLanguage}
              style={{ minWidth: "100px" }}
            >
              <i className="fa fa-globe me-2"></i>
              {i18n.language === "en" ? "العربية" : "English"}
            </button>

            {!userEmail ? (
              <>
                <NavLink to="/login" className="btn btn-outline-dark m-2">
                  <i className="fa fa-sign-in-alt me-1"></i> {t("login")}
                </NavLink>
                <NavLink to="/register" className="btn btn-outline-dark m-2">
                  <i className="fa fa-user-plus me-1"></i> {t("register")}
                </NavLink>
              </>
            ) : (
              <>
                <div className="d-flex align-items-center mx-2">
                  {userImage ? (
                    <img
                      src={userImage}
                      alt="profile"
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "1px solid #333",
                      }}
                    />
                  ) : (
                    <i className="fa fa-user-circle fs-4"></i>
                  )}
                  <span className="fw-bold text-secondary ms-2 text-capitalize d-none d-md-inline">
                    {i18n.language === "ar" ? "أهلاً، " : "Hi, "}
                    {userName?.split(" ")[0]}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger btn-sm ms-3"
                    title={t("logout")}
                  >
                    <i className="fa fa-sign-out-alt"></i>
                  </button>
                </div>

                <NavLink to="/cart" className="btn btn-outline-dark m-2">
                  <i className="fa fa-cart-shopping me-1"></i> {t("cart")} (
                  {state.length})
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
