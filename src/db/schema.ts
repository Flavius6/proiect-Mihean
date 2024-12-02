import { defineTable, column } from 'astro:db';

export const Articles = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    title: column.text(),
    content: column.text(),
    slug: column.text({ unique: true }),
    authorId: column.number(),
    createdAt: column.date(),
    updatedAt: column.date()
  }
});

export const Users = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    username: column.text({ unique: true }),
    password: column.text(),
    isAdmin: column.boolean({ default: false }),
    createdAt: column.date()
  }
});