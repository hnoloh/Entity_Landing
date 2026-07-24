import { DatabaseSync } from 'node:sqlite';

export interface Registration {
  email: string;
  status: string;
  registeredAt: string;
  origen: string;
  confirmationEmailSent?: boolean;
  confirmationEmailSentAt?: string;
  confirmationEmailStatus?: string;
  confirmationEmailError?: string;
  invitationSent?: boolean;
  invitationSentAt?: string;
  invitationEmailStatus?: string;
  invitationEmailError?: string;
  unsubscribed?: boolean;
  unsubscribedAt?: string;
}

export interface SentEmail {
  to: string;
  subject: string;
  preheader: string;
  body: string;
  cta: string;
  footer: string;
  sentAt: string;
}

export class SQLiteRegistrationRepository {
  private db: DatabaseSync;

  constructor(dbPath: string) {
    this.db = new DatabaseSync(dbPath);
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS registrations (
        email TEXT PRIMARY KEY,
        status TEXT,
        registeredAt TEXT,
        origen TEXT,
        confirmationEmailSent INTEGER,
        confirmationEmailSentAt TEXT,
        confirmationEmailStatus TEXT,
        confirmationEmailError TEXT,
        invitationSent INTEGER,
        invitationSentAt TEXT,
        invitationEmailStatus TEXT,
        invitationEmailError TEXT,
        unsubscribed INTEGER,
        unsubscribedAt TEXT
      )
    `);
  }

  create(reg: Registration): void {
    const stmt = this.db.prepare(`
      INSERT INTO registrations (
        email, status, registeredAt, origen, confirmationEmailSent, confirmationEmailSentAt,
        confirmationEmailStatus, confirmationEmailError, invitationSent, invitationSentAt,
        invitationEmailStatus, invitationEmailError, unsubscribed, unsubscribedAt
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `);
    stmt.run(
      reg.email, reg.status, reg.registeredAt, reg.origen,
      reg.confirmationEmailSent ? 1 : 0, reg.confirmationEmailSentAt || null,
      reg.confirmationEmailStatus || null, reg.confirmationEmailError || null,
      reg.invitationSent ? 1 : 0, reg.invitationSentAt || null,
      reg.invitationEmailStatus || null, reg.invitationEmailError || null,
      reg.unsubscribed ? 1 : 0, reg.unsubscribedAt || null
    );
  }

  findByEmail(email: string): Registration | null {
    const stmt = this.db.prepare('SELECT * FROM registrations WHERE email = ?');
    const row = stmt.get(email) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (!row) return null;
    return this.mapRowToRegistration(row);
  }

  checkConnection(): boolean {
    try {
      const stmt = this.db.prepare('SELECT 1');
      stmt.get();
      return true;
    } catch {
      return false;
    }
  }

  findAll(): Registration[] {
    const stmt = this.db.prepare('SELECT * FROM registrations');
    const rows = stmt.all() as any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
    return rows.map(r => this.mapRowToRegistration(r));
  }

  update(reg: Registration): void {
    const stmt = this.db.prepare(`
      UPDATE registrations SET
        status = ?, registeredAt = ?, origen = ?, confirmationEmailSent = ?, confirmationEmailSentAt = ?,
        confirmationEmailStatus = ?, confirmationEmailError = ?, invitationSent = ?, invitationSentAt = ?,
        invitationEmailStatus = ?, invitationEmailError = ?, unsubscribed = ?, unsubscribedAt = ?
      WHERE email = ?
    `);
    stmt.run(
      reg.status, reg.registeredAt, reg.origen,
      reg.confirmationEmailSent ? 1 : 0, reg.confirmationEmailSentAt || null,
      reg.confirmationEmailStatus || null, reg.confirmationEmailError || null,
      reg.invitationSent ? 1 : 0, reg.invitationSentAt || null,
      reg.invitationEmailStatus || null, reg.invitationEmailError || null,
      reg.unsubscribed ? 1 : 0, reg.unsubscribedAt || null,
      reg.email
    );
  }

  private mapRowToRegistration(row: any /* eslint-disable-line @typescript-eslint/no-explicit-any */): Registration {
    return {
      email: row.email,
      status: row.status,
      registeredAt: row.registeredAt,
      origen: row.origen,
      confirmationEmailSent: row.confirmationEmailSent === 1,
      confirmationEmailSentAt: row.confirmationEmailSentAt,
      confirmationEmailStatus: row.confirmationEmailStatus,
      confirmationEmailError: row.confirmationEmailError,
      invitationSent: row.invitationSent === 1,
      invitationSentAt: row.invitationSentAt,
      invitationEmailStatus: row.invitationEmailStatus,
      invitationEmailError: row.invitationEmailError,
      unsubscribed: row.unsubscribed === 1,
      unsubscribedAt: row.unsubscribedAt
    };
  }
}

export class SQLiteEmailRepository {
  private db: DatabaseSync;

  constructor(dbPath: string) {
    this.db = new DatabaseSync(dbPath);
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS sent_emails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        "to" TEXT,
        subject TEXT,
        preheader TEXT,
        body TEXT,
        cta TEXT,
        footer TEXT,
        sentAt TEXT
      )
    `);
  }

  save(email: SentEmail): void {
    const stmt = this.db.prepare(`
      INSERT INTO sent_emails ("to", subject, preheader, body, cta, footer, sentAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(email.to, email.subject, email.preheader, email.body, email.cta, email.footer, email.sentAt);
  }

  findAll(): SentEmail[] {
    const stmt = this.db.prepare('SELECT "to", subject, preheader, body, cta, footer, sentAt FROM sent_emails');
    return stmt.all() as unknown as SentEmail[];
  }
}
