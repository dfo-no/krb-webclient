Feature: Hjemmesiden

  Jeg kan gjøre flere ting på hjemmesiden

  Scenario: Jeg kan se banker på forsiden
    Given Jeg åpner hjemmesiden
    Then Ser jeg minimum 3 banker i siden

  Scenario: Jeg kan velge en bank fra søkefelt og lage ny spesifikasjon
    Given Jeg åpner startsiden
    When Jeg søker etter "Test" på hjemmesiden og klikker på det første forslaget
    And Jeg klikker på "Opprett kravspesifikasjon" knapp
    And Jeg skriver "Test kravspesifikasjon 2" i feltet "Navn på spesifikasjon"
    And Jeg skriver "111111/aa" i feltet "Saksnummer"
    And Jeg skriver "direktoratet for forvaltning og økonomistyring" i feltet "Navn"
    And Jeg kan velge navn ved å klikke på "Velg" knappen
    Then Jeg klikker på "Opprett kravspesifikasjon" knappen

  Scenario: Jeg kan lasteopp kravspesifikasjon
    Given Jeg åpner startsiden
    When Laste opp kravspesifikasjon
    Then Ser jeg "Rediger spesifikasjon" på siden
    And Ser jeg "Lag Besvarelse" på siden
    And Ser jeg "Lag forberedt besvarelse" på siden
    And Ser jeg "Gjennomfør evaluering" på siden

  Scenario: Jeg kan lasteopp forberedt besvarelse
    Given Jeg åpner startsiden
    When Laste opp forberedt besvarelse
    Then Ser jeg "Rediger forberedt besvarelse" på siden
    And Ser jeg "Lag Besvarelse" knappen er inaktiv

  Scenario: Jeg kan lasteopp besvarelse
    Given Jeg åpner startsiden
    When Laste opp besvarelse
    Then Ser jeg "Rediger besvarelse" på siden
    And Ser jeg "Lag forberedt besvarelse" knappen er inaktiv
