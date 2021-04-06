import React from "react";
import classes from "./Wireframe.module.css";

const Wireframe = (props) => {
	return <div className={classes.Wireframe}>{props.children}</div>;
};

export default Wireframe;
