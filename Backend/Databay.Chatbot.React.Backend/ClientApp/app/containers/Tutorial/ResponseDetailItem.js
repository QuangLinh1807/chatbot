import React from 'react';
import ResponseDetail from './ResponseDetail';
import ResponseDetailImage from './ResponseDetailImage';

export function ResponseDetailItem(props) {
    const { responseDetailItem, step } = props;
    function loadMessage() {
        if (responseDetailItem.type == 'text') {
            return <ResponseDetail responseDetailItem={responseDetailItem} step={step} />
        } else {
            return <ResponseDetailImage responseDetailItem={responseDetailItem} step={step} />
        }
    };
    return (
        loadMessage()
    );
}

export default ResponseDetailItem;
