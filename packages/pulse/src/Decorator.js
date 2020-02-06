import React, { useState, useEffect } from 'react'
import { addons, makeDecorator } from '@storybook/addons'
import { Pulse } from './Pulse'

const Decorator = ({ story, options }) => {
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

  const defaultOptions = {
    minWidth: '300px',
    maxWidth: '100%',
    timeInSeconds: 3,
  }

  return (
    <Pulse mode={mode} {...Object.assign({}, defaultOptions, options)}>
      {currentStory}
    </Pulse>
  )
}

export const withPulse = makeDecorator({
  name: 'withPulse',
  parameterName: 'pulse',
  wrapper: (getStory, context, { options }) => {
    return <Decorator story={getStory(context)} options={options} />
  },
})
