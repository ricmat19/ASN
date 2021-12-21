import React, { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsR from "./routes/store/products";
import ProductR from "./routes/store/product";
import CoursesR from "./routes/courses/courses";
import CourseR from "./routes/courses/course";
import MediasR from "./routes/media/medias";
import MediaR from "./routes/media/media";
import ProjectsR from "./routes/projects/projects";
import ProjectR from "./routes/projects/project";
import EventsR from "./routes/events/events";
import EventR from "./routes/events/event";
import ThreadsR from "./routes/community/threads";
import ThreadR from "./routes/community/thread";
import CartR from "./routes/cart/cart";
import CheckoutR from "./routes/cart/checkout";
import ShippingR from "./routes/cart/shipping";
import PaymentR from "./routes/cart/stripe";
import InboxR from "./routes/account/inbox";
import CollectionR from "./routes/account/collection";
import PortfolioR from "./routes/account/portfolio";
import AboutR from "./routes/info/about";
import HelpR from "./routes/info/help";
import PrivacyPolicyR from "./routes/info/privacyPolicy";
import SubscribeR from "./routes/info/subscribe";
import TermsOfServiceR from "./routes/info/termsOfService";

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
          <Route path="/projects" element={<ProjectsR />} />
          <Route path="/projects/:project" element={<ProjectR />} />
          <Route path="/events" element={<EventsR />} />
          <Route path="/events/:event" element={<EventR />} />
          <Route path="/threads" element={<ThreadsR />} />
          <Route path="/threads/:thread" element={<ThreadR />} />
          <Route path="/cart" element={<CartR />} />
          <Route path="/checkout" element={<CheckoutR />} />
          <Route path="/payment" element={<PaymentR />} />
          <Route path="/shipping" element={<ShippingR />} />
          <Route path="/inbox" element={<InboxR />} />
          <Route path="/collection" element={<CollectionR />} />
          <Route path="/portfolio" element={<PortfolioR />} />
          <Route path="/about" element={<AboutR />} />
          <Route path="/help" element={<HelpR />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicyR />} />
          <Route path="/subscribe" element={<SubscribeR />} />
          <Route path="/termsOfService" element={<TermsOfServiceR />} />




          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route
            path="/admin/collection/:product"
            element={<AdminCollection />}
          />
          <Route path="/admin/create" element={<AdminCreate />} />
          <Route path="/admin/update/:id" element={<AdminUpdate />} />


        </Routes>
      </Router>
    </div>
  );
};

export default App;
