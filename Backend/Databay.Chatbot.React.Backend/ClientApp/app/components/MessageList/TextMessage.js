import React from 'react';
import './SystemTable.css';

export function TextMessage(props){
    const { item } = props;
    function loadMessage() {
        if(item.msgType == 1){
            return <div className="outgoing-msg">
                <div className="sent-msg">
                    <p>{item.Text}</p>
                </div>
            </div>
        }else {
            return <div className="incoming-msg">
                <div className="receive-msg">
                    <p>{item.Text}</p>
                </div>
            </div>
        }
    };
    return (
        loadMessage()
    );
}

export default TextMessage;
