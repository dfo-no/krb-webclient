Feature: Besvarelse

  Jeg skal kunne lage besvarelse og se innholdet på siden

  Scenario: Jeg kan lage besvarelse
    Given Jeg åpner startsiden
    When Laste opp kravspesifikasjon
    And Jeg klikker på "Lag Besvarelse" knapp
    And Jeg skriver "Test leverandør" i feltet "Navn på leverandør"
    Then Jeg klikker på "Lag Besvarelse" knappen
    And Ser jeg url inneholder "response"
    And Ser jeg "Itland Data" på siden
    And Ser jeg "123456/AA" på siden
    And Ser jeg "Last ned besvarelse" på siden

  Scenario: Jeg kan laste ned besvarelse
    Given Jeg åpner besvarelse "2022-11-30-citronen-response-5.pdf"
    Then Klikker jeg på "Last ned besvarelse" knapp for å laste ned besvarelse
