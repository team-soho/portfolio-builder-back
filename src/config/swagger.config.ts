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
  });
};
