import React from 'react';
import classes from './Loader.module.css';

const loader = (props) => (
    <div className={classes['loading-animation-container']}>
        <div className={classes.dot}></div>
        <div className={classes.dot}></div>
        <div className={classes.dot}></div>
    </div>
);

export default loader;
