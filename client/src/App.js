// import Phone from "./hoc/Phone/Phone";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";

import Reservation from "./components/Reservations/Reservation";
import CreateReservation from "./components/Reservations/CreateReservation/CreateReservation";
import Wireframe from "./hoc/Frames/Wireframe";

function App() {
	return (
		<Layout>
			<Wireframe>
				<Switch>
					<Route path="/create" component={CreateReservation} />
					<Route path="/" component={Reservation} />
				</Switch>
			</Wireframe>
		</Layout>
	);
}

export default App;
