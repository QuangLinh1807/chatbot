import React from 'react';
import ResponseDetail from './ResponseDetail';
import ResponseDetailImage from './ResponseDetailImage';

export function ResponseDetailItem(props) {
    const { responseDetailItem } = props;
    function loadMessage() {
        if (responseDetailItem.type == 'text') {
            return <ResponseDetail responseDetailItem={responseDetailItem} />
        } else {
            return <ResponseDetailImage responseDetailItem={responseDetailItem} />
        }
    };
    return (
        loadMessage()
    );
}

export default ResponseDetailItem;
