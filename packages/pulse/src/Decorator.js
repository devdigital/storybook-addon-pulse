import React, { useState, useEffect } from 'react'
import { addons, makeDecorator } from '@storybook/addons'
import { STORY_CHANGED } from '@storybook/core-events'
import { Pulse } from './Pulse'

const Decorator = ({ story }) => {
  const [mode, setMode] = useState('paused')
  const [currentStory] = useState(story)
  const [channel] = useState(addons.getChannel())

  useEffect(() => {
    //channel.emit('pulse/check-status')

    const handleModeChange = mode => {
      setMode(mode)
    }

    const handleStoryChange = () => {
      channel.emit('pulse/reset')
    }

    channel.on('pulse/change-mode', handleModeChange)
    channel.on(STORY_CHANGED, handleStoryChange)

    return () => {
      channel.removeListener('pulse/change-mode', handleModeChange)
      channel.removeListener('STORY_CHANGED', handleStoryChange)
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
