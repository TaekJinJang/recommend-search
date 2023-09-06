import {instance} from 'apis/instasnce';

export const getRecommendSearch = async (search: string) => {
    // json-server 라이브러리 지원 쿼리 파라미터 사용
    const response = await instance.get(`/sick?sickNm_like=${search}`);

    return response.data;
};
