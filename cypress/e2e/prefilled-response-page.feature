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
    When Jeg klikker på "Legg til produkt" knapp
    And Velg en produkttype
    And Jeg skriver "Test produkt" i feltet "Navn"
    And Jeg skriver "Test beskrivelse" i feltet "Beskrivelse"
    Then Jeg klikker på "Lagre" knapp for å lagre
    And Ser jeg "Test produkt" på siden

  Scenario: Jeg kan laste ned forberedt besvarelse
    Given Jeg åpner forberedt besvarelse
    Then Klikker jeg på "Last ned forberedt besvarelse" knapp for å laste ned forberedt besvarelse
