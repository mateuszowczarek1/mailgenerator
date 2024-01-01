const prevNotes = localStorage.getItem('notes');
prevNotes ?? localStorage.setItem('notes', '');
const saveNote = document.getElementById('save-note')
const deleteNote = document.getElementById('delete-note')
const noteTextArea = document.getElementById('notes-textarea');
const noteParagraph = document.getElementById('notes')

function showNote(){
	noteParagraph.textContent = localStorage.getItem('notes');
}

saveNote.addEventListener('click', e => {
	e.preventDefault();
	const trimmedNote = noteTextArea.value.trim();
	localStorage.setItem('notes',  trimmedNote);
	showNote()

})

deleteNote.addEventListener('click', e => {
	e.preventDefault();
localStorage.setItem('notes', '');
noteParagraph.textContent = '';
noteTextArea.value = 'Wpisz tekst, który chcesz zachować';
})



export {showNote};