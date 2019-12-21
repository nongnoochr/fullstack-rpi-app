import React, { Component } from 'react';

import Settings from '../../components/Settings/Settings';
import ControlButton from '../../components/ControlButton/ControlButton';

class ControlPanel extends Component {

    render () {
        return (
            <div className="row">
                <div className="col-6">
                    <Settings />
                </div>
                <div className="col-6">
                    <ControlButton />
                </div>
            </div>
        );
    }
}

export default ControlPanel;