# syntax=docker/dockerfile:1.4
FROM openjdk:17-jdk-slim AS build
WORKDIR /app

# Copy Maven wrapper and pom.xml first
COPY pom.xml mvnw ./
COPY .mvn .mvn

# Use BuildKit cache mount for Maven's local repository
RUN --mount=type=cache,target=/root/.m2 \
    ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Build the application; use the cache mount so that dependencies are reused
RUN --mount=type=cache,target=/root/.m2 \
    ./mvnw package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar backend.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "backend.jar"]
