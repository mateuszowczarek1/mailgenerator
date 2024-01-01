localStorage.getItem('conversion-table') ?? localStorage.setItem('conversion-table', JSON.stringify([]))
let conversionTimeArray = JSON.parse(localStorage.getItem('conversion-table'));
let conversionTimeSum = '';

function addConversionTime(value) {
const valuetoNumber = Number(value);

	if(typeof valuetoNumber !== 'number' || value < 0 || isNaN(value)){
		return 'Podaj datę, a nie jakieś coś dziwnego!'
	}
conversionTimeArray.push(valuetoNumber);
localStorage.setItem('conversion-table', JSON.stringify(conversionTimeArray))
return 'Dodano'
}

function showSumOfAllConversionTimes() {
	if(conversionTimeArray.length > 0){
		const sumMinutes = conversionTimeArray.reduce((prev, curr) => prev + curr);		
		const date = new Date(0);
		date.setMinutes(sumMinutes)
		conversionSumSpan.textContent = conversionTimeSum;
			conversionMailInput.value = conversionTimeSum;
		return conversionTimeSum = date.toLocaleTimeString('pl-PL', {timeZone: 'UTC'})
	}
return '';
}


const addMinutesForm = document.getElementById('add-minutes-form')
const addMinutesFormInput = document.getElementById('add-minutes-input');
const conversionSumSpan = document.getElementById('conversion-sum-span');
const conversionMailInput = document.getElementById('conversion-mail-input');
const resetButton = document.getElementById('reset-button');
addMinutesForm.addEventListener('submit', (event) => {
	event.preventDefault();
	addConversionTime(addMinutesFormInput.value)
	console.log(conversionTimeArray);
	addMinutesFormInput.value = 0;
	showSumOfAllConversionTimes();
	conversionSumSpan.textContent = conversionTimeSum;
	conversionMailInput.value = conversionTimeSum;

})

resetButton.addEventListener('click', e => {
  e.preventDefault();
  localStorage.setItem('conversion-table', JSON.stringify([]));
	conversionSumSpan.textContent = '';
	conversionMailInput.value = [];
	conversionTimeArray = [];
})

showSumOfAllConversionTimes();
conversionMailInput.value = conversionTimeSum;
conversionSumSpan.textContent = conversionTimeSum