export const replaceValidKeyword = (string: string) => {
    const regex = string.replace(/[ㄱ-ㅎㅏ-ㅣ[*]/g, '');

    return regex;
};
