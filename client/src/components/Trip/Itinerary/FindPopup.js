import React, { useState } from 'react';
import { getOriginalServerUrl, sendAPIRequest } from '../../../utils/restfulAPI';
import {Place} from '../../../models/place.model'
import { MultiSelect } from "react-multi-select-component";
import {
	Button,
	Modal,
	ModalHeader,
	ModalFooter,
    ModalBody,
    Input,
    Collapse
} from 'reactstrap';

const LIMIT = 100;

export default function FindPopup(props) {
	const [showTable, setShowTable] = useState();
    const [found, setFound] = useState([]);
    const [selected, setSelected] = useState([]);

	return (
        <Modal isOpen={props.isOpen} toggle={props.toggleFindActions} data-testid="find-popup">
            <FindActionsHeader toggleFindActions={props.toggleFindActions} />
            <ModalBody>
                <Input 
                    type="text"
                    placeholder="Place Name" 
                    onChange = {() => { setShowTable(false); } }
                    id = "matchString"
                />
                <FoundPlaces id='foundPlaces' isOpen={showTable} found={found} selected={selected} setSelected={setSelected}/>
            </ModalBody>
            <FindActionsFooter showTable={showTable} setShowTable={setShowTable} setFound={setFound} 
                toggleFindActions={props.toggleFindActions} appendMultiple={props.appendMultiple} 
                found={found} selected={selected} setSelected={setSelected} />
        </Modal>
    );
}

function FindActionsHeader(props) {
	return (
		<ModalHeader className='findsearch' toggle={props.toggleFindActions}>
            Search for a place
        </ModalHeader>
	);
}

function FindActionsFooter(props) {

	return (
		<ModalFooter>
            <Collapse   isOpen={props.showTable}>
                <Button
                    color='primary'
                    data-testid='add-to-trip-button'
                    onClick={ async () => {
                        await addSelectedPlaces(props.appendMultiple, props.selected, props.found);
                        props.toggleFindActions()
                        props.setFound([]);
                        props.setSelected([]);
                    }}
                > Add to Trip
                
                </Button>
            </Collapse>
            <Button 
                color='primary'
                data-testid='find-search-button'
                onClick={async () => {
                    let match = document.getElementById("matchString").value; 
                    const response = await findPlaces(match); 
                    props.setFound(response.places);
                    props.setShowTable(true);
                    }}
            >
                Search
            </Button>
            <Button
                color='primary'
                data-testid='find-cancel-button'
                onClick={ () => {
                    props.toggleFindActions()
                    props.setFound([]);
                    props.setSelected([]);
                }}
            > Cancel</Button>

        </ModalFooter>
	);
}

export async function findPlaces(match) {
    let toSend;
    toSend = {
        "requestType": "find",
        "match": match,
        "limit": LIMIT
    };
    const response = await sendAPIRequest(toSend, getOriginalServerUrl());
    return response;
}

function FoundPlaces(props) {

    const options = buildOptionsFromFound(props.found);
    
    return (
        <Collapse id={props.id} isOpen={props.isOpen} data-testid="foundPlaces">
            <br />
            <div>
                <h6>Found Places</h6>
                <MultiSelect
                    options={options}
                    value={props.selected}
                    onChange={props.setSelected}
                    labelledBy="Select"
                />
            </div>
        </Collapse>
    );
}

function buildOptionsFromFound(foundPlaces) {
    let options = [];
    for (let i = 0; i < foundPlaces.length; ++i) {
        let place = {};
        place.label = new Place(foundPlaces[i]).formatPlace();
        place.value = i;
        options.push(place);
    }
    return options;
}

async function addSelectedPlaces(appendMultiple, selected, found) {
    let newPlaces = [];

    for(let i= 0; i < selected.length; i++){
        let index = selected[i].value;
        newPlaces.push(new Place(found[index]));
    }
    await appendMultiple(newPlaces);
}
