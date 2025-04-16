import { Modal, Button, Row, Form, Col, Spinner } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { OrderProducts } from "../../../../components/OrderProducts/OrderProducts";
import { ProductTypeSelect } from "../../../Products/components/ProductTypeSelect/ProductTypeSelect";
import { IProduct } from "../../../../models/IProduct";
import { OrderProductsModalProps } from "./models";
import ImageUpload from "./components/ImageUpload";

const OrderProductsModal: React.FC<OrderProductsModalProps> = (p) => (
  <Modal
    show={p.show}
    onHide={p.onHide}
    size="lg"
    className="order-product-modal"
    centered
  >
    <Row>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Продукты</Modal.Title>
      </Modal.Header>
      <Row>
        <Tabs
          id="controlled-tab-example"
          activeKey={p.currTab}
          onSelect={(k) => p.setCurrTab(k as string)}
          className="order-product-tabs"
        >
          <Tab eventKey="existProducts" title="Существующие продукты">
            <Modal.Body>
              {p.isLoading && <Spinner animation="border" />}
              {p.isError && <div>Ошибка загрузки продуктов</div>}
              {p.filteredProducts &&
                p.filteredProducts.map((product: IProduct) => (
                  <OrderProducts
                    key={product._id}
                    {...product}
                    onRemoveProductFromOrder={(id) => p.deleteProduct(id)}
                    isSelected={p.selectedProductsIds.includes(product._id)}
                    onToggleSelect={p.handleToggleSelectProduct}
                  />
                ))}
            </Modal.Body>
          </Tab>
          <Tab
            className="order-modal-tab-form"
            eventKey="addProduct"
            title="Добавить продукт"
          >
            <Modal.Body>
              <Form
                onSubmit={p.handleSubmit(p.onSubmit)}
                className="p-4 order-modal-form"
              >
                <ImageUpload {...p} />
                <Form.Group className="mb-3" controlId="serialNumber">
                  <Form.Label className="text-muted">Серийный номер</Form.Label>
                  <Form.Control
                    type="text"
                    {...p.register("serialNumber")}
                    isInvalid={!!p.errors.serialNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {p.errors.serialNumber?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Новый продукт"
                    {...p.register("isNew")}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="title">
                  <Form.Label className="text-muted">Название</Form.Label>
                  <Form.Control
                    type="text"
                    {...p.register("title")}
                    isInvalid={!!p.errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {p.errors.title?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="type">
                  <Form.Label className="text-muted">Тип</Form.Label>
                  <Controller
                    control={p.control}
                    name="type"
                    render={({ field }) => (
                      <ProductTypeSelect
                        value={field.value}
                        onSelect={(val: string) => field.onChange(val)}
                        isInvalid={!!p.errors.type?.message}
                      />
                    )}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className={p.errors.type ? "d-block" : ""}
                  >
                    {p.errors.type?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="specification">
                  <Form.Label className="text-muted">Спецификация</Form.Label>
                  <Form.Control
                    type="text"
                    {...p.register("specification")}
                    isInvalid={!!p.errors.specification}
                  />
                  <Form.Control.Feedback type="invalid">
                    {p.errors.specification?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="guaranteeStart">
                      <Form.Label className="text-muted">
                        Начало гарантии
                      </Form.Label>
                      <Controller
                        control={p.control}
                        name="guaranteeStart"
                        render={({ field }) => (
                          <DatePicker
                            className={`form-control ${
                              p.errors.guaranteeStart ? "is-invalid" : ""
                            }`}
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat="dd.MM.yyyy"
                          />
                        )}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className={p.errors.guaranteeStart ? "d-block" : ""}
                      >
                        {p.errors.guaranteeStart?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="guaranteeEnd">
                      <Form.Label className="text-muted">
                        Конец гарантии
                      </Form.Label>
                      <Controller
                        control={p.control}
                        name="guaranteeEnd"
                        render={({ field }) => (
                          <DatePicker
                            className={`form-control ${
                              p.errors.guaranteeEnd ? "is-invalid" : ""
                            }`}
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat="dd.MM.yyyy"
                          />
                        )}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className={p.errors.guaranteeEnd ? "d-block" : ""}
                      >
                        {p.errors.guaranteeEnd?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs="12">
                    <Form.Group className="mb-3" controlId="priceUsd">
                      <Form.Label className="text-muted">Цена USD</Form.Label>
                      <Form.Control
                        min={0}
                        type="number"
                        {...p.register("priceUsd")}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.target.value = e.target.value.replace(/\D/g, "");
                        }}
                        isInvalid={!!p.errors.priceUsd}
                      />
                      <Form.Control.Feedback type="invalid">
                        {p.errors.priceUsd?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs="12">
                    <Form.Group className="mb-3" controlId="priceUah">
                      <Form.Label className="text-muted">Цена UAH</Form.Label>
                      <Form.Control
                        min={0}
                        type="number"
                        {...p.register("priceUah")}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.target.value = e.target.value.replace(/\D/g, "");
                        }}
                        isInvalid={!!p.errors.priceUah}
                      />
                      <Form.Control.Feedback type="invalid">
                        {p.errors.priceUah?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
          </Tab>
        </Tabs>
      </Row>
    </Row>

    <Modal.Footer>
      <Button
        variant="primary"
        onClick={
          p.currTab === "addProduct"
            ? p.handleSubmit(p.onSubmit)
            : () => p.onAddProductsToOrder(p.selectedProductsIds)
        }
      >
        {p.currTab === "addProduct"
          ? "Добавить продукт"
          : `Добавить продукты  ${p.selectedProductsIds.length}`}
        {p.isCreateProductLoading && (
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

export default OrderProductsModal;
