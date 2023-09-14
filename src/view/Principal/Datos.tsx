import {useState} from 'react';
import { Form, Input, Button, message, Layout, Divider } from "antd";
import { UserOutlined, UserAddOutlined, FieldNumberOutlined, FileJpgOutlined, EditOutlined } from '@ant-design/icons';
import { getDatabase, ref, onValue, get, child, push, update } from "firebase/database";
import { app } from "../../firebase";

import { useAuth } from "../../context/AuthContext";

export interface Data {
    name: string, 
    username: string, 
    age: number, 
    picture: string 
  }

function Datos() {
    const { Content} = Layout;
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const { logout, user } = useAuth();
    const emailUser = user.email.replace(/[^\w\s]|_/g, "");
    const database = getDatabase(app);
    const starCountRef = ref(database, emailUser);

    const [formulario, setFormulario]= useState(true);
    const [data, setData]= useState({} as Data );

    get(starCountRef).then((snapshot) => {
        const userData = snapshot.val();
        if(userData){
            form.setFieldsValue({ 
                name: userData.name, 
                username: userData.username, 
                age: userData.age, 
                picture: userData.picture 
            });
            if(!data.name){
                setData(userData);
            }
        }
    });

    function writeNewPost(name: any, username: string, age: any, picture: any) {

        // A post entry.
        const postData = {
          email: emailUser,
          name: name,
          username: username,
          age: age,
          picture: picture
        };
    
        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates: any = {};
        updates['/'+ emailUser] = postData;
    
        return update(ref(database), updates);
    }

    const onFinish = (values : {name: string, username: string, age: number, picture: string}) => {
        try {
            writeNewPost(values.name, values.username, values.age, values.picture);
            messageApi.open({
                type: 'success',
                content: 'Cambios guardados',
            });
            setData({} as Data);
            setFormulario(!formulario);
        } catch (error: any) {
            messageApi.open({
                type: 'error',
                content: 'error',
            });
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    const onValuesChange = (e: any) => {
        form.setFieldsValue(e);
    };
  
    return (
        <Layout style={{ height: "100vh" }}>
            {formulario ? 
            <div>
                <h1>Nombre</h1>
                <p>{data && data.name}</p>
                <Divider />
                <h1>Usuario</h1>
                <p>{data && data.username}</p>
                <Divider />
                <h1>Edad</h1>
                <p>{data && data.age}</p>
                <Divider />
                <h1>Url foto de perfil</h1>
                <p>{data && data.picture}</p>
                <Divider />
                <Button type="primary" htmlType="submit" onClick={()=> setFormulario(!formulario)}>
                    Editar mis datos
                </Button>
            </div>
            :
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
                    <Form
                        name="datos_usuarios"
                        className="login-form"
                        form={form}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onValuesChange={onValuesChange}
                    >
                        {contextHolder}
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Ingresa su Nombre!' }]}
                        >
                            <Input prefix={<EditOutlined className="site-form-item-icon" />}  placeholder="Nombre" />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Ingresa su Usuario!' }]}
                        >
                            <Input prefix={<UserAddOutlined className="site-form-item-icon" />} placeholder="Usuario" />
                        </Form.Item>
                        <Form.Item
                            name="age"
                            rules={[{ required: true, message: 'Ingresa su edad!' }]}
                        >
                            <Input prefix={<FieldNumberOutlined className="site-form-item-icon" />} type='number' placeholder="Edad" />
                        </Form.Item>
                        <Form.Item
                            name="picture"
                            rules={[{ required: true, message: 'Ingresa su foto!' }]}
                        >
                            <Input prefix={<FileJpgOutlined className="site-form-item-icon" />} placeholder="Url de la foto" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Enviar
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>}
        </Layout>
    );
};

export default Datos;