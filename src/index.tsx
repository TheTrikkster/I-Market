import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Article from "./pages/article/Article";
import AddArticle from "./pages/add-article/AddArticle";
import Update from "./pages/update/Update";
import Authentication from "./pages/authentication/Authentication";
import Cart from "./pages/cart/Cart";
import UseContext from "./components/cartprovider/CartProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UseContext>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/article/:id" element={<Article />}></Route>
          <Route path="/add-article" element={<AddArticle />}></Route>
          <Route path="/update/:id" element={<Update />}></Route>
          <Route path="/authentication" element={<Authentication />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </UseContext>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
