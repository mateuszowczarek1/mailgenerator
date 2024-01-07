/* Get current date */
const today = new Date();
/* Get date + 1 day */
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
console.log(tomorrow);

/* Dates to locale string */

const tomorrowLocale = tomorrow.toLocaleDateString();
const todayLocale = today.toLocaleDateString();

/* Enable copy buttons after generating e-mails */

const buttonEnabler = (selector, attribute) => {
	document.getElementById(selector).removeAttribute(attribute);
};

/* Inject date into work-start e-mail */
const workStartP = document.querySelectorAll(".work-start-date");
workStartP[0].textContent = tomorrow.toLocaleDateString();
workStartP[1].textContent = tomorrow.toLocaleDateString();

/* Inject date into work-end e-mail */
const workEndP = document.querySelectorAll(".work-end-date");
workEndP[0].textContent = today.toLocaleDateString();
workEndP[1].textContent = today.toLocaleDateString();

/* Working with form start*/

const formStart = document.getElementById("inject-form");

formStart.addEventListener("submit", (event) => {
	event.preventDefault();
	const leaderMail = document.getElementsByName("leader-mail-start")[0].value;
	const name = document.getElementsByName("name")[0].value;
	const workStartInput = document.getElementsByName("hour-start")[0].value;

	const workStartMail = document.getElementById("hour-start-mail");
	const nameMail = document.querySelectorAll(".your-name");

	nameMail[0].textContent = name;
	nameMail[1].textContent = name;

	workStartMail.textContent = workStartInput;
	localStorage.setItem(
		"start-mail",
		`Dzień dobry,\ninformuję o rozpoczęciu pracy zdalnej w dniu ${tomorrowLocale} r.\nGodzina rozpoczęcia: ${workStartInput}.\nŁączę wyrazy szacunku,\n${name}`
	);
	const sendLinkStart = document.getElementById("send-link-start");

	sendLinkStart.innerHTML = `<a href="https://mail.google.com/mail/u/1/?view=cm&fs=1&to=${leaderMail}&su=Rozpoczęcie Pracy Zdalnej - ${tomorrowLocale} r. - ${name}&body=${encodeURIComponent(
		`Dzień dobry,\ninformuję o rozpoczęciu pracy zdalnej w dniu ${tomorrowLocale} r.\nGodzina rozpoczęcia: ${workStartInput}.\nŁączę wyrazy szacunku,\n${name}`
	)}" type="button" class="btn btn-success">Wyślij e-mail</a>
  `;
	buttonEnabler("button-copy-start", "disabled");
});

/* Working with form end */
const formEnd = document.getElementById("inject-form-end");
formEnd.addEventListener("submit", (event) => {
	event.preventDefault();
	const leaderMail = document.getElementsByName("leader-mail-end")[0].value;
	const workStartInput = document.getElementsByName("hour-end")[0].value;
	const name = document.getElementsByName("name-end")[0].value;
	const nameMail = document.querySelectorAll(".your-name-end");

	const workStartMail = document.getElementById("hour-end-mail");
	const conversionMail = document.getElementById("conversion");
	const conversion = document.getElementsByName("conversion")[0].value;

	nameMail[0].textContent = name;
	nameMail[1].textContent = name;
	workStartMail.textContent = workStartInput;
	conversionMail.innerHTML = `Konwersja: ${conversion} <br>`;
	localStorage.setItem(
		"end-mail",
		`Dzień dobry,\ninformuję o zakończeniu pracy zdalnej w dniu ${todayLocale} r.\nGodziny pracy: ${workStartInput}.\nKonwersja: ${conversion}\nŁączę wyrazy szacunku,\n${name}`
	);
	const sendLinkEnd = document.getElementById("send-link-end");
	sendLinkEnd.innerHTML = `<a href="https://mail.google.com/mail/u/1/?view=cm&fs=1&to=${leaderMail}&su=Zakończenie Pracy Zdalnej - ${todayLocale} r. - ${name}&body=${encodeURIComponent(
		`Dzień dobry,\ninformuję o zakończeniu pracy zdalnej w dniu ${todayLocale} r.\nGodziny pracy: ${workStartInput}.\nKonwersja: ${conversion}\nŁączę wyrazy szacunku,\n${name}`
	)}" type="button" class="btn btn-success">Wyślij e-mail</a>
  `;
	buttonEnabler("button-copy-end", "disabled");
});
