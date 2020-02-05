import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icons, IconButton } from '@storybook/components'
import { STORY_CHANGED } from '@storybook/core-events'

export class Tool extends Component {
  static propTypes = {
    api: PropTypes.shape({
      getQueryParam: PropTypes.func,
      setQueryParams: PropTypes.func,
    }).isRequired,
    channel: PropTypes.shape({
      emit: PropTypes.func,
      on: PropTypes.func,
      removeListener: PropTypes.func,
    }),
  }

  static defaultProps = {
    channel: undefined,
  }

  constructor(props) {
    super(props)

    this.state = {
      mode: 'paused',
    }

    this.setMode = this.setMode.bind(this)
  }

  componentDidMount() {
    const { channel } = this.props

    // channel.on('pulse/reset', () => {
    //   this.setState('paused', () =>
    //     this.channel.emit('pulse/change-mode', 'paused')
    //   )
    // })

    channel.on(STORY_CHANGED, () => this.setMode('paused'))
  }

  setMode(mode) {
    this.setState({ mode }, () => {
      this.props.channel.emit('pulse/change-mode', mode)
    })
  }

  render() {
    return (
      <IconButton
        key="control"
        title={this.state.mode === 'paused' ? 'Play' : 'Pause'}
        onClick={() =>
          this.setMode(this.state.mode === 'paused' ? 'playing' : 'paused')
        }
        mode={this.state.mode}
      >
        <Icons icon={this.state.mode === 'paused' ? 'arrowright' : 'cross'} />
      </IconButton>
    )
  }
}
