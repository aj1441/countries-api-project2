export const fetchCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch countries from API:', error);
        // Fallback to local data.json file
        try {
            const localResponse = await fetch('version-2/public/data.json');
            if (!localResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const localData = await localResponse.json();
            return localData;
        } catch (localError) {
            console.error('Failed to fetch countries from local data.json:', localError);
            throw localError;
        }
    }
};
