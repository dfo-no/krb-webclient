Feature: Spesifikasjonsprodukt

  Jeg skal kunne se innholdet og rediger en spesifikasjon-produkt

  Scenario: Jeg kan se overskriften på en spesifikasjon-prudukt
    Given Jeg åpner spesifikasjon "specification-1.pdf"
    When Jeg klikker på "Rediger produktet" knapp
    Then Ser jeg tittel er "El-bil", antall er "1 Stk", type er "El-bil" og beskrivelse er "Test beskrivelse til produkt"
    And Ser jeg 5 behov i siden
    And Ser jeg 7 krav i siden
    And Ser jeg behov "Tilstand" inneholder krav "Fabrikk-ny"

  Scenario: Jeg kan rediger spesifikasjon-produkt
    Given Jeg åpner produkt-spesifikasjon side
    When Jeg klikker på "Rediger produktdetaljer" knapp
    And Jeg skriver "Test produkt 2" i feltet "Navn på produkt"
    And Jeg skriver "Ny beskrivelse til produkt" i feltet "Beskrivelse av produktet"
    And Jeg skriver 2 i feltet "quantity"
    Then Ser jeg "Lagre produkt" knappen er inaktiv
    And Jeg klikker på "Lagre" knapp for å lagre

    Scenario: Jeg kan velge og fjerne krav på produkt
      Given Jeg åpner produkt-spesifikasjon side
      When Jeg klikker på "Velg krav" knapp
      And Jeg besvare kravet "Helt ny bil" som har type ja-nei med "Nei"
      And Jeg klikker på "Lagre krav" knapp for å lagre
      Then Ser jeg valgte krav er 1 av 7
      And Ser jeg valgt krav "Fabrikk-ny" inneholder "0 Poeng" for ja og "100 Poeng" for nei
      When Jeg klikker på "Fjern kravet" knapp
      Then Ser jeg valgte krav er 0 av 7

    Scenario: Skal vise riktig merkelapp
      Given Jeg åpner spesifikasjon "specification_all_answer_typer.pdf"
      When Jeg redigerer produkt "Bekreftelse"
      And Jeg klikker på "Velg variant" til produktkrav "Bekreftelse som krav"
      Then Jeg ser en "Absolutt krav"-merkelapp
      When Jeg klikker på checkbox
      Then Jeg ser en "Tildelingskriterie"-merkelapp
      And Jeg klikker på avbryt knappen for å lukke kravet
      When Jeg klikker på "Velg variant" til produktkrav "Bekreftelse som informasjon"
      Then Jeg ser en "Informasjon"-merkelapp

   Scenario: Jeg kan angi datoperiode og varighet for krav som har svartype datoperiode
     Given Jeg åpner spesifikasjon "specification_all_answer_typer.pdf"
     When Jeg redigerer produkt "Dato"
     And Jeg klikker på "Velg variant" til produktkrav "Dato med periode som krav"
     And Jeg velger "Fra" dato "10" for kravet
     And Jeg velger "Til" dato "19" for kravet
     And Jeg skriver 5 i feltet "Verdi"
     And Jeg klikker på "Lagre krav" knapp for å lagre
     Then Ser jeg "Varighet" har verdi "5"
     And Ser jeg "Fra" har verdi "10. desember"
     And Ser jeg "Til" har verdi "19. desember"
