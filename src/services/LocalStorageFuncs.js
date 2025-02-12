export const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
    const item = localStorage.getItem(key);
    try {
        return item ? JSON.parse(item) : null;  // Retorna null se o item não existir
    } catch (error) {
        console.error(`Erro ao ler o item ${key}:`, error);
        return null;  // Retorna null se o JSON.parse falhar
    }
};

