import React, { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./routes/about";
import ProductsR from "./routes/products";
import ProductR from "./routes/product";
import CoursesR from "./routes/courses";
import CourseR from "./routes/course";
import MediasR from "./routes/medias";
import MediaR from "./routes/media";
import Cart from "./routes/cart";
import Checkout from "./routes/checkout";
import Shipping from "./routes/shipping";
import Payment from "./routes/stripe";
import Contact from "./routes/contact";
import AdminHome from "./routes/admin/home";
import AdminCollection from "./routes/admin/collection";
import AdminCreate from "./routes/admin/create";
import AdminUpdate from "./routes/admin/update";

const App: FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/products/:product" element={<ProductsR />} />
          <Route path="/products/:product/:id" element={<ProductR />} />
          <Route path="/courses/:subject" element={<CoursesR />} />
          <Route path="/courses/:subject/:id" element={<CourseR />} />
          <Route path="/medias/:media" element={<MediasR />} />
          <Route path="/medias/:media/:post" element={<MediaR />} />





          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route
            path="/admin/collection/:product"
            element={<AdminCollection />}
          />
          <Route path="/admin/create" element={<AdminCreate />} />
          <Route path="/admin/update/:id" element={<AdminUpdate />} />

          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
