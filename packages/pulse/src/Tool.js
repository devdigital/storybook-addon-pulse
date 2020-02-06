/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState, useEffect } from 'react'
import { Icons, IconButton } from '@storybook/components'
import { STORY_CHANGED } from '@storybook/core-events'

const PulseIcon = ({ ...props }) => (
  <svg {...props} viewBox="0 0 1024 1024">
    <polyline
      points="96 640 224 640 352 128 480 896 608 448 672 640 800 640"
      style={{
        fill: 'none',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '64px',
      }}
    />
    <circle
      cx="864"
      cy="640"
      r="64"
      style={{
        fill: 'none',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '64px',
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
    >
      <PulseIcon
        css={{
          stroke: enabled ? 'currentColor' : '#eee',
          cursor: enabled ? 'pointer' : 'not-allowed',
        }}
      />
    </IconButton>
  )
}

Tool.defaultProps = {
  api: null,
  channel: null,
}
