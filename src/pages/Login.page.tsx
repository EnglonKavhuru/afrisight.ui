import { Button, Card, Form , Input, message} from "antd";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";


const LoginPage = () => {
    const navigate = useNavigate();

    const login = (userCredentials: { email : string; password : string }) => {
        // Needed to implement auth
        axios.post( `http://localhost:4000/users/login`, userCredentials ).then( done => {
            message.success("Login in successfully")
        }).catch( error =>{
            message.warning("Failed to login")
        })
        navigate('/home')
    }

    return (
        <center>
            <Card 
            className="login-card"
            title= "Project Management System"
            actions={[
            <Button htmlType="submit" type="primary" style={{ width : "100%"}} form="loginInForm">Login</Button>
            ]}
            >
                <Form 
                
                id = "loginInForm"
                onFinish={ (v) => {
                    login(v);
                }}>

                    <Form.Item>
                        <Input 
                        style={{ height : 33 }}
                        name="email"
                        placeholder="Enter your email"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Input 
                        style={{ height : 33 }}
                        name="password"
                        placeholder="Enter your password"
                        type="password"
                        />
                    </Form.Item>

                </Form>
            </Card>
        </center>
    )
}


export default LoginPage;