package com.bitkal.backend.constant;

public enum Seances {
    S1("8h30 à 10h00"),
    S2("10h15 à 11h45"),
    S3("12h00 à 13h30"),
    S4("14h00 à 15h30"),
    S5("15h45 à 17h15"),
    S6("17h30 à 19h00");

    private final String seance;

    Seances(String seance) {
        this.seance = seance;
    }

    public String getSeances() {
        return this.seance;
    }
}