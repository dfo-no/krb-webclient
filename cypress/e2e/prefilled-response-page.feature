Feature: Forberedt besvarelse

  Jeg skal kunne lage forberedt besvarelse og se innholdet på siden

  Scenario: Jeg kan lage forberedt besvarelse
    Given Jeg åpner startsiden
    When Jeg søker etter "Kjøretøy til hjemmetjenesten" på hjemmesiden og klikker på det første forslaget
    And Jeg klikker på "Lag forberedt besvarelse" knapp
    And Jeg skriver "Test leverandør" i feltet "Navn på leverandør"
    Then Jeg klikker på "Lag forberedt besvarelse" knappen
    And Ser jeg url inneholder "prefilledresponse"
    And Ser jeg "Kjøretøy til hjemmetjenesten" på siden
    And Ser jeg "Last ned forberedt besvarelse" på siden

  Scenario: Jeg kan lage ny produkt og besvare krav
    Given Jeg åpner forberedt besvarelse
    When Jeg klikker på "Legg til produkt" knappen
    And Jeg skriver "Test Bil" i feltet "Navn på produkt"
    And Jeg skriver "Enkel Bil" i feltet "Beskrivelse av produktet"
    And Velger jeg produkttype "Fossil-bil"
    Then Ser jeg "Inventar" på siden
    And Ser jeg "Kjøreegenskaper" på siden
    When Velger jeg produkttype "El-bil"
    Then Ser jeg "Inventar" på siden
    And Ser jeg ikke "Kjøreegenskaper" under krav på siden
    Then Jeg klikker på "Lagre" knapp for å lagre
    When Jeg klikker på "Ikke besvart" av kravet "Tilbehør i kupé" for å besvare
    And Velger jeg "Koppholder for sjåfør" fra kodeliste
    And Jeg klikker på "Lagre" knappen for å lagre besvare
    Then Ser jeg svaret "Koppholder for sjåfør" på siden
    When Jeg klikker på "Ikke besvart" av kravet "Seter foran" for å besvare
    And Jeg velger 2 på verdi til kravet "Seter foran"
    And Jeg klikker på "Lagre" knappen for å lagre besvare
    Then Ser jeg svaret "2 sete(r)" på siden

  Scenario: Jeg kan laste ned forberedt besvarelse
    Given Jeg åpner forberedt besvarelse
    Then Klikker jeg på "Last ned forberedt besvarelse" knapp for å laste ned forberedt besvarelse
