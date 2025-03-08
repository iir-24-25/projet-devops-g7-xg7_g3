package com.bitkal.backend.constant;

public enum Semestre {
    PREMIER(1),
    DEUXIEME(2);

    private final int numero;

    Semestre(int numero){
        this.numero = numero;
    }

    public int getNumero(){
        return numero;
    }
}
