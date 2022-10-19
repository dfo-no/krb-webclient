# Kravbank webclient README

This recipe should work for most mainstream OSs, including Windows, Mac and mainstream Linux distros.

## Prerequisites

1. You need the client id in order to run the application. Log onto portal.azure.com and find it under the Kravbank
   application.
2. Create a .env.local file in krb-webclient directory, and add the following lines:

   > REACT_APP_CLIENTID="Key attained from Portal"
   > REACT_APP_API_URL=https://krb-api-man-dev.azure-api.net

## Installation

1. Install Volta if it isn't already installed, see https://docs.volta.sh/guide/getting-started for a short how to. (This
   only needs to be done once, afterwards it can be reused for every project.)
2. Make sure you have added a SSH key to your GitHub settings to be able to clone the repository securely.
3. Clone the repository:

   > git clone git@github.com:dfo-no/krb-webclient.git

4. Navigate to the project root directory, and install packages:

   > npm install

5. Install ESLint, Prettier, and SonarLint extensions.
6. Launch the project:

   > npm start
