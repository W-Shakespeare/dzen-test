import { Card, Col, Image, Row } from "react-bootstrap";
import { Trash3 } from "react-bootstrap-icons";
import { IProduct } from "../../models/IProduct";

interface IOrderProducts extends IProduct {
  onRemoveProductFromOrder?: (id: string) => void;
  onToggleSelect?: (id: string) => void;
  isSelected?: boolean;
}

export const OrderProducts: React.FC<IOrderProducts> = ({
  photo,
  serialNumber,
  title,
  isNew,
  price,
  _id,
  onToggleSelect,
  isSelected,
  onRemoveProductFromOrder,
}) => {
  const priceUsd = price.find((p) => p.symbol === "USD");
  const priceUah = price.find((p) => p.symbol === "UAH");

  return (
    <Card
      className={`p-md-2 mb-3 ${isSelected ? "selected-card" : ""}`}
      onClick={() => onToggleSelect && onToggleSelect(_id)}
    >
      <Row className="align-items-center">
        <Col xs="1" className="ms-3 d-flex">
          <div
            style={{ background: isNew ? "#198754" : "gray" }}
            className="product-circle"
          ></div>
        </Col>
        <Col xs="2">
          <Image src={photo} width={70} height={70} fluid />
        </Col>
        <Col xs="5">
          <Row>
            <Col xs="12">
              <span>{title}</span>
            </Col>
            <Col xs="12">
              <span>{serialNumber}</span>
            </Col>
          </Row>
        </Col>
        <Col xs="2">
          <Row>
            <Col xs="12">
              <span>{`${priceUsd?.value} `} USD</span>
            </Col>
            <Col xs="12">
              <span>{`${priceUah?.value}`} UAH</span>
            </Col>
          </Row>
        </Col>

        {onRemoveProductFromOrder && (
          <Col xs="1">
            <Trash3
              className="card-order-product"
              onClick={() => onRemoveProductFromOrder(_id)}
            />
          </Col>
        )}
      </Row>
    </Card>
  );
};
