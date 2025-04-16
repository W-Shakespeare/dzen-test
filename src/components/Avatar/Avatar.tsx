import Image from "react-bootstrap/Image";
import { Gear } from "react-bootstrap-icons";
import "./Avatar.css";
import { Container } from "react-bootstrap";

const Avatar = () => {
  return (
    <Container className="avatar-container">
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK2BRVTOSPX6Kh_LLMNt0Fwa-V0NUI9XIVnw&s"
        alt="аватар"
        className="avatar"
      />
      <Container className="avatar-settings-container">
        <Gear className="avatar-settings-icon" />
      </Container>
    </Container>
  );
};

export default Avatar;
