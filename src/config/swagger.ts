import swaggerJsdoc from "swagger-jsdoc";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:8001";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "E-commerce app documentation",
      contact: {
        name: "Neaz Mahmud",
        email: "neaz@etlimited.net",
      },
    },
    servers: [
      {
        url: SERVER_URL,
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          required: ["name", "description", "price", "category"],
          properties: {
            name: {
              type: "string",
              description: "Product name",
            },
            description: {
              type: "string",
              description: "Product description",
            },
            price: {
              type: "number",
              description: "Product price",
            },
            category: {
              type: "string",
              description: "Product category",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Product tags",
            },
            variants: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                  },
                  value: {
                    type: "string",
                  },
                },
              },
              description: "Product variants",
            },
            inventory: {
              type: "object",
              properties: {
                quantity: {
                  type: "number",
                },
                inStock: {
                  type: "boolean",
                },
              },
              description: "Product inventory details",
            },
          },
        },
      },
    },
  },
  apis: ["src/router/*.ts"],
};

export const swaggerDocs = swaggerJsdoc(swaggerOptions);
