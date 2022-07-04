import { Mongoose } from 'mongoose';
import { User, UserSchema } from './schema/user.schema';

export const UserProvider = [
  {
    provide: User.name,
    useFactory: (mongoose: Mongoose) => mongoose.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
