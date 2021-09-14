import React from 'react';

export const DetailDescription = ({description}) => {

    console.log(description)

    return (
        <div>
            <h3>Profile Info</h3>
            <p>Selected Profile: {description.firstName} {description.lastName}</p>
            <p>Description: {description.description}</p>
            <p>City: {description.adress.city}</p>
            <p>State: {description.adress.state}</p>
            <p>Index: {description.adress.zip}</p>


        </div>
    )
}


