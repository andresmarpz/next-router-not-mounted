import { renderToString } from "react-dom/server";
import { useRouter } from "next/router";

function ComponentWithRouter() {
  // the problem is when using useRouter() here while it
  // executes on getServerSideProps
	useRouter();

	return <div>router</div>;
}

export default function Home() {
	return (
		<div>
			<ComponentWithRouter />
		</div>
	);
}

export function getServerSideProps() {
  // This will throw an error because the router is not mounted
  // but works on next@12 and up to next@13.0.3

  // Algolia still uses this method to Server Side Render their InstantSearch products
  // so why would this not work by updating?
  // refer to https://github.com/algolia/instantsearch/blob/master/examples/react/next/pages/index.tsx
  // for a working example of next@12 (uses renderToString, essentially)
	const test = renderToString(<Home />);

	return {
		props: {
			test,
		},
	};
}
