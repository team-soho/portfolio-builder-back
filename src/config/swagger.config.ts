import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export default async (app) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('portfolio builder api')
    .setDescription('Find here the list of endpoints to portfolio builder APIs')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
    ignoreGlobalPrefix: false,
  };

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    options,
  );

  SwaggerModule.setup('api', app, swaggerDocument, {
    swaggerOptions: {
      docExpansion: 'none',
      tagsSorter: (a, b) => {
        return a.split('.')[0] - b.split('.')[0];
      },
    },
    customSiteTitle: 'portfolio builder api',
    customfavIcon: '/static/favicon.ico',
    //customfavIcon: 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@3.25.0/favicon-32x32.png',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.2/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.2/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.2/swagger-ui.min.css',
    ],
  });
};
