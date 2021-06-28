import React from 'react';
import TextMessage from './TextMessage'

export function DivMessage(props){
    const { item } = props;
    function loadMessage() {
        if(item.Type == 'text'){
            return <TextMessage item={item}/>
        }else {
            return <TextMessage item={item} />
        }
    };
    return (
        // <div>{item.type}</div>
            loadMessage()
    );
}

export default DivMessage;
