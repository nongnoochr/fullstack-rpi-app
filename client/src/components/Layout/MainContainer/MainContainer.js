import React from 'react';
import DisplayPanel from '../../../containers/DisplayPanel/DisplayPanel';
import ControlPanel from '../../../containers/ControlPanel/ControlPanel';

import classes from './MainContainer.module.css';

const mainContainer = (props) => {
    
    const contents = [<DisplayPanel />, <ControlPanel />].map((item, index) => (
        <div key={index} className={classes.Panel}>
            {item}
        </div>
    ));

    return (
        <div className="container-fluid">
            {contents}
        </div>
    );
};

export default mainContainer;