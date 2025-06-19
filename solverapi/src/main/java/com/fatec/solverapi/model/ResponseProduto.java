package com.fatec.solverapi.model;

import java.util.List;

public class ResponseProduto {

    private Integer producaoMaxima;
    private List<Produto> produtos;

    public Integer getProducaoMaxima() {
        return producaoMaxima;
    }

    public void setProducaoMaxima(Integer producaoMaxima) {
        this.producaoMaxima = producaoMaxima;
    }

    public List<Produto> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<Produto> produtos) {
        this.produtos = produtos;
    }

}
