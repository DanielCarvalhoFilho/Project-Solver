import type { ResponseProduto, ResponseSolverFunction } from "./file.resource";

class FileService {

    baseUrl: string = import.meta.env.VITE_API_URL;

    async upload(file: FormData): Promise<ResponseProduto> {
        const url = `${this.baseUrl}/api/import`;
        const response = await fetch(url, {
            method: 'POST',
            body: file
        });

        return await response.json();
    }

    async solverFunction(table: ResponseProduto): Promise<ResponseSolverFunction> {
        const url = `${this.baseUrl}/api/solverFunction`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(table)
        });

        return await response.json();
    }

}

export const useFileService = () => new FileService();