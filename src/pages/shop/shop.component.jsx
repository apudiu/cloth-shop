import React, {Component} from 'react';
import SHOP_DATA from "./shopData";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";

class Shop extends Component {

  constructor(props) {
    super(props);

    this.state = {
      collections: SHOP_DATA
    };
  }


  render() {

    const {collections} = this.state;

    return (
      <div className="shop-page">
        {
          collections.map(({id, ...spreadCollections}) => (
            <CollectionPreview key={id} {...spreadCollections} />
          ))
        }
      </div>
    );
  }
}

export default Shop;
