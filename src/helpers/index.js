const calcularTotalpagar = (cantidad, plazo) => {
    let total;

    // Mientras mayor es la cantidad menor es el interés para pagar
    if (cantidad < 500) {
        total = cantidad * 1.4;
    } else if (cantidad >= 500 && cantidad < 1000) {
        total = cantidad * 1.3;
    } else if (cantidad >= 1000 && cantidad < 1500) {
        total = cantidad * 1.2;
    } else {
        total = cantidad * 1.1;
    }

    // A mayor plazo, mayor interés
    if (plazo === 6) {
        total *= 1.1;
    } else if (plazo === 12) {
        total *= 1.2;
    } else {
        total *= 1.3;
    }

    return total;
}

export {
    calcularTotalpagar
}