import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error(t("validation_error"));
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (
      savedUser &&
      email === savedUser.email &&
      password === savedUser.password
    ) {
      localStorage.setItem("userEmail", savedUser.email);
      localStorage.setItem("userName", savedUser.name);
      localStorage.setItem("userImage", savedUser.userImage);

      // رسالة ترحيب مترجمة
      toast.success(`${t("welcome_back")}, ${savedUser.name}! 🎉`, {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    } else {
      toast.error(t("auth_error"));
    }
  };

  // تحديد اتجاه النصوص بناءً على اللغة
  const alignmentClass = i18n.language === "ar" ? "text-end" : "text-start";

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">{t("login_title")}</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit} className={alignmentClass}>
              <div className="my-3">
                <label htmlFor="email" className="form-label w-100">
                  {t("email_label")}
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder={t("placeholder_email")}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="my-3">
                <label htmlFor="password" className="form-label w-100">
                  {t("password_label")}
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder={t("placeholder_password")}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="my-3">
                <p>
                  {t("new_here")}{" "}
                  <Link
                    to="/register"
                    className="text-decoration-underline text-info"
                  >
                    {t("register")}
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button
                  className="my-2 mx-auto btn btn-dark w-100"
                  type="submit"
                >
                  {t("login_btn")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Footer />
    </>
  );
};

export default Login;
