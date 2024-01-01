const refreshPage = () => {
	console.info('Started measuring time...')
const getStartDay = new Date().getDay();
setInterval(() => {
	if (new Date().getDay() !== getStartDay){
		location.reload('/');
	}
	console.log('Ten minutes has passed...')
}, 1000 * 60 * 10)
}

export default refreshPage;