import React from 'react';
import './homepage.styles.scss';
import Directory from "../../components/directory/directory.conponent";


const Homepage = (props) => {

  console.log(props);

  return (
    <div>
      <div className="homepage">
        <Directory/>
      </div>
    </div>
  );
};

export default Homepage;
