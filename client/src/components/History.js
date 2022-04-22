import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const History = () => {
  return (
    <div style={{ marginTop: '30px' }}>
        <h4 style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>Testing History</h4>
        <Form style={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <Form.Group className="mb-3" style={{ color: 'white', fontStyle: 'italic' }}>
                <Form.Label style={{ display: 'flex', justifyContent: 'center' }}>Enter your Keyword</Form.Label>
                    <Form.Control required type="text" placeholder="Search..." />
                    <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="success" type="submit" style={{ display: 'flex', justifyContent: 'center' }}>Search</Button>
                </div>
            </Form.Group>
        </Form>
    </div>
  )
}

export default History