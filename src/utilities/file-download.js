export const downloadFile = (srcUrl) => {
	// PapaCambridge answers this endpoint with Content-Disposition: attachment,
	// so the hidden iframe saves the file instead of displaying it.
	const link = `https://pastpapers.papacambridge.com/download_file.php?files=${srcUrl}`
	const iframe = document.createElement("iframe")
	iframe.setAttribute("id", new Date().getTime())
	iframe.setAttribute("sandbox", "allow-downloads allow-scripts")
	iframe.setAttribute("style", "display: none")
	iframe.src = link
	document.body.appendChild(iframe)
}
