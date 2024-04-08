export const errorHandler = (response: Response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

export const maxDescriptionLength = 280;