import React from 'react';

const encodeId = (id) => {
    return btoa(id).replaceAll('=', '');
};

const decodeId = (string) => {
    return Number(atob(string));
};

export { encodeId, decodeId };
