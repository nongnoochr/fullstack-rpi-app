import React, { Component } from 'react';


class ControlPanel extends Component {

    render () {
        return (
            <div className="row">
                <div className="col-6">
                    Configuration Panel
                </div>
                <div className="col-6">
                    Start/Pause/Stop button
                </div>
            </div>
        );
    }
}

export default ControlPanel;