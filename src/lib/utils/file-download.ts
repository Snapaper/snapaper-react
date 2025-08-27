export const downloadFile = (srcUrl: string): void => {
  const link = `https://files.snapaper.com/download?filename=${srcUrl}`;
  const iframe = document.createElement('iframe');
  iframe.setAttribute('id', new Date().getTime().toString());
  iframe.setAttribute('sandbox', 'allow-downloads allow-scripts');
  iframe.setAttribute('style', 'display: none');
  iframe.src = link;
  document.body.appendChild(iframe);
  
  // Clean up iframe after download
  setTimeout(() => {
    iframe.remove();
  }, 5000);
};