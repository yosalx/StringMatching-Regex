import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Check = () => {
  return (
    <div style={{ marginTop: '30px' }}>
        <h4 style={{ display: 'flex', justifyContent: 'center' }}>Test Your DNA Here</h4>
        <Form style={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <Form.Group className="mb-3">
                <Form.Label style={{ display: 'flex', justifyContent: 'center'}}>Enter your Name</Form.Label>
                <Form.Control required type="text" placeholder="Name..." />
                <br />
                <Form.Label style={{ display: 'flex', justifyContent: 'center'}}>Enter your Sequence DNA</Form.Label>
                <Form.Control required type="file" />
                <br />
                <Form.Label style={{ display: 'flex', justifyContent: 'center'}}>Enter your Prediction</Form.Label>
                <Form.Control required type="text" placeholder="Disease..." />
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="secondary" type="submit" style={{ display: 'flex', justifyContent: 'center' }}>Submit</Button>
                </div>
            </Form.Group>
        </Form>
    </div>
  )
}

export default Check