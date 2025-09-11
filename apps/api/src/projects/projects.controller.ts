import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProjectsService } from "./projects.service.js";
@ApiTags("projects")
@Controller("projects")
export class ProjectsController {
  constructor(private readonly svc: ProjectsService) {}
  @Get() list() {
    return this.svc.list();
  }
  @Get(":id") get(@Param("id", ParseIntPipe) id: number) {
    return this.svc.get(id);
  }
  @Post() create(@Body() body: { name: string; description?: string }) {
    return this.svc.create(body);
  }
  @Patch(":id") update(@Param("id", ParseIntPipe) id: number, @Body() body: any) {
    return this.svc.update(id, body);
  }
  @Delete(":id") remove(@Param("id", ParseIntPipe) id: number) {
    this.svc.remove(id);
    return { ok: true };
  }
}
