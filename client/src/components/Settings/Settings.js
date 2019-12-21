import React from 'react';

import Form from 'react-bootstrap/Form';

const settings = (props) => {
    return (
        <div className="row">
            <div className="col-5">
                <label>External Controller</label>
            </div>
            <div className="col-7">
            <Form>
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="Check this switch"
                />
            </Form>
            </div>
        </div>
    );
};

export default settings;