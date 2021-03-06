import * as React from 'react'
import { Form, Button, Popover, OverlayTrigger } from 'react-bootstrap'

export default function SummaryForm({ setOrderPhase }) {
  const [checked, setChecked] = React.useState(false)
  function handleSubmit(event) {
    event.preventDefault()

    // pass along to the next phase.
    // The next page will handle submitting order from context.
    setOrderPhase('complete')
  }
  const popover = (
    <Popover id="terms-popover">
      <Popover.Content>No ice cream will actually be delivered</Popover.Content>
    </Popover>
  )
  const label = (
    <span>
      I agree to{' '}
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  )

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={checked}
          label={label}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!checked}>
        Confirm Order
      </Button>
    </Form>
  )
}
