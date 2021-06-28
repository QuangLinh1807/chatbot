import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from 'components/LoadingIndicator';
import DivMessage from './DivMessage'
import List from 'components/List';


function MessageList({ loading, error, answer }) {
    if (loading) {
        //return <List component={LoadingIndicator} />;
        return <div>loading</div>
    }

    if (error !== false) {
        return <div>error</div>;
    }

    if (answer !== false) {

        //return <List items={answer.message} component={DivMessage} />;
        return <List items={answer} component={DivMessage} />;
    }

    return null;
}

MessageList.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.any,
    answer: PropTypes.any,
};

export default MessageList;
