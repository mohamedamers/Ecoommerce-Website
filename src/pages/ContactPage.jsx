import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t, i18n } = useTranslation();

  const [msgData, setMsgData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setMsgData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!msgData.name || !msgData.email || !msgData.message) {
      toast.error(t("fill_fields_error"));
      return;
    }
    toast.success(t("msg_success"));
    setMsgData({ name: "", email: "", message: "" });
  };

  // ديناميك كلاس عشان نضمن المحاذاة حسب اللغة
  const alignmentClass = i18n.language === "ar" ? "text-end" : "text-start";

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">{t("contact_title")}</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-6 col-lg-5 col-sm-10 mx-auto">
            <form onSubmit={handleSubmit} className={alignmentClass}>
              {/* خانة الاسم */}
              <div className="form my-3">
                <label htmlFor="name" className="form-label w-100">
                  {t("name_label")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder={t("name_placeholder")}
                  value={msgData.name}
                  onChange={handleChange}
                  required
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
                  placeholder={t("email_placeholder")}
                  value={msgData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* خانة الرسالة */}
              <div className="form my-3">
                <label htmlFor="message" className="form-label w-100">
                  {t("msg_label")}
                </label>
                <textarea
                  rows={5}
                  className="form-control"
                  id="message"
                  placeholder={t("msg_placeholder")}
                  value={msgData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="text-center">
                <button
                  className="my-2 px-4 mx-auto btn btn-dark"
                  type="submit"
                >
                  {t("send_btn")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
      <Footer />
    </>
  );
};

export default ContactPage;
