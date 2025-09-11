import { Injectable, NotFoundException } from "@nestjs/common";
type Project = { id: number; name: string; description?: string; createdAt: Date };
@Injectable()
export class ProjectsService {
  private seq = 1;
  private data = new Map<number, Project>();
  list() {
    return [...this.data.values()];
  }
  get(id: number) {
    const p = this.data.get(id);
    if (!p) throw new NotFoundException();
    return p;
  }
  create(dto: { name: string; description?: string }) {
    const p: Project = {
      id: this.seq++,
      name: dto.name,
      description: dto.description,
      createdAt: new Date(),
    };
    this.data.set(p.id, p);
    return p;
  }
  update(id: number, dto: Partial<Omit<Project, "id" | "createdAt">>) {
    const p = this.get(id);
    const u = { ...p, ...dto };
    this.data.set(id, u);
    return u;
  }
  remove(id: number) {
    if (!this.data.delete(id)) throw new NotFoundException();
  }
}
