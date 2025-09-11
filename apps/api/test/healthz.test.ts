import "reflect-metadata";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import request from "supertest";
import { AppModule } from "../src/app.module.js";

let app: NestFastifyApplication;

process.env.NODE_ENV = process.env.NODE_ENV || "test";

beforeAll(async () => {
  app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.setGlobalPrefix("api");
  await app.init();
  // Fastify doit être "ready" avant d'accepter les requêtes
  await app.getHttpAdapter().getInstance().ready();
});

afterAll(async () => {
  await app.close();
});

describe("Healthcheck", () => {
  it("GET /api/healthz → 200 + { ok: true, uptime: number }", async () => {
    const res = await request(app.getHttpServer()).get("/api/healthz");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    expect(res.body).toHaveProperty("ok", true);
    expect(typeof res.body.uptime).toBe("number");
  });
});
