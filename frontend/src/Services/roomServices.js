import HttpClient from "../config/axiosHelper";     

export const createRoom =  async (roomDetails) => {
        const response = await HttpClient.post(`api/v1/rooms`, roomDetails, {
            headers: {
                'Content-Type': 'text/plain',
            },  
        });
        return response.data;
};

export const joinChatApi = async (roomId) => {
    const response = await HttpClient.get(`/api/v1/rooms/${roomId}`);
    return response.data;
};

export const getMessages  = async  (roomId , size =50 , page =0 ) => {
    const response = await HttpClient.get(`api/v1/rooms/${roomId}/messages?size=${size}&page=${page}`);
    return response.data;
}
  