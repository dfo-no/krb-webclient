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
    When Jeg klikker på accordian knapp av produkt "Ja/Nei"
    And Jeg besvarer kravet med "Ja"
    Then Ser jeg evaluert fradrag har verdi "0.00"
    When Jeg besvarer kravet med "Nei"
    Then Ser jeg evaluert fradrag har verdi "70.00"

  Scenario: Jeg kan laste ned besvarelse
    Given Jeg åpner besvarelse "2022-11-30-citronen-response-5.pdf"
    Then Klikker jeg på "Last ned besvarelse" knapp for å laste ned besvarelse

  Scenario: Jeg kan rediger generelle krav
    Given Jeg lager besvarelse fra spesifikasjon "specification-el-bil-til-kommunedrift.pdf"
    Then Ser jeg "Generelle krav" krav
    Then Ser jeg "Absolutte krav" for produkt "Generelle krav" har "0/1"
    When Jeg klikker på accordian knapp av produkt "Generelle krav"
    Then Jeg besvarer "Leveringstid" kravet med 10
    And Jeg besvarer "Avstand til godkjent verksted" kravet med 1
    Then Ser jeg "Absolutte krav" for produkt "Generelle krav" har "1/1"
    And Ser jeg "Totalt evaluert fradrag" for produkt "Generelle krav" har "5,000.00 NOK"
    And Ser jeg absolutte krav av "Generelle krav" produkt er "svart"

  Scenario: Jeg kan rediger besvarlse-produkt
    Given Jeg lager besvarelse fra spesifikasjon "specification-el-bil-til-kommunedrift.pdf"
    Then Ser jeg "El-bil" krav
    And Ser jeg "Antall" for produkt "El-bil" har "1 Stk"
    And Ser jeg "Absolutte krav" for produkt "El-bil" har "0/4"
    And Ser jeg "Totalt evaluert fradrag" for produkt "El-bil" har "0.00 NOK"
    When Jeg klikker på accordian knapp av produkt "El-bil"
    And Jeg besvarer kravet med "Ja"
    Then Ser jeg "Absolutte krav" for produkt "El-bil" har "1/4"
    And Ser jeg absolutte krav av "El-bil" produkt er "ikke svart"
    Then Jeg besvarer "Seter foran" kravet med 2
    And Jeg besvarer "Seter bak" kravet med 3
    And Jeg besvarer "Volum" kravet med bekreftet
    And Jeg besvarer "Sentrallås" kravet med bekreftet
    Then Ser jeg "Absolutte krav" for produkt "El-bil" har "4/4"
    And Ser jeg "Totalt evaluert fradrag" for produkt "El-bil" har "2,000.00 NOK"
    And Ser jeg absolutte krav av "El-bil" produkt er "svart"

  Scenario: Jeg kan ikke rediger krav av type informasjon
    Given Jeg lager besvarelse fra spesifikasjon "specification_all_answer_typer.pdf"
    When Jeg klikker på accordian knapp av produkt "Verdi"
    Then Ser jeg kravet "Verdi" er ikke aktiv

  Scenario: Jeg kan navigere mellom produkter
    Given Jeg lager besvarelse fra spesifikasjon "specification_all_answer_typer.pdf"
    When Jeg klikker på accordian knapp av produkt "Ja/Nei"
    Then Ser jeg produkt "Ja/Nei" er åpent
    And Ser jeg "Forrige produkt" er ikke aktiv
    When Jeg klikker på "Neste produkt" knappen
    Then Ser jeg produkt "Verdi" er åpent
    When Jeg klikker på accordian knapp av produkt "Verdi"
    Then Ser jeg produkt "Verdi" er lukket
