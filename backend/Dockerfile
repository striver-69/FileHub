# Stage 1: Build stage using OpenJDK 17 and Maven wrapper
FROM openjdk:17-jdk-slim AS build
WORKDIR /app

# Copy Maven wrapper files and pom.xml to leverage caching and ensure the correct Maven version is used
COPY pom.xml mvnw ./
COPY .mvn .mvn

# Resolve dependencies (this layer will be cached unless pom.xml changes)
RUN ./mvnw dependency:resolve

# Copy the source code
COPY src src

# Build the application; you can skip tests if desired
RUN ./mvnw package -DskipTests

# Stage 2: Runtime stage using OpenJDK 17 (slim variant)
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the packaged JAR from the build stage; adjust the JAR name as needed
COPY --from=build /app/target/*.jar app.jar

# Expose the application port (if needed)
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]
