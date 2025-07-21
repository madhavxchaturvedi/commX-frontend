import { useState } from "react";
import { Toaster } from "react-hot-toast";
import SignUpPage from "./pages/SignUpPage";
import { Provider } from "react-redux";
import { createBrowserRouter, Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    // <Provider store={store}>
    <>
      <Toaster />
      <Outlet />
    </>

    // </Provider>
  );
};

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },
]);

export default AppRouter;
