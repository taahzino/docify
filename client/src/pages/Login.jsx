import React, { useEffect, useState } from "react";
import classes from "../styles/FormCard.module.css";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AlertComponent from "../components/Alert";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading";
import { useDocs } from "../contexts/DocsContext";
import Body from "../components/layout/Body";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [filledUp, setFilledUp] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const { dispatchDocs } = useDocs();

  const submitHandler = (e) => {
    e.preventDefault();
    setFilledUp(false);
    setShowError(false);
    setShowSuccess(false);
    setLoading(false);
    setErrorMessage("");
    setSuccessMessage("");

    if (!email || !password) {
      setShowError(true);
      setErrorMessage("All fields are required!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setFilledUp(true);
    }, 1500);
  };

  useEffect(() => {
    dispatchDocs({ type: "unload" });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      if (filledUp) {
        try {
          const result = await login({
            email,
            password,
          });

          if (result.type === "error") {
            setShowError(true);
            setErrorMessage(result.data.message);
          } else {
            setShowSuccess(true);
            setSuccessMessage(result.data.message);

            setShowSuccess(false);
            setSuccessMessage(null);
            navigate("/");
          }
          setFilledUp(false);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    })();

    return () => {
      setFilledUp(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, filledUp, navigate, password]);

  return (
    <Body>
      <Container className="py-4 rounded d-flex align-items-center justify-content-center">
        <Form
          className={`${classes.formCard} bg-white p-4 rounded`}
          onSubmit={submitHandler}
        >
          <h2 className="text-center">Docify</h2>
          <p className="text-center">An address for your documents</p>
          <hr />

          <AlertComponent variant="danger" show={showError}>
            {errorMessage}
          </AlertComponent>

          <AlertComponent variant="success" show={showSuccess}>
            {successMessage}
          </AlertComponent>

          <Loading loading={loading} text="Logging you in" />

          <h4>Login</h4>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <div>
            <span>Don't have an account? </span>
            <Link to="/signup">Sign up</Link>
          </div>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </Body>
  );
};

export default Login;
