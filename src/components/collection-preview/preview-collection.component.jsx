import React from 'react';

import CollectionItem from "../collection-preview/collection-item.component"

import "./preview.collection.styles.scss";


const PreviewCollection = ({id,title, items}) => {
    return (
        <div className="collection-preview">
            <div className="title">
                {title.toUpperCase()}
            </div>
            <div className="preview">
                {
                    items.filter((item,index) => index < 4 ).map(({id, ...otherItemProp})=>(
                         <CollectionItem key={id} {...otherItemProp}  /> 
                    ))
                }
            </div>
        </div>
    )
}

export default PreviewCollection;
