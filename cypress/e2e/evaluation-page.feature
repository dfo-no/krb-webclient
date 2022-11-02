Feature: Evalueringsside

  Jeg skal kunne se innholdet og evaluere en spesifikasjon

  Scenario: Jeg kan se overskriften av evalueringsside
    Given Jeg laster opp spesifikasjon og velger "Gjennomfør evaluering"
    Then Ser jeg "Last opp spesifikasjon" på siden
    And Ser jeg "Last opp besvarelser" er aktivert
    And Ser jeg "Manuell evaluering" på siden
    And Ser jeg "Resultat" på siden

  Scenario: Jeg kan gjennomføre manuell evaluering og laste ned evaluering
    Given Jeg laster opp spesifikasjon og velger "Gjennomfør evaluering"
    When Jeg laster opp besvarelse
    Then Ser jeg "Citronen" på siden
    And Ser jeg "2022-10-03-citronen-response-4.pdf" på siden
    When Jeg klikker på "Manuell evaluering" knapp
    And Jeg klikker på "Evaluer besvarelser" knappen
    Then Ser jeg "Citronen" har "93%" som resultat
    Then Klikker jeg på "Last ned evaluering" knapp for å laste ned evaluering
