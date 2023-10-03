import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import CollectionItem from "../../components/collection-preview/collection-item.component";
import "./collection.styles.scss";
import { selectCollection } from "../../redux/shop/shop.selector";
import { setCollectionId } from "../../redux/shop/shop.action";

const CollectionPage = ({ collection, setCollectionId }) => {
    let params = "";
    params = useParams();

    useEffect(() => {
        // Update the document title using the browser API
        setCollectionId(params.collectionId);
    }, [setCollectionId, params.collectionId]);

    // const { title, items } = collection;
    return (
        <div className="collection-page">
            <h2 className="title">{collection ? collection.title : ""}</h2>
            <div className="items">
                {collection && collection.items && collection.items.length ? collection.items.map((item) => (
                    <CollectionItem key={item.id} item={item} />
                )) : ''}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    collection: selectCollection(state.shop.collectionId)(state),
});

const mapDispatchToProps = (dispatch) => ({
    setCollectionId: (collectionId) => dispatch(setCollectionId(collectionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);
