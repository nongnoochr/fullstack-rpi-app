import React from 'react';
import { getTimerString } from '../../utils/TimeUtils';

const timer = (props) => {

    return (
        <div>
            {getTimerString(props.data.current)}
        </div>
    );
}

export default timer;
