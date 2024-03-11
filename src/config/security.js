const helmet = require('helmet');
const express = require('express');
const xss = require('xss');

const app = express();

app.use(helmet());


function simulateSqlInjection(input) {
    // Verifica se a entrada contém palavras-chave de injeção de SQL
    const sqlKeywords = ['DROP', 'DELETE', 'UPDATE', 'INSERT', 'SELECT', 'UNION', 'FROM'];

    const isSqlInjectionAttempt = sqlKeywords.some(keyword =>
        input.toUpperCase().includes(keyword)
    );

    if (isSqlInjectionAttempt) {
        // Simulação de injeção de SQL detectada
        console.warn('Tentativa de injeção de SQL detectada:', input);
    }

    // Retorna se a simulação foi bem-sucedida
    return isSqlInjectionAttempt;
}

function simulateXSS(input) {
    // Simulação de detecção de Cross-Site Scripting (XSS)
    const sanitizedInput = sanitizeHTML(input);
    const isXSSAttempt = input !== sanitizedInput;

    if (isXSSAttempt) {
        console.warn('Tentativa de Cross-Site Scripting (XSS) detectada:', input);
    }

    // Retorna se a simulação foi bem-sucedida
    return isXSSAttempt;
}

function sanitizeHTML(data) {
    return xss(data);
}

module.exports = {
    app,
    simulateSqlInjection,
    simulateXSS,
    sanitizeHTML,
};
