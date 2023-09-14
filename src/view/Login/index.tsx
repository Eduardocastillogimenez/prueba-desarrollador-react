import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// import AlertM from "../Alert";

import { Container, Google_login } from '../style.js';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle, resetPassword } = useAuth();
  // const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    // e.preventDefault();
    console.log(user)
    message.info("");
    try {
      await login(user.email, user.password);
      navigate("/");
       // -------------- Todo funciono entonces redirigir a pagina principal  -------------- //
    } catch (error: any) {
      message.info(error.message);
        // -------------- ocurrio un error  -------------- //
    }
  };

  const handleChange = (props: any) => {
    // -------------- cambios en el imput  -------------- //
    const value = props.target.value;
    const name = props.target.name ? props.target.name : props.target.type;
    setUser({ ...user, [name]: value });// -------------- recoger todo el usuario y editar segun que name (imput)  -------------- //
  }

  const handleGoogleSignin = async () => {
    // -------------- conectarse mediante google  -------------- //
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error: any) {
      message.info(error.message);
    }
  };

  return (
    <Container>
      {/* {error && <AlertM messageA={error} />} */}
      <Form
        className="login-form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        name="normal_login"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} onChange={handleChange} name="email" placeholder="email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password" name="password"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Conectarse
          </Button>
          <p>
            Crear una cuenta
            <Link to="/register" style={{ paddingLeft: "20px" }}>
              Registrarse
            </Link>
          </p>
        </Form.Item>
      </Form>
    </Container>
  );
}
