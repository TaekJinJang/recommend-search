import {instance} from './instasnce';

export const getRecommendSearch = async (search: string) => {
    const response = await instance.get(`/sick?q=${search}`);
    return response.data;
};
