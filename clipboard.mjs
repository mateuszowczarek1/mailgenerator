import * as clipboard from "https://unpkg.com/clipboard-polyfill@4.0.1/dist/es6/clipboard-polyfill.es6.js";
console.log(clipboard);

const startMail = localStorage.getItem("start-mail");
const endMail = localStorage.getItem("end-mail");

const copyInfo = (selector, text) => {
	const par = document.getElementById(selector);
	par.innerText = text;
	setTimeout(() => {
		par.innerText = "";
	}, 4000);
};

export function copyToClipboard(mailVersion) {
	switch (mailVersion) {
		case "end-mail":
			const copyEndMail = localStorage.getItem("end-mail");
			clipboard.writeText(copyEndMail);
			copyInfo("p-end", "Skopiowano do schowka.");

			break;
		case "start-mail":
			const copyStartMail = localStorage.getItem("start-mail");
			clipboard.writeText(copyStartMail);
			copyInfo("p-start", "Skopiowano do schowka.");
			break;
		default:
			console.error(`Something went wrong, try again later.`);
	}
}

document.getElementById("button-copy-start").addEventListener("click", () => {
    copyToClipboard("start-mail");
});

document.getElementById("button-copy-end").addEventListener("click", () => {
    copyToClipboard("end-mail");
});