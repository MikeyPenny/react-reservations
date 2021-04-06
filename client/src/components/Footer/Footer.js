import React from "react";

import classes from "./Footer.module.css";

const Footer = (props) => {
	return (
		<section className={classes.Footer}>
			<div className={classes.BtnGroup}>{props.children}</div>
		</section>
	);
};

export default Footer;
