export const apiErrors = {
  INVALID_ACCESS_TOKEN: "Access Token inválido!",
  INVALID_REFRESH_TOKEN: "Refresh token inválido!",
  NULL_JWT_TOKENS: "Tokens JWT nulos gerados...",
  TOKEN_CLAIMS_EXCEPTION: "Erro ao obter os token claims.",
  TOKEN_DO_NOT_MATCH_EXCEPTION: "Os Tokens não pertencem ao mesmo usuário.",
  EXCESSIVE_FAILED_LOGIN_ATTEMPTS: "Conta bloqueada por tentativas de login com falhas excessivas.",
  
  USER_NOT_FOUND: "Usuário não encontrado.", 
  PASSWORDUSER_NOT_FOUND: "Usuário com senha não encontrado.",
  PASSWORDUSER_ALREADY_EXISTS: "Usuário com senha já existe.",
  
  USERNAME_EMPTY: "O nome de usuário não pode ser vazio.", 
  USERNAME_NULL: "O nome de usuário não pode ser nulo.",
  USERNAME_TOO_LONG: "O nome de usuário é muito grande (No máximo de 50 caracteres).",
  USERNAME_TOO_SHORT: "O nome de usuário é muito curto (No mínimo de 3 caracteres).",
  USERNAME_INVALID_FORMAT: "O nome de usuário pode conter apenas caracteres alfanuméricos e o underline(_).",
  
  EMAIL_NULL: "O email não pode ser nulo.",
  EMAIL_EMPTY: "O email não pode ser vazio.",
  EMAIL_TOO_SHORT: "O email é muito curto.",
  EMAIL_TOO_LONG: "O email é muito longo (No máximo 320 caracteres).",
  EMAIL_INVALID_FORMAT: "O email deve estar no seguinte formato: 'name@gmail.com'.",
  EMAIL_ALREADY_VERIFIED: "Email já verificado.",
  
  PASSWORD_WRONG: "Senha incorreta.",
  PASSWORD_NULL: "Senha nula.",
  PASSWORD_INVALID_FORMAT: "A senha tem um formato inválido.",
  PASSWORD_TOO_SHORT: "A senha é muito curta (No mínimo 8 caracteres).",
  PASSWORD_TOO_LONG: "A senha é muito longa (No máximo 128 caracteres).",
  PASSWORD_MISSING_SPECIAL_CHAR: "A senha precisa conter pelo menos um caractere especial.",
  PASSWORD_MISSING_NUMBER: "A senha precisa conter pelo menos um número.",
  PASSWORD_MISSING_UPPERCASE: "A senha precisa conter pelo menos uma letra maiúscula.",
  
  ICON_URL_INVALID: "URL de ícone inválido.",
  ICON_URL_TOO_LONG: "O URL do ícone é muito grande.",
  
  USER_ALREADY_EXISTS_WITH_THIS_USERNAME: "Já existe um usuário registrado com esse nome de usuário.",
  USER_ALREADY_EXISTS_WITH_THIS_EMAIL: "Já existe usuário registrado com esse email.",
  USER_NOT_FOUND_BY_TOKEN: "Usuário não encontrado pelo token.",
  USER_NOT_FOUND_BY_EMAIL: "Usuário não encontrado pelo email.",
  USER_NOT_FOUND_BY_USERNAME: "Usuário não encontrado pelo nome de usuário.",
  USER_NOT_FOUND_BY_ID: "Usuário não encontrado pelo ID.",
  
  INVALID_ID: "ID inválido."
};
