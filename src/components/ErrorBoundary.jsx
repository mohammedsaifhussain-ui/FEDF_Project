// ErrorBoundary.jsx
// WHY CLASS COMPONENT: React only supports error boundaries
// as class components — this is the ONE exception in the project.
// It catches any JavaScript error in its child tree and shows
// FallbackUI instead of a blank/crashed screen.

import { Component } from "react";
import FallbackUI from "./FallbackUI";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Called when a child throws an error
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Optional: log the error
  componentDidCatch(error, info) {
    console.error("FitFlow Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackUI error={this.state.error} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
