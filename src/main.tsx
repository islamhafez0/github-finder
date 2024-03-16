import ReactDOM from "react-dom/client";
import { ContextProvider } from "./context/ContextProvider.tsx";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>
);
