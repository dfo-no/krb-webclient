# Kravbank webclient README

This README is written for Mac users.

## Prerequisites

1. You need a client id in order to run the application. Send an email to either tal@computas.com, imed@computas.com or chaa@computas.com to request a key.
2. Open existing or create a new .zshrc file in your home directory, and add the following line:

   > export REACT_APP_CLIENTID="Key attained from developer"

3. Execute .zshrc file:

   > source .zshrc

## Installation

1. Make sure you have added a SSH key to your GitHub settings to be able to clone the repository securely.
2. Clone the repository:

> git clone git@github.com:dfo-no/krb-webclient.git

3. Install Node 14 with Homebrew.
4. Navigate to the project root directory, and install packages:

   > npm install

5. Install ESLint, Prettier, and SonarLint extensions.
6. Launch the project:

   > npm start
