import React from 'react'
import { withPulse } from 'storybook-addon-pulse'
import Component from './Component'

export default {
  title: 'Pulse',
  decorators: [withPulse],
}

export const withPulseDecorator = () => <Component title="Pulse" />
