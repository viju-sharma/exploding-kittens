import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// redux store
import { Provider } from "react-redux";
import { store } from "./features";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
      <ToastContainer
        hideProgressBar={true}
        position="bottom-right"
        autoClose={1000}
      />
    </BrowserRouter>
  </React.StrictMode>
);
