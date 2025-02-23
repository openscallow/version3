import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const { slug } = params;

	// fetch product details from api
	try {
		let response = await fetch(`/api/getProduct?productid=${slug}`);
		let data = await response.json();
		let { product } = data;
		console.log(product);
		return product;
		
	} catch (error) {
		console.log(error);
	}
};