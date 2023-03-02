import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Config } from './config/config';
import { UserModule } from './modules/user/user.module';
import { ImageModule } from './modules/image/image.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

const config = new Config();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
    }),
    Config,
    UserModule,
    ImageModule,
    ServeStaticModule.forRoot({
      rootPath: join(config.loadDataPath, 'images'),
      serveRoot: '/images',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
