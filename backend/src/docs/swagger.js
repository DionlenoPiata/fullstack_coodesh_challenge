const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const outputFile = "../src/docs/swagger_output.json";
const endpointsFiles = [
  "../src/routes/index-route.js",
  "../src/routes/launche-route.js",
];

const doc = {
  info: {
    version: "1.0.0",
    title: "Fullstack Challenge 🏅 - Space X API",
    description:
      "A SpaceX Data API é um serviço que fornece acesso a dados da SpaceX. Os seus recursos incluem listar todos os dados da base com suporte a paginação e busca e também dados para a criação de gráficos de pizza e barra. Os dados disponíveis incluem informações sobre lançamentos de foguetes, missões e naves espaciais.",
  },
  servers: [
    {
      url: `localhost:${process.env.PORT}`,
    },
  ],

  components: {
    schemas: {
      indexResponse: {
        message: "Fullstack Challenge 🏅 - Space X API",
      },
      launcheResponse: {
        links: {
          patch: {
            small: "https://images2.imgbox.com/a2/a0/cHJWyFCo_o.png",
          },
          webcast: "https://youtu.be/4xJAGFR_N-c",
        },
        _id: "5eb87d4effd86e000604b391",
        flight_number: 110,
        name: "CRS-21",
        date_utc: "2020-12-06T16:17:00.000Z",
        rocket: {
          _id: "5e9d0d95eda69973a809d1ec",
          name: "Falcon 9",
          created_at: "2023-10-26T16:43:19.803Z",
          updated_at: "2023-10-26T16:43:19.803Z",
          __v: 0,
        },
        success: true,
        cores: [
          {
            reused: true,
            _id: "653abed756bab37cbbd6d318",
          },
        ],
        created_at: "2023-10-26T19:32:39.777Z",
        updated_at: "2023-10-26T19:32:39.777Z",
        __v: 0,
      },
      statsChartPieResponse: {
        rockets: [
          {
            name: "Falcon 1",
            color: "#0088FE",
            count_launches: 5,
          },
        ],
        successful_launches: 181,
        failed_launches: 5,
      },
      statsChartBarResponse: {
        rockets: [
          {
            name: "Falcon 1",
            color: "#0088FE",
          },
        ],
        data_per_year: [
          {
            name: "2006",
            "Falcon 1": 1,
          },
        ],
      },
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
