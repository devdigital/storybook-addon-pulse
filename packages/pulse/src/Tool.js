import React, { useState, useEffect } from 'react'
import { Icons, IconButton } from '@storybook/components'
import { STORY_CHANGED } from '@storybook/core-events'

export const Tool = ({ channel }) => {
  const [mode, setMode] = useState('paused')

  const setAndEmitMode = mode => {
    setMode(mode)
    channel.emit('pulse/change-mode', mode)
  }

  useEffect(() => {
    channel.on(STORY_CHANGED, () => setMode('paused'))
  }, [channel])

  return (
    <IconButton
      key="pulse-control"
      title={mode === 'paused' ? 'Play' : 'Pause'}
      onClick={() => setAndEmitMode(mode === 'paused' ? 'playing' : 'paused')}
      mode={mode}
    >
      <Icons icon={mode === 'paused' ? 'arrowright' : 'cross'} />
    </IconButton>
  )
}

Tool.defaultProps = {
  api: null,
  channel: null,
}
