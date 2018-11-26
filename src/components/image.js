
import React from 'react';

let Image = function statelessFunctionComponentClass(props) {
  let source = './assets/img/' + props.source;
  let className = props.className;
  let title = props.title;
  return (
    <img src={source} className={className} title={title}/>
  );
};

export default Image;