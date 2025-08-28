export const downloadFile = (srcUrl) => {
	const link = `https://files.snapaper.com/download?filename=${srcUrl}`
	const iframe = document.createElement("iframe")
	iframe.setAttribute("id", new Date().getTime())
	iframe.setAttribute("sandbox", "allow-downloads allow-scripts")
	iframe.setAttribute("style", "display: none")
	iframe.src = link
	document.body.appendChild(iframe)
}
