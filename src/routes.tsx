import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import PageLayout from "./layout/PageLayout/PageLayout";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { selectIsAuth } from "./redux/Auth";

const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const Orders = lazy(() => import("./pages/Orders"));
const Products = lazy(() => import("./pages/Products/Products"));

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
    <Suspense fallback={<div>Загрузка...</div>}>
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
    </Suspense>
  );
}

export default AppRoutes;
