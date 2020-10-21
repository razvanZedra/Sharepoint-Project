let accessToken = "IGQVJVbXNzZAXpLZAF80SGNkTFR0Tkhrby1jSnlJbmVOc2gzeWROdTNpa2JuTU0wNTRmLW9JcW5rN0RUaTlsYi1XTDJRMllzbUZAPcG43aUtDaDlRdkJxNVVNT0ktVDhVWmkzMzVPVXpR";

const BaseUrl = "https://graph.instagram.com/";

const BaseRefreshUrl = `${BaseUrl}refresh_access_token?`;
let refreshUrl = `${BaseRefreshUrl}grant_type=ig_refresh_token&access_token=${accessToken}`;

const BaseMediaUrl = "me/media?";
const MediaFields = "fields=id,permalink";
let mediaUrl = `${BaseUrl}${BaseMediaUrl}${MediaFields}&access_token=${accessToken}`;


export const Get_InstagramMedia = (callback) => {
    fetch(mediaUrl, { method: 'get' })
        .then(response => response.json())
        .then(result => {
            callback(result);
        },
            error => {
                callback(null, error);
            });
};

export const Get_InstagramRefreshToken = (callback) => {
    fetch(refreshUrl, { method: 'get' })
        .then(response => response.json())
        .then(result => {
            callback(result);
        },
            error => {
                callback(null, error);
            });
};