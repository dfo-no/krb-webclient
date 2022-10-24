Feature: Spesifikasjonsprodukt

  Jeg skal kunne se innholdet og rediger en spesifikasjon-produkt

  Scenario: Jeg kan se overskriften på en spesifikasjon-prudukt
    Given Jeg åpner spesifikasjon
    When Jeg klikker på "Rediger produktet" knapp
    Then Ser jeg tittel er "El-bil", antall er "1 Stk", vekting er "Middels", type er "El-bil" og beskrivelse er "Test beskrivelse til produkt"
    And Ser jeg 5 behove i side
    And Ser jeg 7 krav-ene i side
    And Ser jeg behov "Tilstand" inneholder krav "Fabrikk-ny"

  Scenario: Jeg kan rediger spesifikasjon-produkt
    Given Jeg åpner produkt-spesifikasjon side
    When Jeg klikker på "Rediger produktdetaljer" knapp
    Then Jeg skriver "Test produkt 2" i feltet "Navn på produkt"
    And Jeg skriver "Ny beskrivelse til produkt" i feltet "Beskrivelse av produktet"
    And Jeg skriver 2 i feltet "quantity"
    And Jeg velger "Høy" på vekting av produkt
    And Ser jeg "Lagre produkt" knappen er deaktiv
    And Jeg klikker på "Lagre" knapp for å lagre

    Scenario: Jeg kan velge og fjerne krav på produkt
      Given Jeg åpner produkt-spesifikasjon side
      When Jeg klikker på "Velg krav" knapp
      Then Jeg besvare kravet "Helt ny bil" som har type ja-nei med "Nei"
      And Jeg klikker på "Lagre og velg krav" knapp for å lagre
      And Ser jeg valgte krav er 1 av 7
      And Ser jeg valgt krav "Fabrikk-ny" inneholder "0 Poeng" for ja og "100 Poeng" for nei
      When Jeg klikker på "Fjern kravet" knapp
      Then Ser jeg valgte krav er 0 av 7
