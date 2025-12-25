import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
                    <div className="max-w-xl w-full bg-gray-800 p-6 rounded-lg shadow-xl border border-red-500">
                        <h1 className="text-2xl font-bold text-red-500 mb-4">Something went wrong.</h1>
                        <p className="mb-4 text-gray-300">The application crashed with the following error:</p>
                        <pre className="bg-black p-4 rounded overflow-auto text-sm text-red-300 mb-4">
                            {this.state.error && this.state.error.toString()}
                        </pre>
                        <details className="whitespace-pre-wrap text-xs text-gray-500">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </details>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
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

export default ErrorBoundary;
