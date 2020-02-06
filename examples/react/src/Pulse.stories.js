import React from 'react'
import { withPulse } from 'storybook-addon-pulse'

export default {
  title: 'Pulse',
  decorators: [withPulse],
}

export const withPulseDecorator = () => (
  <div style={{ backgroundColor: '#f00' }}>
    <p>Pulse</p>
  </div>
)
