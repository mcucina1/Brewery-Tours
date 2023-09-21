import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Input } from 'reactstrap';
import { FaMap, FaRuler, FaExchangeAlt } from 'react-icons/fa';
import { Container } from 'reactstrap';
import { sendTourRequest } from '../../../hooks/useTour';
import { EARTH_RADIUS_UNITS } from '../../../utils/constants';
import { Place } from '../../../models/place.model';
import { sendDistancesRequest } from '../../../hooks/usePlaces';
import { useToggle } from '../../../hooks/useToggle';
import { DistanceDisplay } from './Itinerary';

export default function TripOptions(props){
	const [newPlaces, setNewPlaces] = useState([]);
	const [newDistances, setNewDistances] = useState([]);
	const [showUnitsPopup, toggleUnitsPopup] = useToggle(false);
	const [customTripName, changeTripName] = useState('');
	const [tripReversed, toggleTripReversed] = useToggle(false);

	return(
		<Modal isOpen={props.isOpen} toggle={props.toggleTripActions} data-testid="trip-popup">
            <TripOptionsHeader toggle={props.toggleTripActions}/>
			<TripOptionsBody toggle={props.toggleTripActions} places={props.places} 
				newPlaces={newPlaces} setNewPlaces={setNewPlaces} setNewDistances={setNewDistances}
				newDistances={newDistances} units={props.units} changeUnits={props.changeUnits}
				showUnitsPopup={showUnitsPopup} toggleUnitsPopup={toggleUnitsPopup} customTripName={customTripName}
				changeTripName={changeTripName} toggleTripReversed={toggleTripReversed} />
			<TripOptionsFooter toggle={props.toggleTripActions} newPlaces={newPlaces} setTripName={props.setTripName}
				setNewDistances={setNewDistances} setNewPlaces={setNewPlaces} replaceAll={props.replaceAll} 
				customTripName={customTripName} changeTripName={changeTripName} tripReversed={tripReversed} />
		</Modal>
	);
}

function TripOptionsHeader(props){
	return(
		<ModalHeader data-testid="trip-and-units-header" toggle={props.toggle}>
            Trip Customization
        </ModalHeader>
	);
}

function TripOptionsBody(props){
	return(
		<ModalBody data-testid="trip-and-units-body" >
			<Table>
				<tr>
					<th>
						<Container>
							<tr>
								<th>
									Shorten Trip
								</th>
							</tr>
							<tr>
								<th>
									<Button
										color='primary'
										data-testid='trip-opt-button'
										onClick={async () => { 
											let earthRadius;
											earthRadius = parseInt(window.localStorage.getItem(props.units));
											const tourResponse = await sendTourRequest(props.places, 1, earthRadius);
											props.setNewPlaces(tourResponse.places);
											const distancesResponse = await sendDistancesRequest(tourResponse.places, earthRadius);
											props.setNewDistances(distancesResponse.distances);
											}}
										><FaMap/>
									</Button>
								</th>
							</tr>
						</Container>
					</th>
					<th>
						<Container>
							<tr>
								<th>
									Change Units
								</th>
							</tr>
							<tr>
								<th>
									<Button
										color='primary'
										data-testid='change-units-button'
										onClick={props.toggleUnitsPopup}
										><FaRuler/>
										<UnitPopup
										isOpen={props.showUnitsPopup} toggle={props.toggleUnitsPopup} changeUnits={props.changeUnits} />
									</Button>
								</th>
							</tr>
						</Container>
					</th>
				</tr>
				<tr>
					<span>Optimized Distance: </span>
					<DistanceDisplay 
						distances={props.newDistances} 
						total={true} 
						start={0}
						row={1} />
				</tr>
				<tr>
					<th>
						<Container>
							<tr>
								<th>
									Rename Trip		
								</th>
							</tr>
							<tr>
								<th>
								<Input
									data-testid='custom-trip-input'
									id='custom-trip-name'
									type="text"
									onChange={ () => {
										let tripName;
										tripName = document.getElementById('custom-trip-name').value;
										props.changeTripName(tripName);
									}}
								/>
								</th>
							</tr>
						</Container>
					</th>
					<th>
						<Container>
							<tr>
								<th>
									Reverse Trip
								</th>
							</tr>
							<tr>
								<th>
									<Button
										color='primary'
										disabled={props.places.length === 0}
										onClick={() => {
											props.setNewPlaces(reversedArray(props.places));
											props.toggleTripReversed();
										}}
									>
										<FaExchangeAlt />
									</Button>
								</th>
							</tr>
						</Container>
					</th>
				</tr>
			</Table>
		</ModalBody>
	);
}

function TripOptionsFooter(props){
	return(
		<ModalFooter data-testid="trip-and-units-footer">
			<Button
                color='primary'
                data-testid='tour-save-button'
				disabled={props.newPlaces.length===0 && !props.customTripName && !props.tripReversed}
                onClick={ async () => {
					let optimizedPlaces = [];
					for(let place in props.newPlaces){
						optimizedPlaces.push(new Place(props.newPlaces[place]));
					}
					if (optimizedPlaces.length > 0) {
						await props.replaceAll(optimizedPlaces);
					}
					props.setNewDistances([]);
					props.setNewPlaces([]);
                    props.toggle();
					props.setTripName(props.customTripName);
					props.changeTripName('');
				}}
            > Save</Button>
			<Button
                color='primary'
                data-testid='tour-cancel-button'
                onClick={ () => {
					props.setNewDistances([]);
					props.setNewPlaces([]);
                    props.toggle();
                }}
            > Cancel</Button>
		</ModalFooter>
	);
}

function UnitPopup(props) {
	return (
		<Modal isOpen={props.isOpen} toggle={props.toggle}>
			<ModalHeader data-testid='change-units-header' toggle={props.toggle}>
				Select Your Desired Unit
			</ModalHeader>
			<ModalBody>
				<Button
					color='primary'
					data-testid='unit-kilometers-button'
					onClick={ () => {
						let name = 'km';
						props.changeUnits(name, EARTH_RADIUS_UNITS[name]);
						props.toggle();
					}}
				> Kilometers</Button>
				&nbsp;
				<Button
					color='primary'
					data-testid='unit-nautical-miles-button'
					onClick={ () => {
						let name = 'NM';
						props.changeUnits(name, EARTH_RADIUS_UNITS[name]);
						props.toggle();
					}}
				> Nautical Miles</Button>
				&nbsp;
				<Button
					color='primary'
					data-testid='unit-miles-button'
					onClick={ () => {
						let name = 'mi';
						props.changeUnits(name, EARTH_RADIUS_UNITS[name]);
						props.toggle();
					}}
				> Miles</Button>
			</ModalBody>
			<ModalFooter data-testid='change-units-footer' toggle={props.toggle}>
				<Input
					data-testid='custom-unit-input'
					id='custom-name'
                    type="text"
					placeholder="Enter Custom Unit"
                />
				<Input
					data-testid='custom-earth-radius'
					id='custom-radius'
					type="number"
					placeholder="Enter Earth Radius"
				/>
				<Button
					color='primary'
					data-testid='unit-add-button'
					onClick={ () => {
						let name, value;
						name = document.getElementById('custom-name').value;
						value = document.getElementById('custom-radius').valueAsNumber;
						props.changeUnits(name, value);
					}}
				> Add</Button>
			</ModalFooter>
		</Modal>
	);
}

function reversedArray(oldArray) {
	// Returns reversed copy of oldArray
	let i, length,newArray;
	length = oldArray.length;
	newArray = [];
	for (i=0; i<length; i++) {
		newArray.push(oldArray[length-1-i]);
	}
	return newArray;
}
