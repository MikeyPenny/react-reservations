import Phone from "./hoc/Phone/Phone";
import Layout from "./hoc/Layout/Layout";
import Loading from "./components/Loading/Loading";

function App() {
	return (
		<Layout>
			<Phone>
        <Loading />
      </Phone>
		</Layout>
	);
}

export default App;
