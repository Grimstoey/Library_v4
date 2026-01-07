import 'dotenv/config' //ทำหน้าที่โหลดตัวแปรสภาพแวดล้อม (Environment Variables) จากไฟล์ .env เข้ามาในโปรเจกต์ (เช่นค่า DATABASE_URL)
import { PrismaPg } from '@prisma/adapter-pg' //นำเข้า Adapter สำหรับ PostgreSQL ซึ่งตัวนี้จะทำหน้าที่เป็น "ตัวกลาง" ให้ Prisma คุยกับฐานข้อมูลผ่านไลบรารี pg (node-postgres)
import { PrismaClient } from '../generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}` //ดึง URL ของฐานข้อมูลมาจาก .env เพื่อเตรียมส่งให้ Adapter

const adapter = new PrismaPg({ connectionString }) //สร้าง Instance ของ Adapter ขึ้นมาโดยใช้ Connection String ที่เตรียมไว้
const prisma = new PrismaClient({ adapter }) //สร้าง Instance ของ prisma ขึ้นมาใช้งาน โดยระบุให้ใช้ adapter

export { prisma }