export class Produto {
    nome?: string;
    lucro?: string;
    min?: string;
    max?: string;
}

export class ResponseProduto {
    producaoMaxima?: string;
    produtos?: Produto[];
}

export class ResponseSolverFunction {
    produtos?: string[];
    lucroFinal?: string;
}