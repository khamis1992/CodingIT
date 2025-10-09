// Error Debug Helper
// Add this to your browser console to catch all JavaScript errors

window.addEventListener('error', function(e) {
  console.log('🚨 JavaScript Error Caught:', {
    message: e.message,
    filename: e.filename,
    lineno: e.lineno,
    colno: e.colno,
    error: e.error,
    stack: e.error ? e.error.stack : 'No stack trace'
  });
});

window.addEventListener('unhandledrejection', function(e) {
  console.log('🚨 Unhandled Promise Rejection:', {
    reason: e.reason,
    promise: e.promise
  });
});

console.log('🔍 Error debugging enabled. Any JavaScript errors will be logged with full details.');