import {useState} from 'react';
import { Form, Input, Button,Checkbox,Layout, Select } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// interface Cultivos {
//     // cultivos?: Object;
//     // startDate?: string;
//     // endDate?: string;
// }

function Calculadora() {
    const { Content} = Layout;
    const [data, setData] = useState({ 
        monto: 0, 
        propina: 0,
    });

    const onFinish = (values : {monto: number, propina: number}) => {
        console.log(values);
        const propina = +values.monto * (+values.propina / 100);
        // agregar desimales aca, es decir, q solo se puedan 2
        setData({monto : +values.monto, propina: propina });
    }

    let options = [];
    for (let i = 0; i <= 50; i++) {
        options.push({ value: i, label: i+'%' });
    }
    
    return (
    <Layout style={{ height: "100vh" }}>
        <Content
            style={{
                padding: "0 50px",
                marginTop: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}
        >
            <div
                style={{
                    background: "#fff",
                    padding: 24,
                    height: 450,
                    width: 400,
                    textAlign: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    display: "flex"
                }}
            >
                {data.monto === 0 ? 
                    <Form
                        name="obtener_propina"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <h2>Calcular propina</h2>
                        <h4>Monto total de la cuenta</h4>
                        <Form.Item
                            name="monto"
                            rules={[{ required: true, message: 'Ingresa el monto numerico!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} type="number" placeholder="Monto" />
                        </Form.Item>
                        <h4>Porcentage de propina que se desea dar</h4>
                        <Form.Item
                            name="propina"
                            rules={[{ required: true, message: 'Ingresa la propina!' }]}
                        >
                            <Select
                                options={options}
                            />
                        </Form.Item>
                        <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Calcular
                        </Button>
                        </Form.Item>
                    </Form>
                :
                    <Form
                        name="obtener_propina"
                        className="login-form"
                    >
                        <Button type="primary" onClick={()=> { setData({ monto: 0, propina: 0 }) } } className="login-form-button">
                            Volver
                        </Button>
                        <h2>Calculos</h2>
                        <p>
                            La propina es de {data.propina}, el monto del servicio es de {data.monto} por ende la cantidad total a 
                            pagar es de {" "} {data.monto+data.propina}
                        </p>
                    </Form>
                }
            </div>
        </Content>
    </Layout>);
};

export default Calculadora;