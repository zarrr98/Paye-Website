import React from "react";
import {Spinner} from 'react-bootstrap'

export default class Load extends React.Component {
 
  render() {
   return (
     <div className="centered-container">
        <Spinner
                as="span"
                animation="grow"
                size="xl"
                role="status"
                aria-hidden="true"
                className = 'load-spinner text-center'
          />
     </div>
   )
 
  }
}
