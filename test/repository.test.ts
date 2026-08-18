import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  SQLiteRegistrationRepository,
  SQLiteEmailRepository,
  Registration,
  SentEmail,
} from "../src/api/persistence";
import fs from "fs";
import path from "path";

describe("SQLite Persistence", () => {
  const dbPath = path.join(__dirname, "test.db");
  let regRepo: SQLiteRegistrationRepository;
  let emailRepo: SQLiteEmailRepository;

  beforeEach(() => {
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
    regRepo = new SQLiteRegistrationRepository(dbPath);
    emailRepo = new SQLiteEmailRepository(dbPath);
  });

  afterEach(() => {
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  });

  it("should create and find a registration", () => {
    const reg: Registration = {
      email: "test@entity.test",
      status: "Pending",
      registeredAt: new Date().toISOString(),
      origen: "Test",
      confirmationEmailSent: true,
      confirmationEmailStatus: "sent",
    };
    regRepo.create(reg);
    const found = regRepo.findByEmail("test@entity.test");
    expect(found).not.toBeNull();
    expect(found?.email).toBe("test@entity.test");
    expect(found?.status).toBe("Pending");
    expect(found?.confirmationEmailSent).toBe(true);
  });

  it("should update a registration", () => {
    const reg: Registration = {
      email: "update@entity.test",
      status: "Pending",
      registeredAt: new Date().toISOString(),
      origen: "Test",
    };
    regRepo.create(reg);

    reg.status = "Approved";
    reg.unsubscribed = true;
    regRepo.update(reg);

    const found = regRepo.findByEmail("update@entity.test");
    expect(found?.status).toBe("Approved");
    expect(found?.unsubscribed).toBe(true);
  });

  it("should find all registrations", () => {
    regRepo.create({
      email: "1@test.com",
      status: "Pending",
      registeredAt: "1",
      origen: "O",
    });
    regRepo.create({
      email: "2@test.com",
      status: "Approved",
      registeredAt: "2",
      origen: "O",
    });

    const all = regRepo.findAll();
    expect(all.length).toBe(2);
    expect(all.find((r) => r.email === "1@test.com")).toBeDefined();
  });

  it("should persist an email", () => {
    const email: SentEmail = {
      to: "hello@entity.test",
      subject: "Subject",
      preheader: "Pre",
      body: "Body",
      cta: "CTA",
      footer: "Footer",
      sentAt: new Date().toISOString(),
    };
    emailRepo.save(email);

    const all = emailRepo.findAll();
    expect(all.length).toBe(1);
    expect(all[0].to).toBe("hello@entity.test");
  });

  it("should persist across restarts", () => {
    regRepo.create({
      email: "persist@test.com",
      status: "Pending",
      registeredAt: "1",
      origen: "O",
    });

    // Simulate restart by creating a new instance on the same file
    const regRepo2 = new SQLiteRegistrationRepository(dbPath);
    const found = regRepo2.findByEmail("persist@test.com");
    expect(found).not.toBeNull();
    expect(found?.email).toBe("persist@test.com");
  });
});
