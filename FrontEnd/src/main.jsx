import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import PatientContext from "./Context/PatientContext";
import DoctorContext from "./Context/DoctorContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouteTracker from "./Components/RouteTracker";

createRoot(document.getElementById("root")).render(
  <DoctorContext>
    <PatientContext>
      <BrowserRouter>
      <RouteTracker />
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </PatientContext>
  </DoctorContext>
);
