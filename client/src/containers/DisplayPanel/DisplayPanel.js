import React, { Component } from 'react';
import classes from './DisplayPanel.module.css';

import Summary from '../../components/Summary/Summary';
import Status from '../../components/Status/Status';

class DisplayPanel extends Component {

    render () {
        return (
            <div className={classes.Container}>
                <div className={[classes.Summary, classes.DisplayElement].join(' ')}>
                    <Summary />
                </div>
                <div className={[classes.Status, classes.DisplayElement].join(' ')}>
                    <Status />
                </div>
            </div>
        );
    }
}

export default DisplayPanel;