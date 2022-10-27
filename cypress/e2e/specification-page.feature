Feature: Spesifikasjon

  Jeg skal kunne se innholdet og rediger en spesifikasjon

  Scenario: Jeg kan se overskriften på en spesifikasjon
    Given Jeg åpner startsiden
    When Laste opp kravspesifikasjon
    And Velg rediger spesifikasjon
    Then Ser jeg tittel er "Test kravspesifikasjon", organisasjon er "Itland Data", saksnummer er "123456/AA" og myntenhet er "Norske kroner (NOK)"
    And Ser jeg 2 produkt-er
    And Ser jeg "Legg til produkt" knapp er aktiv
    And Ser jeg "Rediger generelle krav" knapp er aktiv
    And Ser jeg "Rediger produktet" knapp er aktiv

  Scenario: Jeg kan rediger spesifikasjon
    Given Jeg åpner spesifikasjon
    When Jeg klikker på "Rediger spesifikasjon" knapp
    And Jeg skriver "Test kravspesifikasjon 2" i feltet "Navn på spesifikasjon"
    And Jeg skriver "111111/bb" i feltet "Saksnummer"
    And Jeg skriver "dfø" i feltet "Navn"
    And Jeg klikker på "Norske kroner (NOK)" og velger "Europeiske euro (EUR)"
    Then Ser jeg "Legg til produkt" knapp er inaktiv
    And Ser jeg "Rediger generelle krav" knapp er inaktiv
    And Ser jeg "Rediger produktet" knapp er inaktiv
    And Jeg klikker på "Lagre" knapp for å lagre

  Scenario: Jeg kan legge til produkt til spesifikasjonen
    Given Jeg åpner spesifikasjon
    When Jeg klikker på "Legg til produkt" knapp
    And Velg en produkttype
    And Jeg skriver "Test produkt" i feltet "Navn"
    And Jeg skriver "Test beskrivelse til produkt" i feltet "Beskrivelse"
    And Jeg skriver 2 i feltet "Antall"
    Then Jeg klikker på "Lagre" knapp for å lagre
    And Jeg klikker på "Lagre produkt" knapp for å lagre

  Scenario: Jeg kan laste ned spesifikasjon
    Given Jeg åpner spesifikasjon
    Then Klikker jeg på "Last ned spesifikasjon" knapp for å laste ned spesifikasjon
