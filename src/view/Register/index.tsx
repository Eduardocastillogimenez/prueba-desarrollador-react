import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// import AlertM from "./Alert";

import { Container } from '../style';

import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

  // -------------- Registro de usuarios  -------------- //
export default function Register() {
  const { signup } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    message.info("");
    console.log(user)
    try {
      await signup(user.email, user.password);
      navigate("/");
      // -------------- Todo funciono entonces redirigir a pagina principal  -------------- //
    } catch (error: any) {
      message.info(error.message);
      console.log(error)
      // -------------- ocurrio un error  -------------- //
    }
  };

  const handleChange = (props: any) => {
      // -------------- cambios en el imput  -------------- //
    const value = props.target.value;
    const name = props.target.name ? props.target.name : props.target.type;
    setUser({ ...user, [name]: value });  // -------------- recoger todo el usuario y editar segun que name (imput)  -------------- //
  }

  return (
    <Container>
      {/* {error && <AlertM messageA={error} />} */}
      <Form
        className="login-form"
        name="normal_login"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} name="email"
            onChange={handleChange} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Registrarse
          </Button>
          <p>
            Cargar cuenta
            <Link to="/login" style={{ paddingLeft: "20px" }}>
              Conectarse
            </Link>
          </p>
        </Form.Item>
      </Form>
    </Container>
  );
}
