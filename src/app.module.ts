import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { ProjectModule } from './project/project.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
@Module({
  imports: [EmployeeModule, 
  GraphQLModule.forRoot<ApolloDriverConfig>({
    autoSchemaFile: 'src/graphql-schema.gql',
    sortSchema: true,
    //To make nest know which are entities, mark them as ObjectType()
    playground: true,
    driver: ApolloDriver,
  }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    ProjectModule],
  controllers: [],
  providers: [],
})
export class AppModule { }