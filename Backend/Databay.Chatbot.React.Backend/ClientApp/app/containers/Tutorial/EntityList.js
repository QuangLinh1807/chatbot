import React from 'react';
//import { Container } from 'reactstrap';
import Entity from './Entity';

class EntityList extends React.Component{
    constructor(props){
        super(props);
        
        
    }

    render(){
        const things = this.props.items;
        //debugger;
        return (
            <div>
                {things.map((item, index) =>
                    <Entity key={index} cat={item} />
                )}
            </div>
        );
    }

}

export default EntityList;