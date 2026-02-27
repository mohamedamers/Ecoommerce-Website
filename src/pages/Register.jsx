import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [userImage, setUserImage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.error(t("validation_error"));
      return;
    }

    if (password.length < 6) {
      toast.info(t("pass_short"));
      return;
    }

    const userData = { name, email, password, userImage };
    localStorage.setItem("registeredUser", JSON.stringify(userData));

    toast.success(t("reg_success"));

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  // كلاس المحاذاة بناءً على اللغة
  const alignmentClass = i18n.language === "ar" ? "text-end" : "text-start";

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">{t("register_title")}</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit} className={alignmentClass}>
              {/* رفع الصورة */}
              <div className="form my-3 text-center">
                {userImage && (
                  <img
                    src={userImage}
                    alt="preview"
                    className="mb-2"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #333",
                    }}
                  />
                )}
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <small className="text-muted">{t("upload_img")}</small>
              </div>

              {/* خانة الاسم */}
              <div className="form my-3">
                <label htmlFor="name" className="form-label w-100">
                  {t("full_name")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder={t("placeholder_name")}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* خانة الإيميل */}
              <div className="form my-3">
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

              {/* خانة الباسورد */}
              <div className="form my-3">
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

              <div className="my-3 text-center">
                <button className="btn btn-dark w-100" type="submit">
                  {t("reg_btn")}
                </button>
                <p className="mt-3">
                  {t("already_account")}{" "}
                  <Link
                    to="/login"
                    className="text-decoration-underline text-info"
                  >
                    {t("login")}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
      <Footer />
    </>
  );
};

export default Register;
