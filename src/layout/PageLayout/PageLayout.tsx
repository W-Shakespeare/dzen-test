import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import "./PageLayout.css";

const PageLayout = () => {
  return (
    <>
      <Header />
      <div className="d-flex w-100 h-100">
        <Nav />
        <main className="main p-md-4 p-lg-5 ">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default PageLayout;
