import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 

import App from "./App";
import "./index.css";
import Error from "./components/pages/Error";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/SendEmail";
import Services from "./components/pages/Services";
import BookNow from "./components/pages/BookNow";
import Admin from "./components/pages/Admin";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";


// Define the accessible routes, and which components respond to which URL
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/Services",
        element: <Services />,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        path: "/BookNow",
        element: <BookNow />,
      },
      {
        path: "/Admin",
        element: <Admin />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Signup",
        element: <Signup />,
      },
    ]


  }
])

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);