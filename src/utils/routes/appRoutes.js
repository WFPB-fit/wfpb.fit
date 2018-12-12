import Home from "../../routes/home.jsx";
import HowTo from "../../routes/how-to.jsx";
import Data from "../../routes/food.jsx";
import ResearchContainer from "../../routes/research_container.jsx";
import LearnMore from "../../routes/learn-more";
import Endorsements from "../../routes/endorsements";
import Support from "../../routes/support";

export default [
	{ path: "/", txt: "Home", component: Home, exact: true },
	{ path: "/research", txt: "Research", component: ResearchContainer },
	{ path: "/data", txt: "Data", component: Data },
	{ path: "/endorsements", txt: "Endorsements", component: Endorsements },
	{ path: "/media", txt: "Media", component: LearnMore },
	{ path: "/how-to", txt: "How-To", component: HowTo },
	{ path: "/support", txt: "Support", component: Support }
];
