import React from "react";

import classes from "./Phone.module.css";

const Phone = (props) => {
	return (
		<div className={classes.Phone}>
			<div className={classes.Upper}>
				<div className={classes.Cam}></div>
				<div className={classes.Speaker}></div>
			</div>
			<div className={classes.Screen}>{props.children}</div>
			<div className={classes.Bottom}>
				<div className={classes.HomeBtn}></div>
			</div>
		</div>
	);
};

export default Phone;
