import request from "@/utils/requestMusic.ts";

export const getPlaylistTracks = (playlistId: number, limit: number = 10, offset: number = 0) => {
    return request({
        url: `/playlist/track/all`,
        method: "get",
        params: {
            id: playlistId,
            limit,
            offset
        }
    });
};

export const getSongUrls = (ids: string, br: number = 999000) => {
    return request({
        url: `/song/url`,
        method: "get",
        params: {
            id: ids,
            br
        }
    });
};
