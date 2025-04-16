import { Container, Spinner } from "react-bootstrap";
import "./Loading.css";

const Loading = () => {
  return (
    <Container className="loading-container">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
};

export default Loading;
