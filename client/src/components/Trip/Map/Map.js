import React, { useState } from 'react'; 
import { Map as LeafletMap, Polyline, TileLayer, LayersControl } from 'react-leaflet';
import Marker from './Marker';
import { placeToLatLng } from '../../../utils/transformers';
import { DEFAULT_STARTING_POSITION } from '../../../utils/constants';
import 'leaflet/dist/leaflet.css';
import Control from 'react-leaflet-control';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useToggle } from '../../../hooks/useToggle';
import icon from 'leaflet/dist/images/marker-icon.png';
import redMarker from '../Map/icons/red_marker.png' //Icon made by Freepik from www.flaticon.com
import pin from '../Map/icons/pin.png' //Icon made by Freepik from www.flaticon.com

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;

const MAP_LAYERS = [
    {
      selected: true,
      name: "OpenStreetMap",
      attribution: "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
     {
      selected: false,
      name: "Stadia",
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      url: "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
    },
    {
      selected: false,
      name: "Esri",
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    },
  ];

export default function Map(props) {
    const [showMapActions, toggleMapActions] = useToggle(false);
    const [markerOptions, toggleMarkerOptions] = useState([icon]);
    const [colorOption, setColorOption] = useState('#3388FF');
    const [isRendered, setIsRendered] = useState(false);
    function handleMapClick(mapClickInfo) {
        props.placeActions.append(mapClickInfo.latlng);
    }
    if (!isRendered) {
        let storedColor, storedMarker;
        storedColor = window.localStorage.getItem("lineColor");
        storedMarker = window.localStorage.getItem("marker");
        if (storedColor !== null) {
            setColorOption(storedColor);
        } else {
            window.localStorage.setItem("lineColor", colorOption);
        }
        if (storedMarker !== null) {
            toggleMarkerOptions(storedMarker);
        } else {
            window.localStorage.setItem("marker", icon);
        }
        setIsRendered(true);
    }

    return (
        <LeafletMap
            className="mapStyle"
            boxZoom={false}
            useFlyTo={true}
            zoom={15}
            minZoom={MAP_MIN_ZOOM}
            maxZoom={MAP_MAX_ZOOM}
            maxBounds={MAP_BOUNDS}
            center={DEFAULT_STARTING_POSITION}
            onClick={handleMapClick}
            data-testid="Map"
        >
            <Control position="bottomleft" >
                <Button color='primary'
                    onClick={ () => toggleMapActions()} 
                    data-testid='map-tools-button'>
                <FaMapMarkerAlt/>
                </Button>
            </Control>
            <MapOptions isOpen={showMapActions} toggleMapActions={toggleMapActions}
            markerOptions={markerOptions} toggleMarkerOptions={toggleMarkerOptions} setColorOption={setColorOption} />
            <LayersControl position="topright">
                {MAP_LAYERS.map(
                    layerData => renderMapLayer(layerData)
                )}
            </LayersControl>
            <TripLines places={props.places} colorOption={colorOption}/>
            <PlaceMarker icon={markerOptions} toggleMarkerOptions={toggleMarkerOptions}
            places={props.places} selectedIndex={props.selectedIndex} />
        </LeafletMap>
    );
}

function MapOptions(props){
    const [marker, toggleMarker] = useState(icon);
    const [color, setColor] = useState('#3388FF')
    return(
        <Modal isOpen={props.isOpen} toggle={props.toggleMapActions}>
            <ModalHeader toggle={props.toggleMapActions}>
                Change Map Icons and Map Line
            </ModalHeader>
            <ModalBody>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <Button color='primary'><img src={pin} alt="Pin" style={{height: '30px', width : '30px'}} 
                            onClick={ () => toggleMarker(pin)}/></Button>
                        </td>
                        <td>
                            <Button color='primary'><img src={icon} alt="Blue Icon" style={{height: '30px'}}
                            onClick={ () => toggleMarker(icon)}/></Button>
                        </td>
                        <td>
                            <Button color='primary'><img src={redMarker} alt="Red Icon" style={{height: '30px', width : '30px'}} 
                            onClick={ () => toggleMarker(redMarker)}/></Button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Button 
                            color='primary'
                            onClick={() => {
                                setColor('#3388FF');
                            }}>
                            Blue</Button>
                        </td>
                        <td>
                            <Button 
                            color='primary'
                            onClick={() => {
                                setColor('red');
                            }}>
                            Red</Button>
                        </td>
                        <td>
                            <Button 
                            color='primary'
                            onClick={() => {
                                setColor('green');
                            }}>
                            Green</Button>
                        </td>
                    </tr>
                </tbody>
            </table>
            </ModalBody>

            <ModalFooter>
                <Button color='primary'
                onClick={ () =>
                {
                    props.toggleMarkerOptions(marker);
                    props.setColorOption(color);
                    props.toggleMapActions();
                    window.localStorage.setItem("lineColor", color);
                    window.localStorage.setItem("marker", marker);
                }}>
                    Save
                </Button>
            </ModalFooter>

        </Modal>
    );

}

function renderMapLayer(layerData) {
    return (
      <LayersControl.BaseLayer checked={layerData.selected} name={layerData.name} key={layerData.name}>
        <TileLayer {...layerData} />
      </LayersControl.BaseLayer>
    );
  }

function TripLines(props) {
    const pathData = computePaths(props.places);
    return pathData.map((path, index) =>
        <Polyline
            color={props.colorOption}
            key={`${JSON.stringify(path)}-${index}`}
            positions={path}
        />
    );
}

function computePaths(places) {
    if (places.length < 2) {
        return [];
    }

    const pathPointPairs = [];
    for (let i = 0; i < places.length; i++) {
        const fromPlace = places[i];
        const toPlace = places[(i+1) % places.length];
        pathPointPairs.push([placeToLatLng(fromPlace), placeToLatLng(toPlace)]);
    }
    return pathPointPairs;
}

function PlaceMarker({places, selectedIndex, icon}) {
    if (selectedIndex === -1) {
        return null;
    }
    return <Marker icon={icon} place={places[selectedIndex]} />;
}