import React, { useState } from 'react'; 
import { Input } from 'reactstrap';
import { LOG } from '../../../utils/constants';
import { isJsonResponseValid } from '../../../utils/restfulAPI';
import * as tripFileSchema from '../../../../schemas/TripFile';
const FILE_FORMATS = ".json, .csv, application/json, text/csv";
import {Place} from '../../../models/place.model';

export default function FileLoaderApp(props) {
  const { readFile } = useFileReader(props);
  
  function handleFileUpload(event) {
    const fileName = event.target.files[0].name;
    props.setFileName(fileName.substring(0,fileName.indexOf('.')));
    const fileObject = event.target.files[0];
    readFile(fileName, fileObject)
  }
  
  return (
      <Input id="fileLoader" type="file" accept={FILE_FORMATS} onChange={handleFileUpload} hidden />
  );
}

function useFileReader(props) {
  const [file, setFile] = useState(null);
  
  function readFile(fileName, fileObject) {
    const reader = new FileReader();
    reader.readAsText(fileObject, "UTF-8");
    reader.onload = event => {
      const file = { name: fileName, text: event.target.result };
      parseFile(file);
      setFile(file);
    };
  }
  
  function parseFile(file) {
    const extension = file.name.split('.').pop();
    if (extension === "json") {
      parseJSON(file);
    } else if (extension === "csv") {
      // CSV
    }
  }

  function parseJSON(file) {
    let contents = JSON.parse(file.text);
    if(isJsonResponseValid(contents, tripFileSchema)){
      let newPlaces = [];
      let places = contents["places"];
      for(let place in places){
        newPlaces.push(new Place(places[place]));
    }
      props.setPlacesArr(newPlaces);
    }
    else{
      LOG.error(file.name + " is not a valid json file according to the Schema");
    }
  }
  
  return { file, readFile };
}
