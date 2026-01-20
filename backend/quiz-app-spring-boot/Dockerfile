# Use official OpenJDK image
FROM eclipse-temurin:21-jdk


# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

# Copy source code
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose port
EXPOSE 8090

# Run the application
CMD ["sh", "-c", "java -jar target/*.jar"]

