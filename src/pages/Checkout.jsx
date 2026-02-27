import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // فانكشن لما يدوس Checkout
  const handleCheckout = (e) => {
    e.preventDefault();
    
    // إظهار رسالة نجاح شيك
    toast.success("Order Placed Successfully! Thank you for shopping. 🛍️", {
      position: "top-center",
      autoClose: 3000,
    });

    // ممكن هنا تعمل Dispatch لـ Action يمسح الكارت (لو عندك Action للاسم ده)
    // dispatch({type: "EMPTY_CART"}); 

    setTimeout(() => {
      navigate("/");
    }, 3500);
  };

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your cart is empty</h4>
            <Link to="/" className="btn btn-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <>
        <div className="container py-5">
          <div className="row my-4">
            {/* Order Summary */}
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})<span>${Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>${shipping}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>${Math.round(subtotal + shipping)}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Billing Form */}
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleCheckout}>
                    <div className="row g-3">
                      <div className="col-sm-6 my-1">
                        <label className="form-label">First name</label>
                        <input type="text" className="form-control" placeholder="John" required />
                      </div>

                      <div className="col-sm-6 my-1">
                        <label className="form-label">Last name</label>
                        <input type="text" className="form-control" placeholder="Doe" required />
                      </div>

                      <div className="col-12 my-1">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="you@example.com" required />
                      </div>

                      <div className="col-12 my-1">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" placeholder="1234 Main St" required />
                      </div>

                      <div className="col-md-5 my-1">
                        <label className="form-label">Country</label>
                        <select className="form-select" required>
                          <option value="">Choose...</option>
                          <option>Egypt</option>
                          <option>USA</option>
                        </select>
                      </div>

                      <div className="col-md-4 my-1">
                        <label className="form-label">State</label>
                        <select className="form-select" required>
                          <option value="">Choose...</option>
                          <option>Cairo</option>
                          <option>Alexandria</option>
                        </select>
                      </div>

                      <div className="col-md-3 my-1">
                        <label className="form-label">Zip</label>
                        <input type="text" className="form-control" required />
                      </div>
                    </div>

                    <hr className="my-4" />
                    <h4 className="mb-3">Payment</h4>

                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label className="form-label">Name on card</label>
                        <input type="text" className="form-control" required />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Credit card number</label>
                        <input type="text" className="form-control" required />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">Expiration</label>
                        <input type="text" className="form-control" placeholder="MM/YY" required />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">CVV</label>
                        <input type="text" className="form-control" required />
                      </div>
                    </div>

                    <hr className="my-4" />
                    <button className="w-100 btn btn-dark btn-lg" type="submit">
                      Complete Purchase
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length > 0 ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <ToastContainer theme="colored" />
      <Footer />
    </>
  );
};

export default Checkout;