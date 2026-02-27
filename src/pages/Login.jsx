import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
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

    // 1. Validation
    if (!email || !password) {
      toast.error(t("validation_error"));
      return;
    }

    // 2. التحقق من البيانات المخزنة من الريجيستر
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (
      savedUser &&
      email === savedUser.email &&
      password === savedUser.password
    ) {
      // --- هنا فقط بنفعل حالة الدخول اللي النافبار بيشوفها ---
      localStorage.setItem("userEmail", savedUser.email);
      localStorage.setItem("userName", savedUser.name);
      localStorage.setItem("userImage", savedUser.userImage);

      toast.success(`${t("welcome_back")}, ${savedUser.name}! 🎉`, {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/");
        window.location.reload(); // عشان النافبار يقرأ البيانات الجديدة فوراً
      }, 2000);
    } else {
      toast.error(t("auth_error"));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">{t("login_title")}</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="email">{t("email_label")}</label>
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
                <label htmlFor="password">{t("password")}</label>
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
                  {t("login")}
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