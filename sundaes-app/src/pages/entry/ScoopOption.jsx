import * as React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

export default function ScoopOption({ name, imagePath, updateItemCount }) {
  const [isInvalid, setIsInvalid] = React.useState(false)
  const handleChange = (event) => {
    const numberValue = Number(event.target.value)
    // isInvalid && setIsInvalid(false)

    if (!numberValue) {
      setIsInvalid(true)
      return
    }
    if (numberValue <= 0 || numberValue > 10) {
      setIsInvalid(true)
      return
    }
    if (!Number.isInteger(numberValue)) {
      setIsInvalid(true)
      return
    }
    setIsInvalid(false)
    updateItemCount(name, event.target.value)
  }
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={isInvalid}
          />
        </Col>
      </Form.Group>
    </Col>
  )
}
