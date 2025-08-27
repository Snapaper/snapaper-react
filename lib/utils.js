export const formatSubjectNameURL = (input) => {
  // Convert the input string to lowercase
  let result = input.toLowerCase();

  // Remove special characters
  result = result.replace('amp;', '');

  // Replace spaces with hyphens
  result = result.replace(/\s+/g, '-');

  // Find content inside parentheses and replace spaces within them
  result = result.replace(/\(([^)]+)\)/g, (match, p1) => `(${p1.replace(/\s+/g, '-')})`);

  // Convert back "as" to "AS" in the right context
  result = result.replace(/as-level/g, 'AS-level');
  result = result.replace(/a-level/g, 'A-level');

  return result;
};

export const downloadFile = (srcUrl) => {
  const link = `https://files.snapaper.com/download?filename=${srcUrl}`;
  const iframe = document.createElement('iframe');
  iframe.setAttribute('id', new Date().getTime().toString());
  iframe.setAttribute('sandbox', 'allow-downloads allow-scripts');
  iframe.setAttribute('style', 'display: none');
  iframe.src = link;
  document.body.appendChild(iframe);
};

export const liveView = (url) => {
  window.open(
    url,
    '_blank',
    'top=0,left=100,width=700,height=750,scrollbars=no,toolbar=no, menubar=no, location=no, status=no'
  ).location;
};