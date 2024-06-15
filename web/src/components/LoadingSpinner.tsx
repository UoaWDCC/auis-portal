const LoadingSpinner = () => {
  return (
    <div
      data-testid="loading-spinner"
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-50 z-50"
    >
      <div className="border-gray-300 h-32 w-32 animate-spin rounded-full border-8 border-t-[#0B7EF5]" />
    </div>
  );
};

export default LoadingSpinner;
