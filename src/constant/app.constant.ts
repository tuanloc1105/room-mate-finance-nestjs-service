export const keycloakRealm: string = 'master';
export const keycloakLoginPath: string =
  '/realms/${keycloakRealm}/protocol/openid-connect/token';
export const keycloakGetUserInfoPath: string =
  '/realms/${keycloakRealm}/protocol/openid-connect/token/introspect';
export const keycloakGetNewTokenPath: string =
  '/realms/${keycloakRealm}/protocol/openid-connect/token';
export const keycloakRevokeTokenPath: string =
  '/realms/${keycloakRealm}/protocol/openid-connect/revoke';
export const keycloakUserRegisterPath: string =
  '/admin/realms/${keycloakRealm}/users';
export const keycloakSearchUserPath: string =
  '/admin/realms/${keycloakRealm}/users?briefRepresentation=true&search={0}';
export const keycloakResetPasswordPath: string =
  '/admin/realms/${keycloakRealm}/users/{0}/reset-password';
export const keycloakUpdateUserPath: string =
  '/admin/realms/${keycloakRealm}/users/{0}';
