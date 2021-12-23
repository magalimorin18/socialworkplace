import React from 'react';
import './NewGroup.css'

import GroupForm from './GroupForm';

const NewGroup = (props) => {
    const saveGroupDataHandler = (enteredGroupData) => {
        const groupData = {
            ...enteredGroupData,
            id : Math.random.toString()
        };
        props.onAddGroup(groupData);
    };
    return(
        <div className = 'new-group'>
            <GroupForm onSaveGroupData = {saveGroupDataHandler}/>
        </div>
    );
};

export default NewGroup;