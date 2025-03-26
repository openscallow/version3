import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
    // const { slug } = params;
    const query = url.searchParams.get('k');

    // fetch product details from api
    try {
        let response = await fetch(`/search/result?query=${query}`);
        let data = await response.json();
        // let { product } = data;
        console.log(data);
        return {...data};
        
    } catch (error) {
        console.log(error);
    }
};