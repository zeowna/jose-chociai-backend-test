import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { DynamicModule } from '@nestjs/common';

export const MockedMongooseModule = (mongod: MongoMemoryServer) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongod = await MongoMemoryServer.create();
      const mongoUri = mongod.getUri();
      return {
        uri: mongoUri,
      };
    },
  });

class MongooseModuleWithMongoMemoryServer {
  private mongod: MongoMemoryServer;
  private module: DynamicModule;

  register() {
    if (!this.mongod) {
      this.module = MongooseModule.forRootAsync({
        useFactory: async () => {
          this.mongod = await MongoMemoryServer.create();
          const mongoUri = this.mongod.getUri();
          return {
            uri: mongoUri,
          };
        },
      });
    }
    return this.module;
  }

  async disconnect() {
    if (this.mongod) {
      await this.mongod.stop();
    }
  }
}

export class MockedMongooseFactory {
  static useMongoMemoryServer() {
    return new MongooseModuleWithMongoMemoryServer();
  }
}
