import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

interface ISearchProps {}

export const Search = () => {
  const [search, setSearch] = useState("");
  return (
    <div style={{ position: "relative" }}>
      <InputGroup>
        <Form.Control
          placeholder="Поиск заказа..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
    </div>
  );
};
