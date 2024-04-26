export const errorHandler = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

export const maxDescriptionLength = 280;
export const defaultUserImage = "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png";
