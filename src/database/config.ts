export interface IConfig {
  endpoint: string;
  key: string;
  database: { id: string };
  container: { id: string };
  items: unknown;
}

const cosmosConfig: IConfig = {
  endpoint: 'https://krb-cosmos-server-dev.documents.azure.com:443/',
  key:
    'DyFP6RSgL5FikCqUH2u2kSoiWSZUlCD9UDzlAvTBFkAY8DubdAxLdhI9tLZgu4EgTPZ0uj8dkE18dj09Lu7Ojg==',
  database: { id: 'ToDoList' },
  container: { id: 'DOCUMENTCOLLECTIONID' },
  items: {
    Andersen: {
      id: 'Anderson.1',
      Country: 'USA',
      lastName: 'Andersen',
      parents: [
        {
          firstName: 'Thomas'
        },
        {
          firstName: 'Mary Kay'
        }
      ],
      children: [
        {
          firstName: 'Henriette Thaulow',
          gender: 'female',
          grade: 5,
          pets: [
            {
              givenName: 'Fluffy'
            }
          ]
        }
      ],
      address: {
        state: 'WA',
        county: 'King',
        city: 'Seattle'
      }
    },
    Wakefield: {
      id: 'Wakefield.7',
      Country: 'Italy',
      parents: [
        {
          familyName: 'Wakefield',
          firstName: 'Robin'
        },
        {
          familyName: 'Miller',
          firstName: 'Ben'
        }
      ],
      children: [
        {
          familyName: 'Merriam',
          firstName: 'Jesse',
          gender: 'female',
          grade: 8,
          pets: [
            {
              givenName: 'Goofy'
            },
            {
              givenName: 'Shadow'
            }
          ]
        },
        {
          familyName: 'Miller',
          firstName: 'Lisa',
          gender: 'female',
          grade: 1
        }
      ],
      address: {
        state: 'NY',
        county: 'Manhattan',
        city: 'NY'
      },
      isRegistered: false
    }
  }
};

export default cosmosConfig;
