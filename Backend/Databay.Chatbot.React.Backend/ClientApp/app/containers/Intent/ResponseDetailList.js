import React from 'react';
import ResponseDetailItem from './ResponseDetailItem';

class ResponseDetailList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const things = this.props.items;
        
        return (
            <div>
                {things.map((key, index) =>
                    <ResponseDetailItem key={index} responseDetailItem={key}/>
                )}
            </div>
        );
    }
}
export default ResponseDetailList
