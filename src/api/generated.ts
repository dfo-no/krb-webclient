/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export type paths = {
  "/": {
    get: {
      responses: {
        /** @description OK */
        200: never;
      };
    };
  };
  "/api/v1/banks": {
    get: {
      parameters: {
        query: {
          fieldname: string;
          order: string;
          page?: number;
          pagesize?: number;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["Bank"])[];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  "/api/v1/liquibase": {
    get: {
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  "/api/v1/projects": {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["ProjectForm"])[];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    post: {
      requestBody?: {
        content: {
          "application/json": components["schemas"]["ProjectForm"];
        };
      };
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  "/api/v1/projects/{projectRef}": {
    get: {
      parameters: {
        path: {
          projectRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["ProjectForm"];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    put: {
      parameters: {
        path: {
          projectRef: string;
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["ProjectForm"];
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["ProjectForm"];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    delete: {
      parameters: {
        path: {
          projectRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  "/api/v1/projects/{projectRef}/codelists": {
    get: {
      parameters: {
        path: {
          projectRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["CodelistForm"])[];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    post: {
      parameters: {
        path: {
          projectRef: string;
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["CodelistForm"];
        };
      };
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  "/api/v1/projects/{projectRef}/codelists/{codelistRef}": {
    get: {
      parameters: {
        path: {
          codelistRef: string;
          projectRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["CodelistForm"];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    put: {
      parameters: {
        path: {
          codelistRef: string;
          projectRef: string;
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["CodelistForm"];
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["CodelistForm"];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    delete: {
      parameters: {
        path: {
          codelistRef: string;
          projectRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  "/api/v1/projects/{projectRef}/needs": {
    get: {
      parameters: {
        path: {
          projectRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["NeedForm"])[];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    post: {
      parameters: {
        path: {
          projectRef: string;
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["NeedForm"];
        };
      };
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  "/api/v1/projects/{projectRef}/needs/{needRef}": {
    get: {
      parameters: {
        path: {
          needRef: string;
          projectRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["NeedForm"];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    put: {
      parameters: {
        path: {
          needRef: string;
          projectRef: string;
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["NeedForm"];
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["NeedForm"];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    delete: {
      parameters: {
        path: {
          needRef: string;
          projectRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  "/api/v1/projects/{projectRef}/needs/{needRef}/requirements": {
    get: {
      parameters: {
        path: {
          needRef: string;
          projectRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["RequirementForm"])[];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    post: {
      parameters: {
        path: {
          needRef: string;
          projectRef: string;
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["RequirementForm"];
        };
      };
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  "/api/v1/projects/{projectRef}/needs/{needRef}/requirements/{requirementRef}": {
    get: {
      parameters: {
        path: {
          needRef: string;
          projectRef: string;
          requirementRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["RequirementForm"];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    put: {
      parameters: {
        path: {
          needRef: string;
          projectRef: string;
          requirementRef: string;
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["RequirementForm"];
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["RequirementForm"];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    delete: {
      parameters: {
        path: {
          needRef: string;
          projectRef: string;
          requirementRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  "/api/v1/projects/{projectRef}/needs/{needRef}/requirements/{requirementRef}/requirementvariants": {
    get: {
      parameters: {
        path: {
          needRef: string;
          projectRef: string;
          requirementRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["RequirementVariantForm"])[];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    post: {
      parameters: {
        path: {
          needRef: string;
          projectRef: string;
          requirementRef: string;
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["RequirementVariantForm"];
        };
      };
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  "/api/v1/projects/{projectRef}/needs/{needRef}/requirements/{requirementRef}/requirementvariants/{requirementVariantRef}": {
    get: {
      parameters: {
        path: {
          needRef: string;
          projectRef: string;
          requirementRef: string;
          requirementVariantRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["RequirementVariantForm"];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    put: {
      parameters: {
        path: {
          needRef: string;
          projectRef: string;
          requirementRef: string;
          requirementVariantRef: string;
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["RequirementVariantForm"];
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["RequirementVariantForm"];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    delete: {
      parameters: {
        path: {
          needRef: string;
          projectRef: string;
          requirementRef: string;
          requirementVariantRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  "/api/v1/projects/{projectRef}/products": {
    get: {
      parameters: {
        path: {
          projectRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["ProductForm"])[];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    post: {
      parameters: {
        path: {
          projectRef: string;
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["ProductForm"];
        };
      };
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  "/api/v1/projects/{projectRef}/products/{productRef}": {
    get: {
      parameters: {
        path: {
          productRef: string;
          projectRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["ProductForm"];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    put: {
      parameters: {
        path: {
          productRef: string;
          projectRef: string;
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["ProductForm"];
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["ProductForm"];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    delete: {
      parameters: {
        path: {
          productRef: string;
          projectRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  "/api/v1/projects/{projectRef}/publications/{publicationRef}/publicationexports": {
    get: {
      parameters: {
        path: {
          projectRef: string;
          publicationRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["PublicationExport"])[];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    post: {
      parameters: {
        path: {
          projectRef: string;
          publicationRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  "/api/v1/projects/{projectRef}/publications/{publicationRef}/publicationexports/{publicationExportRef}": {
    get: {
      parameters: {
        path: {
          projectRef: string;
          publicationExportRef: string;
          publicationRef: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["PublicationExportForm"];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  "/api/v1/projects/{projectref}/publications": {
    get: {
      parameters: {
        path: {
          projectref: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["PublicationForm"])[];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    post: {
      parameters: {
        path: {
          projectref: string;
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["PublicationForm"];
        };
      };
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  "/api/v1/projects/{projectref}/publications/{publicationref}": {
    get: {
      parameters: {
        path: {
          projectref: string;
          publicationref: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["PublicationForm"];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    put: {
      parameters: {
        path: {
          projectref: string;
          publicationref: string;
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["PublicationForm"];
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["PublicationForm"];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    delete: {
      parameters: {
        path: {
          projectref: string;
          publicationref: string;
        };
      };
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  "/api/v1/unwrap/uploadPdf": {
    post: {
      requestBody: {
        content: {
          "application/json": string;
        };
      };
      responses: {
        /** @description OK */
        200: never;
      };
    };
  };
  "/api/v1/wrap/prefilled": {
    post: {
      requestBody: {
        content: {
          "application/json": string;
        };
      };
      responses: {
        /** @description OK */
        200: never;
      };
    };
  };
  "/api/v1/wrap/report": {
    post: {
      requestBody: {
        content: {
          "application/json": string;
        };
      };
      responses: {
        /** @description OK */
        200: never;
      };
    };
  };
  "/api/v1/wrap/specification": {
    post: {
      requestBody: {
        content: {
          "application/json": string;
        };
      };
      responses: {
        /** @description OK */
        200: never;
      };
    };
  };
};

export type webhooks = Record<string, never>;

export type components = {
  schemas: {
    Bank: {
      id: string;
      title: string;
      description: string;
      needs: (components["schemas"]["Need"])[];
      codelist: (components["schemas"]["Codelist"])[];
      products: (components["schemas"]["Product"])[];
      publications: (components["schemas"]["Publication"])[];
      /** Format: int64 */
      version?: number | null;
      publishedDate?: string | null;
      type: string;
      inheritedBanks?: (Record<string, never>)[] | null;
      sourceOriginal?: Record<string, unknown> | null;
      sourceRel?: Record<string, unknown> | null;
      tags?: (components["schemas"]["Tag"])[] | null;
    };
    Code: {
      ref: string;
      title: string;
      description: string;
    };
    Codelist: {
      /** Format: int64 */
      id?: number;
      ref: string;
      title: string;
      description: string;
      serialized_codes: string;
    };
    CodelistForm: {
      ref: string;
      title: string;
      description: string;
      serializedCodes: string;
      codes?: (components["schemas"]["Code"])[] | null;
    };
    /**
     * Format: date-time
     * @example "2022-03-10T12:15:50.000Z"
     */
    LocalDateTime: string;
    Need: {
      /** Format: int64 */
      id?: number;
      title: string;
      description: string;
      ref: string;
      requirements: (components["schemas"]["Requirement"])[];
    };
    NeedForm: {
      ref: string;
      title: string;
      description: string;
    };
    Product: {
      /** Format: int64 */
      id?: number;
      ref: string;
      title: string;
      description: string;
    };
    ProductForm: {
      ref: string;
      title: string;
      description: string;
    };
    ProductRefForm: {
      ref: string;
    };
    Project: {
      /** Format: int64 */
      id?: number;
      title: string;
      description: string;
      ref: string;
      products: (components["schemas"]["Product"])[];
      publications: (components["schemas"]["Publication"])[];
      requirements: (components["schemas"]["Requirement"])[];
      needs: (components["schemas"]["Need"])[];
      codelist: (components["schemas"]["Codelist"])[];
    };
    ProjectForm: {
      ref: string;
      title: string;
      description: string;
    };
    Publication: {
      /** Format: int64 */
      id?: number;
      ref: string;
      comment: string;
      date: components["schemas"]["LocalDateTime"];
      /** Format: int64 */
      version?: number;
      publicationExportRef?: string | null;
    };
    PublicationExport: {
      /** Format: int64 */
      id?: number;
      ref: string;
      publicationRef: string;
      serializedProject: string;
    };
    PublicationExportForm: {
      ref: string;
      publicationRef: string;
      deserializedProject?: components["schemas"]["Project"] & (Record<string, unknown> | null);
    };
    PublicationForm: {
      ref: string;
      comment: string;
      date: components["schemas"]["LocalDateTime"];
      /** Format: int64 */
      version?: number;
    };
    Requirement: {
      /** Format: int64 */
      id?: number;
      title: string;
      description: string;
      ref: string;
    };
    RequirementForm: {
      ref: string;
      title: string;
      description: string;
    };
    RequirementVariantForm: {
      ref: string;
      description: string;
      requirementText: string;
      instruction: string;
      useProduct?: boolean;
      useSpecification?: boolean;
      useQualification?: boolean;
      products?: (components["schemas"]["ProductRefForm"])[] | null;
    };
    Tag: {
      id: string;
      title: string;
      description?: string | null;
      type: string;
      parent: string;
      sourceOriginal: string;
      sourceRel?: Record<string, unknown> | null;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
};

export type external = Record<string, never>;

export type operations = Record<string, never>;