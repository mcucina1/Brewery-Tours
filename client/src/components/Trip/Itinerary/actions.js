import React from 'react';
import { 
    ButtonGroup,
    DropdownItem, 
    DropdownMenu, 
    DropdownToggle, 
    UncontrolledDropdown
} from 'reactstrap';
import { BiDotsVerticalRounded, BiLockOpenAlt } from 'react-icons/bi';
import { FaHome, FaPlus, FaTrash, FaTrashAlt, FaFolderOpen, FaSearch, FaDownload, FaAngleDoubleUp } from 'react-icons/fa';
import { DEFAULT_STARTING_POSITION } from '../../../utils/constants';
import { getOriginalServerUrl, sendAPIRequest } from '../../../utils/restfulAPI';

export function ItineraryActionsDropdown(props) {
    return (
        <ActionsDropdown {...props}>
            <DropdownItem onClick={() => props.placeActions.append(DEFAULT_STARTING_POSITION)} data-testid='home-button'>
                <FaHome />
            </DropdownItem>
            <DropdownItem disabled={props.disableRemoveAll} onClick={() => {props.placeActions.removeAll(); props.setTripName("My Trip");}} data-testid='delete-all-button'>
                <FaTrashAlt />
            </DropdownItem>
            <DropdownItem onClick={() => props.toggleAddPlace()} data-testid='add-place-button'>
                <FaPlus />
            </DropdownItem>
            <DropdownItem onClick = {() => props.toggleFindActions()} data-testid='find-actions-button'>
                <FaSearch/>
            </DropdownItem>
            <DropdownItem onClick={() => props.toggleUploadFile()} data-testid='save-trip-button'>
                <FaFolderOpen/>
            </DropdownItem>
        </ActionsDropdown>
    );
}

export function PlaceActionsDropdown(props) {
    return (
        <ActionsDropdown {...props}>
            <DropdownItem onClick={() => props.placeActions.removeAtIndex(props.index)} data-testid={`delete-button-${props.index}`}>
                <FaTrash/>
            </DropdownItem>
            <DropdownItem 
                data-testid={`to-start-location-${props.index}`}
                onClick={() => {
                    moveToStart(props.places, props.placeActions, props.index);
                }}
            >
                <FaAngleDoubleUp />
            </DropdownItem>
        </ActionsDropdown>
    );
}

function ActionsDropdown(props) {
    return (
        <UncontrolledDropdown direction="left">
            <DropdownToggle tag="div" data-testid={`row-toggle-${props.index}`}>
                <BiDotsVerticalRounded size="1.5em" />
            </DropdownToggle>
            <DropdownMenu>
                <ButtonGroup>
                    {props.children}
                </ButtonGroup>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

function moveToStart(places, placeActions, index) {
    // Rotates places such that the item at index is at the start
    let i, place;
    for (i=0; i<index; i++) {
        place = places[0];
        places.push(place);
        places = places.slice(1); // Removes first element
    }
    placeActions.replaceAll(places); // Updates rendering
}