import * as React from 'react'
import { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import './signup.css'
const Signup = () => {
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("");

    function handleSubmit(event: any) {
        // fill in
    }
    return (
        <div className="Signup">
            <div className="Signup-card">
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
                    <Form.Group controlId="username">
                        <Form.Label className="form-label">Username</Form.Label>
                        <Form.Control
                            className="form-control"
                            autoFocus
                            type="username"
                            value={username}
                            onChange={(e: any) => setUsername(e.target.value)}
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
                    <Form.Group controlId="password">
                        <Form.Label className="form-label">Re-enter Password</Form.Label>
                        <Form.Control
                            className="form-control"
                            value={password}
                            onChange={(e: any) => setPassword(e.target.value)}
                            type="password"
                        />
                    </Form.Group >
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Type of User</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>Manager</option>
                            <option>Team member</option>
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit">
                        Sign Up
                  </Button>
                    
                </form>
            </div>
        </div>
    )
}
export default Signup

