import React from "react";
import { io } from "socket.io-client";
import { Search } from "../Search/Search";
import "./index.css";
import DateTimeBlock from "./components/DateTimeBlock/DateTimeBlock";
import { Col, Container, Row } from "react-bootstrap";
import { LightningChargeFill, BoxArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { PagesEnum } from "../../routes";
import { ActiveUsers } from "./components/DateTimeBlock/ActiveUsers/ActiveUsers";

export const socket = io("http://localhost:3001", {
  autoConnect: false,
});

const Logout = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    socket.disconnect();
    navigate(PagesEnum.SignIn);
  };

  return (
    <Container className="logout-container">
      <BoxArrowRight onClick={onLogout} size={25} />
    </Container>
  );
};

const Logo: React.FC = () => {
  return (
    <Container className="logo-container">
      <LightningChargeFill size={22} />
      Harry Potter
    </Container>
  );
};

const Header = () => {
  return (
    <header className="header">
      <Row className="d-flex w-50 justify-content-between align-items-center">
        <Col xs="12" sm="12" md="5">
          <Logo />
        </Col>
        <Col xs="12" sm="8" md="7">
          <Search />
        </Col>
      </Row>
      <Row className="d-flex align-items-center w-50">
        <Col lang="4" md="3" xs={0}></Col>
        <Col xs="4">
          <ActiveUsers />
        </Col>
        <Col xs="5" className="d-flex justify-content-end">
          <DateTimeBlock />
        </Col>
      </Row>
      <Logout />
    </header>
  );
};

export default Header;
