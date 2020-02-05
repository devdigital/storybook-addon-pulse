import React from 'react'

export default {
  title: 'No Pulse',
}

export const withNoPulseDecorator = () => (
  <div style={{ backgroundColor: '#f00' }}>
    <p>No Pulse</p>
  </div>
)
