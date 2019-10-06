import React from 'react';

import PreviewCollection from "../../components/collection-preview/preview-collection.component";
import SHOP_DATA from './Shop-data'
import './shop-page.styles.scss';




class ShopPage extends React.Component{
    constructor(props){
        super(props);

        this.state= {
            collections : SHOP_DATA
        };
    }

    render(){

        const {collections} = this.state
        return (
            <div className= "shop-page">
               { collections.map( ({id, ...otherCollectionProp }) =>(
                    <PreviewCollection key = {id} {...otherCollectionProp} />
                ))
               }
            </div>
        )
    }
}

export default ShopPage;