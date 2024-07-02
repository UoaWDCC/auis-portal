const LoadingSpinner = () => {
  return (
    <div
      data-testid="loading-spinner"
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-200 bg-opacity-50"
    >
      <div className="h-32 w-32 animate-spin rounded-full border-8 border-gray-300 border-t-[#0B7EF5]" />
    </div>
  );
};

export default LoadingSpinner;
