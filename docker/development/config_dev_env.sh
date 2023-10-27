#!/bin/sh

# Verifica se o arquivo .env já existe no diretório /app
if [ -e /app/.env ]; then
    echo "O arquivo .env já existe em /app. Nada será feito."
    exit 0
fi

# Cria o arquivo .env e adiciona as variáveis de ambiente
cat <<EOL > /app/.env
NEXT_PUBLIC_BACK_END_BASE_URL=$NEXT_PUBLIC_BACK_END_BASE_URL
EOL

echo "Arquivo .env criado em /app com sucesso."

cd /app
npm i