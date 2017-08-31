window.addEventListener('load', function() {
	console.log( "editing!" );
    var editor;

    editor = ContentTools.EditorApp.get();
	editor.init('*[data-editable]', 'data-name');
});