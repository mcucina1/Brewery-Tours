import React, { useState } from 'react';
import {
	Modal,
	ModalHeader,
	ModalFooter,
	Button
} from 'reactstrap';
import FileSavingApp from './FileSavingApp';
import FileLoaderApp from './FileLoaderApp';


export default function LoadSaveTrip(props) {
	
	return (
        <Modal isOpen={props.isOpen} toggle={props.toggle} data-testid='save-trip-modal'>
            <SaveTripHeader toggle={props.toggle} />
            <SaveTripFooter places={props.places} distances={props.distances} units={props.units} toggle={props.toggle}
			replaceAll={props.replaceAll} tripName={props.tripName} setTripName={props.setTripName} />
        </Modal>
    );
}

function SaveTripHeader(props) {
	return (
		<ModalHeader data-testid='save-trip-header' toggle={props.toggle}>
            Upload and Save Trip
        </ModalHeader>
	);
}

function SaveTripFooter(props) {
	const [placesArr, setPlacesArr] = useState([]);
	const [fileName, setFileName] = useState('');
	return (
		<ModalFooter data-testid='save-trip-footer'>
			<FileLoaderApp setPlacesArr={setPlacesArr} setFileName={setFileName}/>
			<Button
				color='primary'
				onClick={() => {
					document.getElementById("fileLoader").click();
				}}
				data-testid='upload-file-button'
			> Upload
			</Button>
			<Button
				color='primary'
				onClick={async () => {
					await props.replaceAll(placesArr);
					props.setTripName(fileName);
					props.toggleUploadFile();
				}}
			> Confirm Upload
			</Button>
            <FileSavingApp places={props.places} distances={props.distances}
				tripName={props.tripName} units={props.units} toggle={props.toggle}/>
			<Button
			color='primary'
                data-testid='save-cancel-button'
                onClick={ () => {
					props.toggle();
                }} 
			>Cancel
			</Button>
        </ModalFooter>
	);
}
