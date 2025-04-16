import { useState } from "react";
import TextOverflowTooltip from "../TextOverflowTooltip/TextOverflowTooltip";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Check, Pencil, Trash3, ChevronUp } from "react-bootstrap-icons";
import { IOrderCardProps } from "./models";

const OrderCard = ({
  title,
  date,
  productCount,
  onSave,
  onSelectedOrder,
  _id,
  isShowProductByOrder,
  totalUSD,
  totalOtherCurrency,
  onDelete,
  isOpenCard,
}: IOrderCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDate, setEditedDate] = useState(date);

  const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onSave(editedTitle, editedDate);
    setIsEditing(false);
  };

  const onShowProducts = () => {
    onSelectedOrder(_id);
  };

  return (
    <Row className="mb-3">
      <Col xs={12} className="card-transition">
        <Card
          className="p-2 justify-content-center card-order"
          style={{ height: 100 }}
        >
          <Row className="align-items-center">
            {!isShowProductByOrder && (
              <Col
                lg="4"
                sm="2"
                className={
                  isShowProductByOrder ? "card-order-close" : "card-order-open"
                }
              >
                {isEditing ? (
                  <Form.Control
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    size="sm"
                  />
                ) : (
                  <TextOverflowTooltip text={editedTitle} />
                )}
              </Col>
            )}
            {!isShowProductByOrder && (
              <Col lg="1" md="1">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    isEditing ? handleSave(e) : setIsEditing(true);
                  }}
                  className="d-flex align-items-center"
                >
                  {isEditing ? <Check /> : <Pencil />}
                </Button>
              </Col>
            )}

            <Col lg={isShowProductByOrder ? 4 : 2} sm="2">
              <Card.Text>
                <strong>Продукта:</strong> {productCount}
              </Card.Text>
            </Col>
            <Col lg={isShowProductByOrder ? 4 : 2} sm="2">
              <strong>Дата заказа:</strong>{" "}
              {isEditing ? (
                <Form.Control
                  type="date"
                  value={editedDate.slice(0, 10)}
                  onChange={(e) => setEditedDate(e.target.value)}
                  size="sm"
                />
              ) : (
                new Date(editedDate).toLocaleDateString()
              )}
            </Col>

            <Col lg={isShowProductByOrder ? 2 : 1} sm="2">
              <Row>
                <Col xs="12">{totalUSD} USD</Col>
                <Col xs="12">{totalOtherCurrency} UAH</Col>
              </Row>
            </Col>

            {!isShowProductByOrder && (
              <Col
                lg="1"
                sm="1"
                className={
                  isShowProductByOrder ? "card-order-close" : "card-order-open"
                }
              >
                <Trash3
                  className="card-order-trash"
                  onClick={() => onDelete(_id)}
                />
              </Col>
            )}

            <Col lg="1" md="1">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={onShowProducts}
                className={`order-btn ${
                  isOpenCard ? "open-order-btn" : "close-order-btn"
                }`}
              >
                <ChevronUp size={22} />
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
export default OrderCard;
