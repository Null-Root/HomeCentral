export type TrackingRole = 'guest' | 'member' | 'admin';

export interface AllowedUser {
  email: string;
  role: TrackingRole;
}

export class HomeTracking {
  id?: string;
  name: string;
  createdBy: string;
  dateCreated?: Date;
  allowedUsers: AllowedUser[];

  constructor(
    name: string,
    createdBy: string,
    allowedUsers: AllowedUser[] = [],
    id?: string,
    dateCreated?: Date
  ) {
    this.id = id;
    this.name = name;
    this.createdBy = createdBy;
    this.dateCreated = dateCreated;
    this.allowedUsers = allowedUsers;
  }
}
