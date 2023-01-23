Feature: Besvarelse

  Jeg skal kunne lage besvarelse og se innholdet på siden

  Scenario: Jeg kan lage besvarelse
    Given Jeg åpner startsiden
    When Laste opp kravspesifikasjon "specification-1.pdf"
    And Jeg klikker på "Lag Besvarelse" knapp
    And Jeg skriver "Test leverandør" i feltet "Navn på leverandør"
    Then Jeg klikker på "Lag Besvarelse" knappen
    And Ser jeg url inneholder "response"
    And Ser jeg "Itland Data" på siden
    And Ser jeg "123456/AA" på siden
    And Ser jeg "Last ned besvarelse" på siden

  Scenario: Jeg kan besvare på en kravspesifikasjon og beregnet fradrag for kravet
    Given Jeg lager besvarelse fra spesifikasjon "specification_all_answer_typer.pdf"
    When Jeg redigerer produkt "Ja/Nei"
    And Jeg besvare kravet med "Ja"
    Then Ser jeg evaluert fradrag har verdi "0.00"
    When Jeg besvare kravet med "Nei"
    Then Ser jeg evaluert fradrag har verdi "70.00"

  Scenario: Jeg kan laste ned besvarelse
    Given Jeg åpner besvarelse "2022-11-30-citronen-response-5.pdf"
    Then Klikker jeg på "Last ned besvarelse" knapp for å laste ned besvarelse
