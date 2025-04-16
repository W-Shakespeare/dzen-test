import { Card, Button, Row, Col, Container } from "react-bootstrap";
import OrderCard from "../../components/OrderCard/OrderCard";
import { OrderProducts } from "../../components/OrderProducts/OrderProducts";

import { OrdersProps } from "./models";

const Orders: React.FC<OrdersProps> = (p) => {
  return (
    <Row>
      <Col xs="12" className="mb-2">
        <Container className="d-flex align-items-center ms-0">
          <Button
            variant="success"
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "25px", height: "25px", fontSize: "14px" }}
            onClick={p.onShowCreateModal}
          >
            +
          </Button>
          <h2 className="ms-2 mb-0">Заказы</h2>
        </Container>
      </Col>

      {p.orders.length == 0 && <span className="ml-2">Нет заказов</span>}

      <Col md={p.isShowProductByOrder ? 5 : 12}>
        {p.orders.map((order) => (
          <OrderCard
            {...order}
            key={order._id}
            isOpenCard={p.isShowProductByOrder && p.currOrder?._id == order._id}
            productCount={order.products.length}
            onSave={(newTitle, newDate) =>
              p.onUpdateOrder(order._id, { title: newTitle, date: newDate })
            }
            onDelete={() => p.onDeleteOrder(order._id)}
            onSelectedOrder={p.onSelectedOrder}
            isShowProductByOrder={p.isShowProductByOrder}
          />
        ))}
      </Col>

      <Col md={p.isShowProductByOrder ? 7 : 0}>
        {p.isShowProductByOrder && p.currOrder && (
          <Card className="p-md-3">
            <Card.Title className="mb-3">{p.currOrder.title}</Card.Title>

            <Row className="justify-content-start">
              <Col md="auto">
                <Button
                  variant="success"
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "25px", height: "25px", fontSize: "14px" }}
                  onClick={p.onShowModuleCreateOrderProduct}
                >
                  +
                </Button>
              </Col>
              <Col md="auto">
                <p className="text-center">Добавить продукт</p>
              </Col>
            </Row>

            {p.currOrder.products.map((product) => (
              <OrderProducts
                {...product}
                key={product._id}
                onRemoveProductFromOrder={p.onRemoveProductFromOrder(
                  p.currOrder!._id
                )}
              />
            ))}
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default Orders;
