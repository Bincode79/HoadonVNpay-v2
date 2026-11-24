import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#F5F6FA] p-8">
          <div className="max-w-md text-center">
            <h1 className="mb-4 text-2xl font-bold text-[#1a3a6b]">Đã xảy ra lỗi</h1>
            <p className="mb-6 text-sm text-[#5A6A7A]">
              Ứng dụng gặp sự cố. Vui lòng thử lại sau.
            </p>
            <pre className="mb-6 max-h-32 overflow-auto rounded-lg bg-[#F8FAFC] p-4 text-left text-xs text-[#7A8A9A]">
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="rounded-md bg-[#1a3a6b] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#163258] transition-all"
            >
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}