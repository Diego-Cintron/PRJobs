export const errorHandle = (response: Response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};