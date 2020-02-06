import React from 'react'
import { withPulse } from 'storybook-addon-pulse'
import Component from './Component'

export default {
  title: 'Pulse',
  decorators: [withPulse({ timeInSeconds: 1 })],
}

export const withPulseOptions = () => <Component title="Pulse Options" />
