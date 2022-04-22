import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Check = () => {
    const [name, setName] = useState("")
    const [disease, setDisease] = useState("")
    const [showResult, setShowResult] = useState(false)
    const currDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name)
        console.log(disease)
        setShowResult(true)
    }    

    return (
        <div style={{ marginTop: '30px' }}>
            <h4 style={{ display: 'flex', justifyContent: 'center', color: 'white', fontStyle: 'bold' }}>Test Your DNA Here</h4>
            <Form style={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" style={{ color: 'white', fontStyle: 'italic' }}>
                    <Form.Label style={{ display: 'flex', justifyContent: 'center' }}>Enter your Name</Form.Label>
                    <Form.Control required type="text" placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)} />
                    <br />
                    <Form.Label style={{ display: 'flex', justifyContent: 'center' }}>Enter your Sequence DNA</Form.Label>
                    <Form.Control required type="file" />
                    <br />
                    <Form.Label style={{ display: 'flex', justifyContent: 'center' }}>Enter your Prediction</Form.Label>
                    <Form.Control required type="text" placeholder="Disease..." value={disease} onChange={(e) => setDisease(e.target.value)} />
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="success" type="submit" style={{ display: 'flex', justifyContent: 'center' }}>Submit</Button>
                    </div>
                </Form.Group>
            </Form>
            {showResult ? <div>
                <br />
                <h4 style={{ display: 'flex', justifyContent: 'center' }}>Your Result</h4>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                    Name : {name}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1px'}}>
                    Date : {currDate}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1px'}}>
                    Disease : {disease}
                </div>
            </div> : <></>}
        </div>
    )
}

export default Check