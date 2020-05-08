/* 
	Script Name: Photoshop Layers Unique Name Batch Export
	Author: Niccolò Agnoletti
	Website: blazardsky.space
	Github: @noiwyr
	Description: Rename the selected layer to a random unique name and exports it as a PNG to make sure you won't overwrite any layer.
	Disclaimer: The script is distributed "as is", with no warranty expressed or implied, and no guarantee for accuracy or applicability to any purpose. 
				Backup your files before use. In no case can the Author be held responsible for any direct or indirect damage. Use at your own risk.
*/

// ---- Setup
// In case it is opened outside ps
#target photoshop
app.bringToFront();

origDialogs = app.displayDialogs;
//app.displayDialogs = DialogModes.ALL;

const doc = app.activeDocument;
//	  doc.save();
app.displayDialogs = DialogModes.NO;

function getName(n){
	var d = new Date();
	var randomName = (d.getYear()-100) + '' + d.getMonth() + '' + d.getDay() + '_' + n + '_' + d.getHours() + '' + d.getMinutes() + '' + d.getSeconds() + d.getMilliseconds();
	return randomName;
}


// ---- Main
if (!documents.length) {
	
	alert('There are no documents open.', 'No Document') 
	
} else {
	
	var docName = doc.name.slice(0, doc.name.lastIndexOf('.'));
	
	// Create and/or setup a folder named after the document
	var folderPath = doc.path + '\\' + docName;
	var folder = new Folder(folderPath);
	if (!folder.exists) { folder.create(); }
	
	try {
				
		// Put the Export group on top
		const forExport = doc.layerSets.getByName("export");
			  forExport.visible = true;
			  forExport.opacity = 100;
			  forExport.move(doc.layers[0],ElementPlacement.PLACEBEFORE);
		var groupLen = forExport.layers.length;
		
		// Turn all of the elements inside export invisible
		for (var j = 0; j < groupLen; j++) {
			forExport.layers[j].visible = false;
		}
		
		// Export each element in "export" group as an image with a random name
		for (var i = 0; i < groupLen; i++) {
			forExport.layers[i].visible = true;
			var outputName = getName(groupLen-i); //Export in reverse order
			forExport.layers[i].name = outputName;
			// Setup of the export options
			var exportOptions = new ExportOptionsSaveForWeb; 
				exportOptions.format = SaveDocumentType.PNG; 
				exportOptions.PNG8 = false;
				exportOptions.transparency = true; 
				exportOptions.interlaced = false; 
				exportOptions.quality = 80;
			doc.exportDocument(new File((folderPath+'\\'+outputName + ".png")),ExportType.SAVEFORWEB,exportOptions);
			forExport.layers[i].visible = false;
		}
		for (var k = 0; k < groupLen; k++) {
			forExport.layers[k].visible = true;
		}
		alert("done");
	} catch(e) {
		if (e == "Error: No such element") {
			alert("You were missing the group \"export\". Add all the layers you want to export in it.","Missing group");
			doc.layerSets.add();
			doc.layerSets[0].name = "export";
		} else {
			alert(e);
		}
	}
}

app.displayDialogs = origDialogs;
// Done.
