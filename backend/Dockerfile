# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY .. ./backend
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jre AS runtime

WORKDIR /app
COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080

ENV SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/systemGestionAbsance?createDatabaseIfNotExist=true \
    SPRING_DATASOURCE_USERNAME=root \
    SPRING_DATASOURCE_PASSWORD= \
    SPRING_ELASTICSEARCH_URIS=http://elasticsearch:9200 \
    SPRING_MAIL_HOST=smtp.gmail.com \
    SPRING_MAIL_PORT=587 \
    SPRING_MAIL_USERNAME=k8a8l8i8d8@gmail.com \
    SPRING_MAIL_PASSWORD="mkxe mvwo gqcg tqzu" \
    JWT_SECRET=8f7b3e9d1a2c4f6e8b0d9a3c5f7e1b2d4a6c8f9e0b3d5a7c9f1e2b4d6a8c0f3

ENTRYPOINT ["java", "-jar", "app.jar"]