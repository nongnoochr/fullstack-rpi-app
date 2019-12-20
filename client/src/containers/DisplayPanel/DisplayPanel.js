import React, { Component } from 'react';
import Summary from '../../components/Summary/Summary';
import Status from '../../components/Status/Status';

class DisplayPanel extends Component {

    render () {
        return (
            <div className="row">
                <div className="col-8">
                    <Summary />
                </div>
                <div className="col-4">
                    <Status />
                </div>
            </div>
        );
    }
}

export default DisplayPanel;