import { Routes, Route, useNavigate } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Orders from "./pages/Orders";
import Products from "./pages/Products/Products";
import PageLayout from "./layout/PageLayout/PageLayout";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useEffect } from "react";
import { selectIsAuth } from "./redux/Auth";

export enum PagesEnum {
  SignIn = "/signin",
  SignUp = "/signup",
  Orders = "/orders",
  Products = "/products",
}

function AppRoutes() {
  const navigate = useNavigate();

  const IsAuth = useTypedSelector(selectIsAuth);

  useEffect(() => {
    if (!IsAuth) navigate(PagesEnum.SignIn);
  }, [IsAuth]);

  return (
    <>
      <Routes>
        {IsAuth && (
          <Route path="/" element={<PageLayout />}>
            <Route path={PagesEnum.Orders} element={<Orders />} />
            <Route path={PagesEnum.Products} element={<Products />} />
          </Route>
        )}
        <Route path={PagesEnum.SignIn} element={<SignIn />} />
        <Route path={PagesEnum.SignUp} element={<SignUp />} />
        <Route path="*" element={<main>Page not found</main>} />
      </Routes>
    </>
  );
}

export default AppRoutes;
