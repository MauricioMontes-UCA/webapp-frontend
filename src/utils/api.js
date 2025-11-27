import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL

const API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});


// --- Rating API (endpoints reales) ---
// Obtener stats de un libro
export const getBookRatingStats = async (bookId) => {
    const { data } = await API.get(`/api/ratings/${bookId}/stats`);
    return data;
};

// Obtener rating del usuario autenticado para un libro
export const getUserBookRating = async (bookId) => {
    const { data } = await API.get(`/api/ratings/${bookId}`);
    return data;
};

// Crear rating
export const createRating = async ({ book_id, rating, comment }) => {
    const { data } = await API.post('/api/ratings', {
        book_id,
        rating,
        comment
    });
    return data;
};

// Actualizar rating
export const updateRating = async ({ book_id, rating, comment }) => {
    const { data } = await API.put(`/api/ratings/${book_id}`, {
        rating,
        comment
    });
    return data;
};

// Eliminar rating
export const deleteRating = async (book_id) => {
    const { data } = await API.delete(`/api/ratings/${book_id}`);
    return data;
};

export default API