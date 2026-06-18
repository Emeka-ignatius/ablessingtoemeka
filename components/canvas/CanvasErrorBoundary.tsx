'use client';
import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class CanvasErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('CanvasErrorBoundary caught:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="fixed inset-0 w-full h-full z-0 bg-space-black flex flex-col items-center justify-center p-4">
          <div className="text-center max-w-md bg-space-black/90 border border-space-rose/30 p-8 rounded-2xl backdrop-blur-md shadow-2xl">
            <p className="text-space-rose text-lg font-serif italic mb-3">3D Scene Error</p>
            <p className="text-xs text-space-gold-light leading-relaxed mb-4">
              The 3D graphics context could not be initialized.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 border border-space-gold/40 text-space-gold hover:bg-space-gold/10 text-xs font-semibold tracking-wider uppercase rounded-lg cursor-pointer transition-all"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
