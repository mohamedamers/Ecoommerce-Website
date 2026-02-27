import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t } = useTranslation();

  // 1. حالة تخزين بيانات الرسالة
  const [msgData, setMsgData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setMsgData((prev) => ({ ...prev, [id]: value }));
  };

  // 2. فانكشن الإرسال
  const handleSubmit = (e) => {
    e.preventDefault();

    // تشيك سريع
    if (!msgData.name || !msgData.email || !msgData.message) {
      toast.error(t("contact_validation"));
      return;
    }

    // محاكاة إرسال الرسالة
    toast.success(t("msg_success"));

    // تصفير الفورم بعد الإرسال
    setMsgData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">{t("contact_title")}</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-6 col-lg-5 col-sm-10 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form my-3">
                <label htmlFor="name">{t("name")}</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder={t("Your_name")}
                  value={msgData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="email">{t("email_label")}</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder={t("Your_email")}
                  value={msgData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="message">{t("message")}</label>
                <textarea
                  rows={5}
                  className="form-control"
                  id="message"
                  placeholder={t("Your_message")}
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
                  {t("Send Message")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" theme="colored" autoClose={3000} />
      <Footer />
    </>
  );
};

export default ContactPage;
