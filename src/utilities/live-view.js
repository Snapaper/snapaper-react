export const liveView = (url) => {
	window.open(
		url,
		"_blank",
		"top=0,left=100,width=700,height=750,scrollbars=no,toolbar=no, menubar=no, location=no, status=no"
	).location;
};
