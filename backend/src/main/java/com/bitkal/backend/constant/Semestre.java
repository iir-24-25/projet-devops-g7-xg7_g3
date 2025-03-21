package com.bitkal.backend.constant;

public enum Semestre {
    PREMIER(1),
    DEUXIEME(2);

    private final int numero;

    Semestre(int numero) {
        this.numero = numero;
    }

    public int getNumero() {
        return numero;
    }

    public static Semestre fromString(String text) {
        for (Semestre s : Semestre.values()) {
            if (s.name().equalsIgnoreCase(text)) {
                return s;
            }
        }
        throw new IllegalArgumentException("Aucun semestre correspondant à : " + text);
    }
}