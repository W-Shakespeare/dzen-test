import { Col, Row } from "react-bootstrap";
import { IProduct } from "../../models/IProduct";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../services/Products";

import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import { ProductTypeSelect } from "./components/ProductTypeSelect/ProductTypeSelect";
import { Product } from "./components/Product/Product";
import { toast } from "react-toastify";

const Products = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const { data: products, isFetching } = useGetProductsQuery(selectedType);
  const [deleteProduct] = useDeleteProductMutation();

  const onDeleteProduct = (id: string) => {
    deleteProduct(id)
      .unwrap()
      .then(() => {
        toast.success("Продукт успешно удалён");
      })
      .catch(() => {
        toast.error("Ошибка при удалении продукта");
      });
  };
  return (
    <>
      {isFetching && <Loading />}
      <Row>
        <h2>Продукты</h2>

        <Col xs="3" className="mb-3">
          <ProductTypeSelect
            onSelect={(type: string) => setSelectedType(type)}
          />
        </Col>

        <Col xs="12">
          {products?.length == 0 && <span className="ml-2">Нет продуктов</span>}
          {products &&
            products.map((product: IProduct) => (
              <Product
                key={product._id}
                {...product}
                onDelete={(id) => onDeleteProduct(id)}
              />
            ))}
        </Col>
      </Row>
    </>
  );
};

export default Products;
