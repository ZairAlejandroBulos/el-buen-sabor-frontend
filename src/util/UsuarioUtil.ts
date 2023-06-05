export function isValidateClave(clave: string): boolean {

     // Verificar si la clave es indefinida, nula o vacía
    if (clave === undefined || clave === null || clave === '') {
        return false;
    }
    // Verificar si la longitud de la clave es menor que 8
    if (clave.length < 8) {
        return false;
    }

    // Verificar si la clave contiene al menos una mayúscula, una minúscula y un símbolo especial
    const tieneMayuscula = /[A-Z]/.test(clave);
    const tieneMinuscula = /[a-z]/.test(clave);
    const tieneSimbolo = /[!@#$%^&*(),.?":{}|<>]/.test(clave);

    return tieneMayuscula && tieneMinuscula && tieneSimbolo;
}

//valida si una clave cumple con ciertos requisitos. Devuelve un valor booleano
export function isEqualPasswords(clave: string, confirmarClave: string): boolean {
    return clave === confirmarClave;
};

//verifica si dos contraseñas (clave y confirmarClave) son iguales. Devuelve un valor booleano
export function isValidateString(valor: string): boolean {
    return valor !== undefined && valor !== null && valor.trim() !== '';
}

//valida si un valor de tipo string es válido. Devuelve un valor booleano
export function isValidateNumber(valor: number): boolean {
    return valor !== undefined && valor !== null && valor > 0;
}
