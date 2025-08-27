export const liveView = (url: string): void => {
  const viewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url)}`;
  window.open(viewerUrl, '_blank', 'noopener,noreferrer');
};