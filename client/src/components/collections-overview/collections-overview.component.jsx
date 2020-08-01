import React from 'react';
import { connect } from "react-redux"; 
import { createStructuredSelector } from 'reselect';

import { selectCollectionForPreview } from "../../redux/shop/shop.selector"
import PreviewCollection from "../../components/collection-preview/preview-collection.component";
import './collections-overview.styles.scss';

const CollectionsOverview = ({collections}) => (
    <div className= "collections-overview">
    { collections.map( ({id, ...otherCollectionProp }) =>(
         <PreviewCollection key = {id} {...otherCollectionProp} />
     ))
    }
 </div>
)


const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
})
   
export default connect (mapStateToProps)(CollectionsOverview);