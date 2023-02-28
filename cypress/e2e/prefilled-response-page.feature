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

  Scenario: Jeg kan lage ny produkt
    Given Jeg åpner forberedt besvarelse
    When Jeg klikker på "Legg til produkt" knapp
    And Velg en produkttype
    And Jeg skriver "Test produkt" i feltet "Navn"
    And Jeg skriver "Test beskrivelse" i feltet "Beskrivelse"
    Then Jeg klikker på "Lagre" knapp for å lagre
    And Ser jeg "Test produkt" på siden

  Scenario: Jeg kan besvare krav for produktet
    Given Jeg åpner forberedt besvarelse
    When Jeg klikker på "Rediger produktet" knapp
    And Jeg klikker på "Ikke besvart" av kravet "Tilbehør i kupé" for å besvare
    And Velger jeg "Koppholder for sjåfør" fra kodeliste
    And Jeg klikker på "Lagre" knappen for å lagre besvare
    Then Ser jeg svaret "Koppholder for sjåfør" på siden
    When Jeg klikker på "Ikke besvart" av kravet "Seter foran" for å besvare
    And Jeg velger 2 på verdi til kravet "Seter foran"
    And Jeg klikker på "Lagre" knappen for å lagre besvare
    Then Ser jeg svaret "2 sete(r)" på siden
    When Jeg klikker på "2 sete(r)" av kravet "Seter foran" for å besvare
    And Jeg velger 3 på verdi til kravet "Seter foran"
    And Jeg klikker på "Lagre" knappen for å lagre besvare
    Then Ser jeg svaret "3 sete(r)" på siden

  Scenario: Jeg kan besvare krav for produktets generelle krav
    Given Jeg åpner forberedt besvarelse
    When Jeg klikker på "Rediger generelle krav" knapp
    And Jeg klikker på "Ikke besvart" av kravet "Leveringstid" for å besvare
    And Jeg velger 10 på verdi til kravet "Leveringstid"
    And Jeg klikker på "Lagre" knappen for å lagre besvare
    Then Ser jeg svaret "10 dag(er)" på siden
    When Jeg klikker på "10 dag(er)" av kravet "Leveringstid" for å besvare
    And Jeg velger 30 på verdi til kravet "Leveringstid"
    And Jeg klikker på "Lagre" knappen for å lagre besvare
    Then Ser jeg svaret "30 dag(er)" på siden

  Scenario: Jeg kan laste ned forberedt besvarelse
    Given Jeg åpner forberedt besvarelse
    Then Klikker jeg på "Last ned forberedt besvarelse" knapp for å laste ned forberedt besvarelse

  Scenario: Jeg kan rediger produktdetaljer
    Given Jeg åpner forberedt besvarelse
    And Jeg klikker på "Rediger produktet" knapp
    When Jeg klikker på "Rediger produktdetaljer" knapp
    And Jeg skriver "Bil produkt" i feltet "Navn på produkt"
    And Velger jeg Ja til å legge flere relaterte produkter
    And Velger jeg "El-bil" som relaterte produkt
    Then Jeg klikker på "Lagre" knapp for å lagre
    And Ser jeg "Bil produkt" på siden

  Scenario: Jeg kan svare kravbesvarelse og etterpå rediger produktdetaljer
    Given Jeg åpner forberedt besvarelse
    When Jeg klikker på "Rediger produktet" knapp
    And Jeg klikker på "Ikke besvart" av kravet "Tilbehør i kupé" for å besvare
    And Velger jeg "Koppholder for sjåfør" fra kodeliste
    And Jeg klikker på "Lagre" knappen for å lagre besvare
    Then Ser jeg svaret "Koppholder for sjåfør" på siden
    Then Jeg klikker på "Rediger produktdetaljer" knapp
    And Jeg skriver "Bil produkt lagret etter svare kravbesvarelse" i feltet "Beskrivelse av produktet"
    Then Jeg klikker på "Lagre" knapp for å lagre
    And Ser jeg "Bil produkt lagret etter svare kravbesvarelse" på siden