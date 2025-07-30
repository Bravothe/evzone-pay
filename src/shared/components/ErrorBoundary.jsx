// src/shared/components/ErrorBoundary.jsx
import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) { console.error(err, info); }
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please reload.</div>;
    }
    return this.props.children;
  }
}
