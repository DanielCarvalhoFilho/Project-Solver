package com.fatec.solverapi.model;

import java.math.BigDecimal;
import java.util.List;

public class ResponseSolverFunction {

    private List<String> produtos;
    private BigDecimal lucroFinal;

    public ResponseSolverFunction(List<String> produtos, BigDecimal lucroFinal) {
        this.produtos = produtos;
        this.lucroFinal = lucroFinal;
    }

    public List<String> getProdutos() {
        return produtos;
    }

    public BigDecimal getLucroFinal() {
        return lucroFinal;
    }

}
