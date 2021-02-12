import * as React from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import './login.css'
const Login = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("");

    function handleSubmit(event: any) {
        // fill in
    }
    return (
        <div className="Login">
            <div className="Login-card">
                <form className="form" onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label className="form-label">Email</Form.Label>
                        <Form.Control
                            className="form-control"
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label className="form-label">Password</Form.Label>
                        <Form.Control
                            className="form-control"
                            value={password}
                            onChange={(e: any) => setPassword(e.target.value)}
                            type="password"
                        />
                    </Form.Group >
                    <Button type="submit">
                        Login
                  </Button>
                </form>
            </div>
        </div>
    )
}
export default Login