import { Module, OnModuleInit } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Request, Response } from "express";
import * as express from "express";
import * as Bundler from "parcel-bundler";
import { join } from "path";

import { AppConfig } from "./app_config";
import { AppController } from "./app_controller";

@Module({
  imports: [],
  controllers: [AppController],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost
  ) {}

  /**
   * There's a bunch of ways to do this however, I wanted to follow the design
   * implemented by `https://github.com/nestjs/serve-static`
   * 
   * See: https://docs.nestjs.com/fundamentals/lifecycle-events
   */
  public onModuleInit() {
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const app = httpAdapter.getInstance();

    if (process.env.NODE_ENV === "development") {
      // Use `parcel-bundler` middleware
      const bundler = new Bundler(join(AppConfig.FRONTEND_PATH, AppConfig.INDEX_PATH));
      app.use(bundler.middleware());
    } else {
      // Use `express.static` middleware
      app.use(express.static(AppConfig.ASSETS_PATH));
      app.use((req: Request, res: Response) =>
        res.sendFile(join(AppConfig.ASSETS_PATH, AppConfig.INDEX_PATH))
      );
    }
  }
  
  
}
