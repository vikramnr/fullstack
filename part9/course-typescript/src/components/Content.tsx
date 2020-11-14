import React from 'react';

export interface ContentProps {
    name: string,
    exerciseCount: number
}

const Content: React.FC<ContentProps[]> = (props) => {
    return (
        <div>
            <ul>
                
                <li> {props[0].name}-{props[0].exerciseCount}</li>
                <li> {props[1].name}-{props[1].exerciseCount}</li>
                <li> {props[2].name}-{props[2].exerciseCount} </li> 
            </ul>
        </div>
    )
}

export default Content
