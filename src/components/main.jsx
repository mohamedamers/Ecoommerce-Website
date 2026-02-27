import React from "react";
import { useTranslation } from "react-i18next"; // استيراد الترجمة

const Home = () => {
  const { t } = useTranslation(); // تفعيل الترجمة

  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/main.png.jpg"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">
                {t("hero_title")}
              </h5>
              <p className="card-text fs-5 d-none d-sm-block ">
                {t("hero_description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;