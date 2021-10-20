import { Users } from 'src/users/users';

export type RequestWithUser = Request & { user: Users };
