import React from 'react';
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */
/*
This component renders the billing form the would send 
securly the information to Recurly
 */
class Billing extends React.Component {
    cconstructor(props) {
		super(props);
      }
      
      render(){
          return (
            <div>
            <button onClick={this.toggleExternalHTML}>Toggle Html</button>
            {this.state.showExternalHTML ? <div>
              <div dangerouslySetInnerHTML={this.createMarkup()} ></div>
            </div> : null}
          </div>
          );
      }
}

/* -----------------    CONTAINER     ------------------ */