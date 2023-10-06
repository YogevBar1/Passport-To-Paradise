class AppConfig {
    public port = process.env.PORT; // Load the port from .env
    public mysqlHost = process.env.MYSQL_HOST;
    public mysqlUser = process.env.MYSQL_USER;
    public mysqlPassword = process.env.MYSQL_PASSWORD;
    public mysqlDatabase = process.env.MYSQL_DATABASE;
    public domainName = process.env.ORIGIN;
}

class DevelopmentConfig extends AppConfig {
    public isDevelopment = true;
    public isProduction = false;

}

class ProductionConfig extends AppConfig {
    public isDevelopment = false;
    public isProduction = true;

}

const appConfig = (process.env.NODE_ENV === "production") ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;