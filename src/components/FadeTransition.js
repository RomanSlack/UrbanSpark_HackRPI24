// src/components/FadeTransition.js
import React from "react";
import { CSSTransition } from "react-transition-group";

function FadeTransition({ in: inProp, children }) {
  return (
    <CSSTransition in={inProp} timeout={500} classNames="fade" unmountOnExit>
      <div>{children}</div>
    </CSSTransition>
  );
}

export default FadeTransition;
