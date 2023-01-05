import React, { Component } from 'react'
export default class ErrorBoundary extends Component {

  state = {
    error: undefined,
    errorInfo: undefined
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }

  static getDerivedStateFromError(error) {
    console.log(error);
  }

  render() {

    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h1 style={{ color: 'red' }}>出错了</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}