import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { IProduct } from "../../../../models/IProduct";
import TextOverflowTooltip from "../../../../components/TextOverflowTooltip/TextOverflowTooltip";
import dayjs from "dayjs";
import { Trash3 } from "react-bootstrap-icons";

interface IProductProps extends IProduct {
  onDelete: (id: string) => void;
}

export const Product: React.FC<IProductProps> = ({
  photo,
  serialNumber,
  title,
  isNew,
  price,
  guarantee,
  _id,
  onDelete,
}) => {
  const priceUsd = price.find((p) => p.symbol === "USD");
  const priceUah = price.find((p) => p.symbol === "UAH");

  return (
    <Card className="p-md-2 mb-3">
      <Row className="align-items-center justify-content-between">
        <Col
          md="1"
          xs="12"
          sm="12"
          className="ms-1 d-flex justify-content-center mt-1"
        >
          <div
            style={{ background: isNew ? "#198754" : "gray" }}
            className="product-circle  m-2"
          ></div>
        </Col>
        <Col
          xs="12"
          md="2"
          sm="12"
          className="d-flex justify-content-center m-1"
        >
          <Image src={photo} width={70} height={70} fluid />
        </Col>
        <Col xs="12" md="3" className="d-flex justify-content-center m-1">
          <Container>
            <Row>
              <Col
                xs="12"
                sm="12"
                className="d-flex justify-content-center m-1"
              >
                <TextOverflowTooltip text={title} />
              </Col>
              <Col xs="12" className="d-flex justify-content-center m-1">
                <span>{serialNumber}</span>
              </Col>
            </Row>
          </Container>
        </Col>

        <Col
          xs="12"
          md="2"
          sm="12"
          className="d-flex justify-content-center m-1"
        >
          <Row>
            <Col xs="12" className="d-flex justify-content-center m-1">
              <span>c {dayjs(guarantee.start).format("DD/MM/YYYY")}</span>
            </Col>
            <Col xs="12" className="d-flex justify-content-center m-1">
              <span>по {dayjs(guarantee.end).format("DD/MM/YYYY")}</span>
            </Col>
          </Row>
        </Col>

        <Col
          md="1"
          xs="12"
          sm="12"
          className="d-flex justify-content-center m-1"
        >
          <span>{isNew ? "Новый" : "Бу"}</span>
        </Col>

        <Col
          md="2"
          xs="12"
          sm="12"
          className="d-flex justify-content-center m-1"
        >
          <Container>
            <Row>
              <Col xs="12" className="d-flex justify-content-center m-1">
                <TextOverflowTooltip text={`${priceUsd?.value} USD`} />
              </Col>
              <Col xs="12" className="d-flex justify-content-center m-1">
                <TextOverflowTooltip text={`${priceUah?.value} UAH`} />
              </Col>
            </Row>
          </Container>
        </Col>

        <Col
          xs="12"
          md="1"
          sm="12"
          className="d-flex justify-content-center mt-4 mb-4 trash-container"
        >
          <Trash3 className="product-trash" onClick={() => onDelete(_id)} />
        </Col>
      </Row>
    </Card>
  );
};
