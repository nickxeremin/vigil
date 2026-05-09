import { NestFactory } from "@nestjs/core"

import { AppModule } from "./app/app.module"
import { env } from "./common/config/env"
import { ApiExceptionFilter } from "./common/filters/api-exception.filter"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  })

  app.useGlobalFilters(new ApiExceptionFilter())

  await app.listen(env.PORT)
}
bootstrap()
