package com.bitkal.backend.constant;

public enum Niveau {
    NIVEAU_1(1),
    NIVEAU_2(2),
    NIVEAU_3(3),
    NIVEAU_4(4),
    NIVEAU_5(5);

    private final int numero;

    Niveau(int numero) {
        this.numero = numero;
    }

    public int getNumero() {
        return numero;
    }
}
