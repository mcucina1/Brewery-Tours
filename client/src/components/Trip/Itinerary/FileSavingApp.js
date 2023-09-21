import React from 'react';
import { Button } from 'reactstrap';
import { isJsonResponseValid } from '../../../utils/restfulAPI';
import * as tripFileSchema from '../../../../schemas/TripFile';
import { EARTH_RADIUS_UNITS } from '../../../utils/constants.js';

const MIME_TYPE = {
	JSON: "application/json"
	// Commented out as not yet implemented
	// CSV: "text/csv",
	// SVG: "image/svg+xml",
	// KML: "application/vnd.google-earth.kml+xml"
};
  
export default function FileSavingApp(props) {
	const tripName = props.tripName;
	function handleJSONSave() {
	  const tripJSON = buildTripJSON(props.places, props.distances, props.units);
	  const fileName = tripName.replace(/ /g, "_").toLowerCase();
	  downloadFile(fileName + ".json", MIME_TYPE.JSON, tripJSON);
	}
	return (
		<Button 
			color='primary' onClick={ () => { handleJSONSave(); props.toggle() }} >
			Save Trip
		</Button>
	);
}
  
  
function downloadFile(fileNameWithExtension, mimeType, fileText) {
	const file = new Blob([fileText], { type: mimeType });
	const link = document.createElement("a");
	const url = URL.createObjectURL(file);
	link.href = url;
	link.download = fileNameWithExtension;
	document.body.appendChild(link);
	link.click();
	setTimeout(function() {
	  document.body.removeChild(link);
	  window.URL.revokeObjectURL(url);
	}, 0);
}
  
  
function buildTripJSON(places, distances, units) {
    let tripString = '{ "units": "' + units + '",'
                        + '"distances":' + JSON.stringify(distances) + ','
                        + '"places":' + JSON.stringify(places) + ','
                        + '"earthRadius":' + EARTH_RADIUS_UNITS[units] + '}';
    let tripJSON = JSON.parse(tripString);
    if(isJsonResponseValid(tripJSON, tripFileSchema)) {
        return JSON.stringify(tripJSON, null, 2);
    } else{
        LOG.error(JSON.stringify(tripJSON, null, 2) + " is not a valid json file according to the Schema");
    }
}