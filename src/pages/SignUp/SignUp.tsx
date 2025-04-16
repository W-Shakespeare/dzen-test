import { useState } from "react";
import { Card, Button, Form, Container, Spinner, Alert } from "react-bootstrap";
import { useRegisterMutation } from "../../services/Auth";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { updateToken } from "../../redux/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { IAuthError } from "../../models/IShared";
import { PagesEnum } from "../../routes";
import { socket } from "../../components/Header/Header";

const schema = yup.object().shape({
  email: yup.string().email("Некорректный email").required("Обязательное поле"),
  password: yup
    .string()
    .min(6, "Минимум 6 символов")
    .required("Обязательное поле"),
  username: yup.string().required("Обязательное поле"),
});

function SignUp() {
  const [register, { isLoading, error }] = useRegisterMutation();
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await register(data).unwrap();
      dispatch(updateToken(response.token));
      toast.success("Регистрация успешна");
      socket.auth = { token: response.token };
      localStorage.setItem("auth", response.token);
      navigate(PagesEnum.Orders);
    } catch (err) {
      console.error(err);
      toast.error((err as IAuthError)?.data?.error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="shadow-lg w-100" style={{ maxWidth: "480px" }}>
        <Card.Body>
          <div className="text-center">
            <Card.Title as="h1" className="h3">
              Sign up
            </Card.Title>
            <Card.Text className="text-muted">
              Sign up below to access your account
            </Card.Text>
          </div>
          <div className="mt-4">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-4" controlId="email">
                <Form.Label className="text-muted">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  {...formRegister("email")}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="username">
                <Form.Label className="text-muted">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  {...formRegister("username")}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="password">
                <Form.Label className="text-muted">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...formRegister("password")}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-grid">
                <Button
                  type="submit"
                  variant="dark"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </div>

              <p className="text-center text-muted mt-4">
                Already have an account?{" "}
                <Link to="/signin" className="text-decoration-none">
                  Sign in
                </Link>
                .
              </p>

              {error && (
                <Alert variant="danger" className="mt-3 text-center">
                  Ошибка регистрации
                </Alert>
              )}
            </Form>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SignUp;
