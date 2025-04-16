import { Modal, Button, Row, Form, Col } from "react-bootstrap";

import { Spinner } from "react-bootstrap";

import { IProduct } from "../../../../models/IProduct";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  useAddProductsToOrderMutation,
  useGetOrderProductIdsQuery,
} from "../../../../services/Order";

import { toast } from "react-toastify";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../../services/Products";
import { OrderProducts } from "../../../../components/OrderProducts/OrderProducts";
import { ProductTypeSelect } from "../../../Products/components/ProductTypeSelect/ProductTypeSelect";
import { schema } from "./schema";

interface OrderProductsModalProps {
  show: boolean;
  onHide: () => void;
  orderId: string;
}

const OrderProductsModal: React.FC<OrderProductsModalProps> = ({
  show,
  onHide,
  orderId,
}) => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [currTab, setCurrTab] = useState("existProducts");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const [createProduct, { isLoading: isCreateProductLoading }] =
    useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [addProductsToOrder] = useAddProductsToOrderMutation();
  const { data: orderProductIds } = useGetOrderProductIdsQuery(orderId);

  const filteredProducts = products?.filter(
    (product) => !orderProductIds?.includes(product._id)
  );

  const onAddProductsToOrder = (productsToAdd: string[]) => {
    addProductsToOrder({
      orderId,
      productsToAdd,
    })
      .unwrap()
      .then(() => {
        toast.success("Продукт успешно добавлен в заказ!");
        setSelectedProductsIds([]);
      })
      .catch(() => toast.error("Ошибка при добавлении продукта в заказ"));
  };

  const onSubmit = async (data: any) => {
    // Создаем объект FormData
    const formData = new FormData();

    const guaranteeStart = data.guaranteeStart
      ? data.guaranteeStart.toISOString()
      : null;
    const guaranteeEnd = data.guaranteeEnd
      ? data.guaranteeEnd.toISOString()
      : null;

    formData.append("title", data.title);
    formData.append("serialNumber", data.serialNumber);
    formData.append("type", data.type);
    formData.append("specification", data.specification);
    formData.append("guaranteeStart", guaranteeStart);
    formData.append("guaranteeEnd", guaranteeEnd);
    formData.append("isNew", data.isNew);
    formData.append(
      "price",
      JSON.stringify([
        { value: data.priceUsd, symbol: "USD" },
        { value: data.priceUah, symbol: "UAH" },
      ])
    );

    if (data?.photo) {
      formData.append("photo", data.photo);
    }

    try {
      await createProduct(formData)
        .unwrap()
        .then((res) => {
          toast.success("Продукт успешно создан!");

          if (!res?._id || !orderId) return;

          onAddProductsToOrder([res._id]);

          reset();
          setImagePreview(null);
        });
    } catch (error) {
      toast.error("Ошибка при создании продукта");
    }
  };

  const hideAndResetModal = () => {
    setImagePreview(null);
    reset();
    onHide();
  };

  const [selectedProductsIds, setSelectedProductsIds] = useState<string[]>([]);

  const handleToggleSelectProduct = (productId: string) => {
    setSelectedProductsIds((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  return (
    <Modal
      show={show}
      onHide={hideAndResetModal}
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
            activeKey={currTab}
            onSelect={(k) => setCurrTab(k as string)}
            className="order-product-tabs"
          >
            <Tab eventKey="existProducts" title="Существующие продукты">
              <Modal.Body>
                {isLoading && <Spinner animation="border" />}
                {isError && <div>Ошибка загрузки продуктов</div>}
                {filteredProducts &&
                  filteredProducts.map((product: IProduct) => (
                    <OrderProducts
                      key={product._id}
                      {...product}
                      onRemoveProductFromOrder={(id) => deleteProduct(id)}
                      isSelected={selectedProductsIds.includes(product._id)}
                      onToggleSelect={handleToggleSelectProduct}
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
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-4 order-modal-form"
                >
                  <Form.Group className="mb-3">
                    <Form.Label>Фото</Form.Label>
                    <Controller
                      name="photo"
                      control={control}
                      render={({ field }) => (
                        // @ts-ignore
                        <Form.Control
                          type="file"
                          accept="image/jpeg,image/png,image/jpg"
                          isInvalid={!!errors.photo}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const allowedTypes = [
                                "image/jpeg",
                                "image/png",
                                "image/jpg",
                              ];
                              if (!allowedTypes.includes(file.type)) {
                                alert(
                                  "Допустимы только форматы: jpg, jpeg, png"
                                );
                                e.target.value = "";

                                setImagePreview(null);
                                return;
                              }
                              setValue("photo", file);
                              setImagePreview(URL.createObjectURL(file));
                            }
                          }}
                          name="photo"
                        />
                      )}
                    />

                    {errors.photo && (
                      <p className="text-danger">{errors.photo.message}</p>
                    )}
                  </Form.Group>

                  {imagePreview && (
                    <div>
                      <img src={imagePreview} alt="Image Preview" width="100" />
                    </div>
                  )}
                  <Form.Group className="mb-3" controlId="serialNumber">
                    <Form.Label className="text-muted">
                      Серийный номер
                    </Form.Label>
                    <Form.Control
                      type="text"
                      {...register("serialNumber")}
                      isInvalid={!!errors.serialNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.serialNumber?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Новый продукт"
                      {...register("isNew")}
                    />
                  </Form.Group>

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

                  <Form.Group className="mb-3" controlId="type">
                    <Form.Label className="text-muted">Тип</Form.Label>
                    <Controller
                      control={control}
                      name="type"
                      render={({ field }) => (
                        <ProductTypeSelect
                          value={field.value}
                          onSelect={(val: string) => field.onChange(val)}
                          isInvalid={!!errors.type?.message}
                        />
                      )}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className={errors.type ? "d-block" : ""}
                    >
                      {errors.type?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="specification">
                    <Form.Label className="text-muted">Спецификация</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("specification")}
                      isInvalid={!!errors.specification}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.specification?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="guaranteeStart">
                        <Form.Label className="text-muted">
                          Начало гарантии
                        </Form.Label>
                        <Controller
                          control={control}
                          name="guaranteeStart"
                          render={({ field }) => (
                            <DatePicker
                              className={`form-control ${
                                errors.guaranteeStart ? "is-invalid" : ""
                              }`}
                              selected={field.value}
                              onChange={(date) => field.onChange(date)}
                              dateFormat="dd.MM.yyyy"
                            />
                          )}
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          className={errors.guaranteeStart ? "d-block" : ""}
                        >
                          {errors.guaranteeStart?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="mb-3" controlId="guaranteeEnd">
                        <Form.Label className="text-muted">
                          Конец гарантии
                        </Form.Label>
                        <Controller
                          control={control}
                          name="guaranteeEnd"
                          render={({ field }) => (
                            <DatePicker
                              className={`form-control ${
                                errors.guaranteeEnd ? "is-invalid" : ""
                              }`}
                              selected={field.value}
                              onChange={(date) => field.onChange(date)}
                              dateFormat="dd.MM.yyyy"
                            />
                          )}
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          className={errors.guaranteeEnd ? "d-block" : ""}
                        >
                          {errors.guaranteeEnd?.message}
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
                          {...register("priceUsd")}
                          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                          }}
                          isInvalid={!!errors.priceUsd}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.priceUsd?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs="12">
                      <Form.Group className="mb-3" controlId="priceUah">
                        <Form.Label className="text-muted">Цена UAH</Form.Label>
                        <Form.Control
                          min={0}
                          type="number"
                          {...register("priceUah")}
                          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                          }}
                          isInvalid={!!errors.priceUah}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.priceUah?.message}
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
            currTab === "addProduct"
              ? handleSubmit(onSubmit)
              : () => onAddProductsToOrder(selectedProductsIds)
          }
        >
          {currTab === "addProduct"
            ? "Добавить продукт"
            : `Добавить продукты  ${selectedProductsIds.length}`}
          {isCreateProductLoading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
        {/* )} */}
      </Modal.Footer>
    </Modal>
  );
};

export default OrderProductsModal;
