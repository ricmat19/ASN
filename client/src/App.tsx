import React, { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//User Routes
import ProductsR from "./routes/user/products/products";
import ProductR from "./routes/user/products/product";
import CoursesR from "./routes/user/courses/courses";
import CourseR from "./routes/user/courses/course";
import MediasR from "./routes/user/media/medias";
import MediaR from "./routes/user/media/media";
import ProjectsR from "./routes/user/projects/projects";
import ProjectR from "./routes/user/projects/project";
import EventsR from "./routes/user/events/events";
import EventR from "./routes/user/events/event";
import ThreadsR from "./routes/user/community/threads";
import ThreadR from "./routes/user/community/thread";
import CartR from "./routes/user/cart/cart";
import CheckoutR from "./routes/user/cart/checkout";
import ShippingR from "./routes/user/cart/shipping";
import PaymentR from "./routes/user/cart/stripe";
import InboxR from "./routes/user/account/inbox";
import CollectionR from "./routes/user/account/collection";
import PortfolioR from "./routes/user/account/portfolio";
import AboutR from "./routes/user/info/about";
import HelpR from "./routes/user/info/help";
import PrivacyPolicyR from "./routes/user/info/privacyPolicy";
import SubscribeR from "./routes/user/info/subscribe";
import TermsOfServiceR from "./routes/user/info/termsOfService";

//Admin Routes
import AdminProductsR from "./routes/admin/products/products";
import AdminProductR from "./routes/admin/products/product";
import AdminCoursesR from "./routes/admin/courses/courses";
import AdminCourseR from "./routes/admin/courses/course";
import AdminMediasR from "./routes/admin/media/medias";
import AdminMediaR from "./routes/admin/media/media";
import AdminProjectsR from "./routes/admin/projects/projects";
import AdminProjectR from "./routes/admin/projects/project";
import AdminEventsR from "./routes/admin/events/events";
import AdminEventR from "./routes/admin/events/event";
import AdminThreadsR from "./routes/admin/community/threads";
import AdminThreadR from "./routes/admin/community/thread";
import AdminAboutR from "./routes/admin/info/about";
import AdminHelpR from "./routes/admin/info/help";
import AdminPrivacyPolicyR from "./routes/admin/info/privacyPolicy";
import AdminTermsOfServiceR from "./routes/admin/info/termsOfService";

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
          {/* Users */}
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

          {/* Admin */}
          <Route path="/admin/products/:product" element={<AdminProductsR />} />
          <Route path="/admin/products/:product/:id" element={<AdminProductR />} />
          <Route path="/admin/courses/:subject" element={<AdminCoursesR />} />
          <Route path="/admin/courses/:subject/:id" element={<AdminCourseR />} />
          <Route path="/admin/medias/:media" element={<AdminMediasR />} />
          <Route path="/admin/medias/:media/:post" element={<AdminMediaR />} />
          <Route path="/admin/projects" element={<AdminProjectsR />} />
          <Route path="/admin/projects/:project" element={<AdminProjectR />} />
          <Route path="/admin/events" element={<AdminEventsR />} />
          <Route path="/admin/events/:event" element={<AdminEventR />} />
          <Route path="/admin/threads" element={<AdminThreadsR />} />
          <Route path="/admin/threads/:thread" element={<AdminThreadR />} />
          <Route path="/admin/about" element={<AdminAboutR />} />
          <Route path="/admin/help" element={<AdminHelpR />} />
          <Route path="/admin/privacyPolicy" element={<AdminPrivacyPolicyR />} />
          <Route path="/admin/termsOfService" element={<AdminTermsOfServiceR />} />

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
