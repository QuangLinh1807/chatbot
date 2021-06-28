
import React from 'react';
import { Container } from 'reactstrap';
import Response from './Response';
class ResponseList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.items.data || [];
        //debugger;
        return (
            <div>
                {data.map((key, index) =>
                    <Response key={index} responseItem={key} responseId={key.internalId} step={this.props.step} />
                )}
            </div>
        );
    }
}

export default ResponseList
