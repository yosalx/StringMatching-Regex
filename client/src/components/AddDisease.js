import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AddDisease = () => {
  return (
    <div style={{ marginTop: '30px' }}>
        <h4 style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>Add Disease</h4>
        <Form style={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <Form.Group className="mb-3" style={{ color: 'white', fontStyle: 'italic' }}>
                <Form.Label style={{ display: 'flex', justifyContent: 'center'}}>Enter The Disease Name</Form.Label>
                <Form.Control required type="text" placeholder="Name..." />
                <br />
                <Form.Label style={{ display: 'flex', justifyContent: 'center'}}>Input The Sequence DNA</Form.Label>
                <Form.Control required type="file" />
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="success" type="submit" style={{ display: 'flex', justifyContent: 'center' }}>Add</Button>
                </div>
            </Form.Group>
        </Form>
    </div>
  )
}

export default AddDisease