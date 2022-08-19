# Kravbank webclient README

This receipe is written for Mac users.

## Prerequisites

1. You need a client id in order to run the application. Send an email to an project owner to request a key.
2. Create a .env.local file in krb-webclient directory, and add the following lines:

   > REACT_APP_CLIENTID="Key attained from developer"
   > REACT_APP_API_URL=https://krb-api-man-dev.azure-api.net

## Installation

1. Install Node 16 with Homebrew.

   > brew install node@16

2. Make sure you have added a SSH key to your GitHub settings to be able to clone the repository securely.
3. Clone the repository:

   > git clone git@github.com:dfo-no/krb-webclient.git

4. Navigate to the project root directory, and install packages:

   > npm install

5. Install ESLint, Prettier, and SonarLint extensions.
6. Launch the project:

   > npm start
