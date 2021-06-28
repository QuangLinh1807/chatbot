import React from 'react';
import PropTypes from 'prop-types';

import Ul from './Ul';
import Wrapper from './Wrapper';

function List(props) {
    const ComponentToRender = props.component;
    let content = <div />;
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    // If we have items, render them
    if (props.items) {
        content = props.items.map(item => (
            <ComponentToRender key={`item-${makeid(5)}`} item={item} />
        ));
    } else {
        // Otherwise render a single component
        content = <ComponentToRender />;
    }

    return (
        // <Wrapper>
        //   <Ul>{content}</Ul>
        // </Wrapper>
        <div>
            {content}
        </div>
    );
}

List.propTypes = {
    component: PropTypes.elementType.isRequired,
    items: PropTypes.array,
};

export default List;
