/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState, useEffect } from 'react'
import { IconButton } from '@storybook/components'
import { STORY_CHANGED } from '@storybook/core-events'

const PulseIcon = ({ ...props }) => (
  <svg {...props} viewBox="0 0 1024 1024">
    <polyline
      points="96 760 224 760 352 248 480 1016 608 568 672 760 800 760"
      style={{
        fill: 'none',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '64px',
      }}
    />
    <circle
      cx="864"
      cy="760"
      r="64"
      style={{
        fill: 'none',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '64px',
      }}
    />
  </svg>
)

export const Tool = ({ channel }) => {
  const [mode, setMode] = useState('paused')
  const [enabled, setEnabled] = useState(false)

  const setAndEmitMode = mode => {
    if (!enabled) {
      return
    }

    setMode(mode)
    channel.emit('pulse/change-mode', mode)
  }

  useEffect(() => {
    channel.on(STORY_CHANGED, () => {
      setMode('paused')
      setEnabled(false)
    })

    channel.on('pulse/change-enabled', enabled => {
      setEnabled(enabled)
    })
  }, [channel])

  const isPaused = mode === 'paused'
  return (
    <IconButton
      key="pulse-control"
      title={isPaused ? 'Pulse - Play' : 'Pulse - Pause'}
      onClick={() => setAndEmitMode(isPaused ? 'playing' : 'paused')}
      mode={mode}
      active={!isPaused}
      css={{
        cursor: enabled ? 'pointer' : 'not-allowed',
      }}
    >
      <PulseIcon
        css={{
          stroke: enabled ? 'currentColor' : '#eee',
        }}
      />
    </IconButton>
  )
}

Tool.defaultProps = {
  api: null,
  channel: null,
}
