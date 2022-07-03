import { Mongoose } from 'mongoose';
import { UserSchema } from './schema/userSchema';

export const UserProvider = [
  {
    provide: 'User_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
