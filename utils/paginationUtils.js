exports.paginate = (data, limite, pagina) => {
    
    if (!limite || !pagina) {
        return {
            total: data.length,
            pagina: 1,
            limite: data.length,
            data,
        };
    }

    const limit = parseInt(limite, 10);
    const page = parseInt(pagina, 10);

    // Valida o limite permitido
    if (![5, 10, 30].includes(limit)) {
        throw new Error('O limite deve ser 5, 10 ou 30.');
    }

    // Calcula o deslocamento
    const offset = (page - 1) * limit;

    // Fatiamento dos dados
    const paginatedData = data.slice(offset, offset + limit);

    return {
        total: data.length,
        pagina: page,
        limite: limit,
        data: paginatedData,
    };
};