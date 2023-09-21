import React from 'react';
import { useToggle } from '../../../hooks/useToggle';
import { Table, Collapse } from 'reactstrap';
import { ItineraryActionsDropdown, PlaceActionsDropdown } from './actions.js';
import { latLngToText, placeToLatLng } from '../../../utils/transformers';
import AddPlace from './AddPlace';
import LoadSaveTrip from './LoadSaveTrip';
import FindPopup from './FindPopup';
import TripOptions from './TripUnitsPopup';
import { FaExchangeAlt } from 'react-icons/fa';

export default function Itinerary(props) {
    function tripIsEmpty() {
        return !props.places || props.places.length === 0;
    }
    return (
		<div>
			<Table responsive>
				<TripHeader 
					placeActions={props.placeActions} 
					disableRemoveAll={tripIsEmpty()} 
					distances={props.distances} setTripName={props.setTripName}
					units={props.units} places={props.places} tripName={props.tripName} />
				<ColumnLabels placeActions={props.placeActions} places={props.places} units={props.units} setTripName={props.setTripName} />
				<PlaceList places={props.places} placeActions={props.placeActions} selectedIndex={props.selectedIndex} distances={props.distances}/>
			</Table>
		</div>
        
    );
}

function TripHeader(props) {
	const [showAddPlace, toggleAddPlace] = useToggle(false);
	const [showUpload, toggleUpload] = useToggle(false);
	const [showFindActions, toggleFind] = useToggle(false);
    return (
		<React.Fragment>
			<thead>
				<tr>
					<th className='trip-header-title'>{props.tripName}</th>
					<th>
						<DistanceDisplay 
						data-testid={`total-distance-display-${props.index}`}
						distances={props.distances}
						total={true}
						start={0} 
						/>
					</th>
					<th>{props.units}</th>
					<th className='trip-header-actions'>
						<ItineraryActionsDropdown placeActions={props.placeActions} disableRemoveAll={props.disableRemoveAll}
						 toggleAddPlace={toggleAddPlace} toggleUploadFile={toggleUpload} toggleFindActions={toggleFind} setTripName={props.setTripName} />
					</th>
				</tr>
			</thead>
			<AddPlace isOpen={showAddPlace} toggleAddPlace={toggleAddPlace} append={props.placeActions.append}/>
			<LoadSaveTrip isOpen={showUpload} toggle={toggleUpload} replaceAll={props.placeActions.replaceAll} setTripName={props.setTripName}
			places={props.places} distances={props.distances} units={props.units} tripName={props.tripName} data-testid='save-trip-button'/>
			<FindPopup isOpen={showFindActions} toggleFindActions={toggleFind} appendMultiple={props.placeActions.appendMultiple}/>
		</React.Fragment>
    );
}

function ColumnLabels(props) {
	const [showTripActions, toggleTripActions] = useToggle(false);
	return (
		<React.Fragment>
			<thead>
				<tr>
					<th className='trip-subheader h6'>Destination</th>
					<th className='trip-subheader h6'>&#916;</th>
					<th className='trip-subheader h6'>Total</th>
					<th>
					<FaExchangeAlt onClick={ () => toggleTripActions()} data-testid='trip-and-units-button'/>
					</th>
				</tr>
			</thead>
			<TripOptions isOpen={showTripActions} toggleTripActions={toggleTripActions} replaceAll={props.placeActions.replaceAll} places={props.places} 
			units={props.units} setTripName={props.setTripName} changeUnits={props.placeActions.changeUnits} />
		</React.Fragment>
    );
}

function PlaceList(props) {
	return (
		<tbody>
			{props.places.map((place, index) => (
				<PlaceRow
					key={`table-${JSON.stringify(place)}-${index}`}
					place={place}
					placeActions={props.placeActions}
                    selectedIndex={props.selectedIndex}
					index={index}
					distances={props.distances}
					places={props.places}
				/>
			))}
		</tbody>
	);
}

function PlaceRow(props) {
	const [showFullName, toggleShowFullName] = useToggle(false);
	const name = props.place.defaultDisplayName;
	const location = latLngToText(placeToLatLng(props.place));
	return (
		<tr className={props.selectedIndex === props.index ? 'selected-row' : ''}>

			<td
				data-testid={`place-row-${props.index}`}
				onClick={() => placeRowClicked(toggleShowFullName, props.placeActions.selectIndex,props.index)}
			>
				{!showFullName ? name : props.place.formatPlace()}
				<AdditionalPlaceInfo showFullName={showFullName} location={location} />
			</td>
			<td>
				<DistanceDisplay 
				data-testid={`distance-display-${props.index}`}
				distances={props.distances}
				row={props.index}
				start={props.index - 1}
				end={props.index - 1} />
			</td>
			<td>
				<DistanceDisplay 
				data-testid={`cumulative-distance-display-${props.index}`}
				distances={props.distances}
				row={props.index}
				start={0}
				end={props.index - 1} />
			</td>
			<td>
				<PlaceActionsDropdown
					placeActions={props.placeActions}
					index={props.index}
					places={props.places}
				/>
			</td>
		</tr>
	);
}

function AdditionalPlaceInfo(props){
	return(
		<Collapse isOpen={props.showFullName}>
			{props.location}
		</Collapse>
	);
}

export function DistanceDisplay(props) {
	if (!props.distances || props.distances.length === 0 || props.row === 0) {
		return <></>;
	}
	return (
		<>
			<PlaceDistance distances={props.distances} start={props.start} end={props.end} total={props.total}/>
		</>
	);
}

function placeRowClicked(toggleShowFullName, selectIndex, placeIndex){
    toggleShowFullName();
    selectIndex(placeIndex);
}

function PlaceDistance(props) {
	return (<>{getDistance(props.start, props.end)}</>);

	function getDistance(start, end) {
		let distance = 0;
		if (props.total) {
			end = props.distances.length - 1;
		}
		for (let i = start; i <= end; ++i) {
  			distance += props.distances[i];
		}
		return distance;
	}
}
