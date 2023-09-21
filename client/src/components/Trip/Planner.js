import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Map from './Map/Map';
import Itinerary from './Itinerary/Itinerary';
import { usePlaces } from '../../hooks/usePlaces';

export default function Planner() {
    const [tripName, setTripName] = useState("My Trip");

    const {places, distances, units, selectedIndex, placeActions} = usePlaces();

    return (
        <Container>
            <Section>
                <Map places={places} selectedIndex={selectedIndex} placeActions={placeActions} distances={distances} />
            </Section>
            <Section>
                <Itinerary places={places} selectedIndex={selectedIndex} placeActions={placeActions} distances={distances} units={units} tripName={tripName} setTripName={setTripName} />
            </Section>
        </Container>
    );
}

function Section(props) {
    return (
        <Row>
            <Col sm={12} md={{ size: 10, offset: 1 }}>
                {props.children}
            </Col>
        </Row>
    );
}