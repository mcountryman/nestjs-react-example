import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {

  @Get("/value")
  public async test() {
    return { value: true };
  }

}
