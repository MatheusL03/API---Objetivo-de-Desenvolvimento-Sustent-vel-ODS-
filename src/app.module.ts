import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DescarteModule } from './descarte/descarte.module';

@Module({
  imports: [
    DescarteModule,
    MongooseModule.forRoot(
      `mongodb+srv://Matheus7_db_user:mathe12333@cluster0.lcru9aa.mongodb.net/test?retryWrites=true&w=majority`,
    ),
  ],
})
export class AppModule {}
