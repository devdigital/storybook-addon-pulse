import React, { useState, useEffect } from 'react'
import { addons, makeDecorator } from '@storybook/addons'
import { Pulse } from './Pulse'

const Decorator = ({ story }) => {
  const [mode, setMode] = useState('paused')
  const [currentStory] = useState(story)
  const [channel] = useState(addons.getChannel())

  useEffect(() => {
    const handleModeChange = mode => {
      setMode(mode)
    }

    channel.on('pulse/change-mode', handleModeChange)

    channel.emit('pulse/change-enabled', true)

    return () => {
      channel.removeListener('pulse/change-mode', handleModeChange)
    }
  }, [])

  return <Pulse mode={mode}>{currentStory}</Pulse> // TODO: options
}

export const withPulse = makeDecorator({
  name: 'withPulse',
  parameterName: 'pulse',
  wrapper: (getStory, context, { options }) => {
    return <Decorator story={getStory(context)} /> // TODO: options
  },
})
