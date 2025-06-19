package com.fatec.solverapi.model;

import java.math.BigDecimal;

public class Produto {

    private String nome;
    private BigDecimal lucro;
    private Integer min;
    private Integer max;

    public Produto(String nome, BigDecimal lucro, Integer min, Integer max) {
        this.nome = nome;
        this.lucro = lucro;
        this.min = min;
        this.max = max;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public BigDecimal getLucro() {
        return lucro;
    }

    public void setLucro(BigDecimal lucro) {
        this.lucro = lucro;
    }

    public Integer getMin() {
        return min;
    }

    public void setMin(Integer min) {
        this.min = min;
    }

    public Integer getMax() {
        return max;
    }

    public void setMax(Integer max) {
        this.max = max;
    }
}
