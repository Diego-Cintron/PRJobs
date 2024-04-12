export const errorHandler = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

export const maxDescriptionLength = 280;
