import React from 'react';

const Loader = (props) => {
  return (
    <div className="loader-container">
      {
        props.showLoader && (
          <img
            className="loader"
            src="http://res.cloudinary.com/damc3mj5u/image/upload/v1519080450/ajax-loader_nvwchn.gif"
          />
        )
      }
    </div>
  );
}

export default Loader;
