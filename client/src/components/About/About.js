import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { memberData, teamData } from "./teamInfo";
import { CLIENT_TEAM_NAME } from '../../utils/constants';
import AboutCard from "./AboutCard";

export default function About(props) {
    return (
        <Container>
            <AboutHeader closePage={props.closePage} />
            <TeamCard />
            <MemberCards />
        </Container>
    );
}

function AboutHeader(props) {
    return (
        <Row>
            <Col>
                <h2>{CLIENT_TEAM_NAME}</h2>
            </Col>
            <Col xs="auto">
                <Button color="primary" onClick={props.closePage} xs={1}>
                    Close
                </Button>
            </Col>
        </Row>
    );
}

function TeamCard() {
    return (
        <Row>
            <AboutCard
                title={teamData.teamName}
                text={teamData.missionStatement}
                pic={teamData.imagePath}
                team
            />
        </Row>
    );
}

function MemberCards() {
    return (
        <Row>
            {memberData.map(member =>
                <AboutCard
                    key={member.name}
                    title={member.name}
                    text={member.bio}
                    subTitle={member.homeTown}
                    pic={member.imagePath}
                />
            )}
        </Row>
    );
}