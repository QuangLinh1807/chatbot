
import React from 'react';
import { Container } from 'reactstrap';
import Response from './Response';
class ResponseList extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {};
    }

    toggle(thing) {
        this.setState({ collapse: this.state.collapse === thing ? null : thing });
    }
    render() {
        const data = this.props.items.data || [];
        return (
            <div>
                {data.map((key, index) =>
                    <Response key={index} index={index}
                        responseItem={key} responseId={key.internalId}
                        //isOpen={this.state.collapse === data[index]}
                        isOpen={true}
                        toggle={this.toggle} />
                )}
            </div>
        );
    }
}

export default ResponseList
