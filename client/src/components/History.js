import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const History = () => {
  return (
    <div style={{ marginTop: '30px' }}>
        <h4 style={{ display: 'flex', justifyContent: 'center' }}>Testing History</h4>
        <Form style={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <Form.Group className="mb-3">
                <FloatingLabel label="Search History" className="mb-3">
                    <Form.Control required type="text" placeholder="Name..." />
                </FloatingLabel>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="secondary" type="submit" style={{ display: 'flex', justifyContent: 'center' }}>Search</Button>
                </div>
            </Form.Group>
        </Form>
    </div>
  )
}

export default History