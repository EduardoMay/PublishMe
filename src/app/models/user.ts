export interface Roles {
  miembro?: boolean;
  admin?: boolean;
  editor?: boolean;
}

export interface UserInterface {
  id?: string;
  name?: string;
  lastname?: string;
  username?: string;
  email?: string;
  password?: string;
  idPhoto?: string;
  photoUrl?: string;
  date?: string;
  roles?: Roles;
}
