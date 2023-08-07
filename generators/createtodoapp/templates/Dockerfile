FROM mcr.microsoft.com/openjdk/jdk:17-mariner as builder
ARG JAR_FILE=web/target/*.jar
COPY ${JAR_FILE} application.jar
RUN java -Djarmode=layertools -jar application.jar extract

FROM mcr.microsoft.com/openjdk/jdk:17-mariner
VOLUME /tmp
COPY --from=builder dependencies/ ./
COPY --from=builder spring-boot-loader/ ./
COPY --from=builder snapshot-dependencies/ ./
COPY --from=builder application/ ./
ENV SERVER_PORT=1025
ENTRYPOINT ["java","org.springframework.boot.loader.JarLauncher"]
