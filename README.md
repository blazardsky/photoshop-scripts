# photoshop-scripts
Scripts to automate some common processes in photoshop.


**BASIC INFORMATIONS:**

**Where to install scripts?**
- On windows copy the files to:
  *C:\Program Files\Adobe\Adobe Photoshop CC 20XX\Presets\Scripts*
- On macOs:
  *Applications > Photoshop CC > Presets > Scripts*


**How to create shortcuts for the scripts?**

Create an action where you start the script (*File > Scripts > Browse* ... Locate and start the file)


**BASIC INFORMATIONS:**
These scripts need a little setup before you can use 'em:

**Unique Name Generator & Batch Export**

Setup: Create a group, name it *export* and add all the layers you want to export inside it.
Action: The script will rename all those layers with a unique sequential name and export them inside a folder with the same name of the psd, in the same directory of that file.

**Crop to Doc**

Setup: create a group, name it *crop* and add all the layers you want to crop inside it. 
Action: The script will create a layer mask for all those layers with the document size, then they will be converted to smart objects to apply the layer mask.
