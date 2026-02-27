import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next"; // استيراد الترجمة

const Register = () => {
  const { t } = useTranslation(); // تفعيل الترجمة
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
      toast.error(t("validation_error")); // ترجمة التنبيه
      return;
    }

    if (password.length < 6) {
      toast.info(t("pass_short")); // ترجمة التنبيه
      return;
    }

    const userData = { name, email, password, userImage };
    localStorage.setItem("registeredUser", JSON.stringify(userData));

    toast.success(t("reg_success")); // ترجمة النجاح

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">{t("register_title")}</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
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
                <small className="text-muted">
                  {t("upload_img")}
                </small>
              </div>
              <div className="form my-3">
                <label htmlFor="name">{t("full_name")}</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder={t("placeholder_name")}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form my-3">
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
              <div className="form my-3">
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
              <div className="my-3 text-center">
                <button className="btn btn-dark w-100" type="submit">
                  {t("register")}
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
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <Footer />
    </>
  );
};

export default Register;