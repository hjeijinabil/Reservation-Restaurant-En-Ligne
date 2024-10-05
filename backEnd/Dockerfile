# Use a base image with OpenJDK
FROM openjdk:17-jdk-slim as build

# Set the working directory
WORKDIR /app

# Copy the Maven POM file and the source code
COPY pom.xml .
COPY src ./src

# Install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    mvn clean package -DskipTests

# Create a new image for running the application
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/target/reservationEnLigne-0.0.1-SNAPSHOT.jar reservationEnLigne.jar

# Expose the application port (default is 8080)
EXPOSE 8087

# Command to run the application
ENTRYPOINT ["java", "-jar", "reservationEnLigne.jar"]
