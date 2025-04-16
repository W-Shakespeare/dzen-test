import { Modal, Button, Row, Form, Col } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { ICreateOrder } from "../../../../models/IOrder";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { toast } from "react-toastify";
import { useGetProductsQuery } from "../../../../services/Products";
import { OrderProducts } from "../../../../components/OrderProducts/OrderProducts";
import { schema } from "./schema";
import { useCreateOrderMutation } from "../../../../services/Order";
import { IProduct } from "../../../../models/IProduct";

interface OrderProductsModalProps {
  show: boolean;
  onHide: () => void;
}

const OrderModal: React.FC<OrderProductsModalProps> = ({ show, onHide }) => {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const [createOrder, { isLoading: isCreateOrderLoading }] =
    useCreateOrderMutation();

  const [currTab, setCurrTab] = useState("createOrder");
  const [selectedProductsIds, setSelectedProductsIds] = useState<string[]>([]);

  const handleToggleSelectProduct = (productId: string) => {
    setSelectedProductsIds((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const newOrder: ICreateOrder = {
      title: data.title,
      date: data.date,
      productIds: selectedProductsIds,
    };

    try {
      await createOrder(newOrder)
        .unwrap()
        .then(() => {
          toast.success("Ордер успешно создан!");
          reset();
        });
    } catch (error) {
      toast.error("Ошибка при создании ордера");
    }
  };

  const hideAndResetModal = () => {
    reset();
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={hideAndResetModal}
      size="lg"
      className="order-modal"
      centered
    >
      <Row>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Создать заказ
          </Modal.Title>
        </Modal.Header>
        <Row>
          <Tabs
            id="controlled-tab-example"
            activeKey={currTab}
            onSelect={(k) => setCurrTab(k as string)}
            className="order-product-tabs "
          >
            <Tab
              eventKey="createOrder"
              title="Создать заказ"
              className="order-form-tab"
            >
              <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)} className="p-4">
                  <Form.Group className="mb-3" controlId="title">
                    <Form.Label className="text-muted">Название</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("title")}
                      isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="date">
                    <Col xs="12">
                      <Form.Label>Дата</Form.Label>
                    </Col>
                    <Controller
                      control={control}
                      name="date"
                      render={({ field }) => (
                        <DatePicker
                          className={`form-control ${
                            errors.date ? "is-invalid" : ""
                          }`}
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                          dateFormat="dd.MM.yyyy"
                        />
                      )}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className={errors.date ? "d-block" : ""}
                    >
                      {errors.date?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form>
              </Modal.Body>
            </Tab>
            <Tab eventKey="addProduct" title="Добавить продукты в заказ">
              <Modal.Body>
                {isLoading && <Spinner animation="border" />}
                {isError && <div>Ошибка загрузки продуктов</div>}
                {products.map((product: IProduct) => (
                  <OrderProducts
                    key={product._id}
                    {...product}
                    isSelected={selectedProductsIds.includes(product._id)}
                    onToggleSelect={handleToggleSelectProduct}
                  />
                ))}
              </Modal.Body>
            </Tab>
          </Tabs>
        </Row>
      </Row>

      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit(onSubmit)}>
          Создать заказ
          {isCreateOrderLoading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
