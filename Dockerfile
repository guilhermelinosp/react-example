# Use a imagem oficial do Node.js na versão LTS baseada no Alpine Linux
FROM node:lts-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de dependências para o contêiner
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install --unsafe-perm --force

# Copie o restante do código-fonte da aplicação
COPY . .

# Construa a aplicação e instale o http-server globalmente
RUN npm run build && npm install -g http-server

# Exponha a porta em que a aplicação será executada
EXPOSE 8080

# Defina o comando para iniciar a aplicação
CMD ["http-server", "dist"]