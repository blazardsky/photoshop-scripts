/* 
	Script Name: Crop to Doc
	Version: 1.0
	Date: 10 May 2020
	Author: Niccolò Agnoletti
	Website: http://blazardsky.space
	Github: https://github.com/blazardsky/photoshop-scripts/
	Description: Crop all the layers inside "crop" group bigger than the document to the document size.
	Disclaimer: The script is distributed "as is", with no warranty expressed or implied, and no guarantee for accuracy or applicability to any purpose. 
		    Backup your files before use. In no case can the Author be held responsible for any direct or indirect damage. Use at your own risk.
*/

// ---- Setup
// In case it is opened outside ps
#target photoshop
app.bringToFront();

// Save the current preferences
var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
var startDisplayDialogs = app.displayDialogs;

// Set Photoshop to use pixels and display no dialogs
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.displayDialogs = DialogModes.ERROR;


// Convert to smart Object the current active layer
function convertToSmartObject() {	

	var idnewPlacedLayer = stringIDToTypeID( "newPlacedLayer" );
	executeAction( idnewPlacedLayer, undefined, DialogModes.NO );

	return;
}


// ---- Main
if (!documents.length) {
	
	alert('There are no documents open.', 'No Document');
	
} else {
	
	alert('Wait until I am done.', 'Click OK');
	
	const doc = app.activeDocument;
	const h = doc.height.value, w = doc.width.value;
	const docSize = Array(
		Array(0,0), // left
		Array(0,h), // top
		Array(w,h), // right
		Array(w,0)  // bottom
	);

	try {
		
		const cropGroup = doc.layerSets.getByName("crop");
			  cropGroup.visible = true;
			  cropGroup.opacity = 100;
			  cropGroup.move(doc.layers[0],ElementPlacement.PLACEBEFORE);
		var groupLen = cropGroup.layers.length;
		
		// Crop each element in "crop" group
		for (var i = 0; i < groupLen; i++) {

			cropGroup.layers[i].visible = true;
			doc.activeLayer = cropGroup.layers[i];
			convertToSmartObject(); // In case the current active layer already has a mask
			
			// New selection
			doc.selection.select(docSize, SelectionType.REPLACE, 0, false);

			// Create Layer Mask
			var idMk = charIDToTypeID( "Mk  " );
			var descMSK = new ActionDescriptor();
			var idNw = charIDToTypeID( "Nw  " );
			var idChnl = charIDToTypeID( "Chnl" );
			descMSK.putClass( idNw, idChnl );
			var idAt = charIDToTypeID( "At  " );
			var refMSK = new ActionReference();
			var idMsk = charIDToTypeID( "Msk " );
			refMSK.putEnumerated( idChnl, idChnl, idMsk );
			descMSK.putReference( idAt, refMSK );
			var idUsng = charIDToTypeID( "Usng" );
			var idUsrM = charIDToTypeID( "UsrM" );
			var idRvlS = charIDToTypeID( "RvlS" );
			descMSK.putEnumerated( idUsng, idUsrM, idRvlS );
			executeAction( idMk, descMSK, DialogModes.NO );
			
			// Apply mask
			convertToSmartObject();

		}
		
		alert("Done cropping.","Script finished");
		
	} catch(e) {
		
		if (e == "Error: No such element") {
			alert("You were missing the group \"crop\". Add all the layers you want to crop in it.","Missing group");
			doc.layerSets.add();
			doc.layerSets[0].name = "crop";
		} else { alert(e); }
		
	}
}

// Reset original preferences
app.preferences.rulerUnits = startRulerUnits;
app.preferences.typeUnits = startTypeUnits;
app.displayDialogs = startDisplayDialogs;


// Done.
