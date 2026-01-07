import { BORROW_DURATION_DAYS } from "../constants/borrowDuration";

// สร้าง "วันที่" ย้อนหลัง จะได้วันที่ยืม (ใช้กับ borrowDate, dueDate, returnedAt)
export function borrowedDaysAgo(days: number) {
  const d = new Date(); //สร้าง object วันที่ของ เวลาปัจจุบัน
  d.setDate(d.getDate() - days);

  /*
    d.getDate() ฟังชั่นดึง “เลขวันที่” ออกมา
    เช่น วันนี้ = 2026-01-07 → ได้ค่า 7

    setDate(เลขใหม่)
    ตั้งค่า “วัน” ใหม่ให้ object d 
    จะได้วันที่ยืม
  */

  return d;
}

//คำนวณวันครบกำหนดคืนจากวันที่ยืม
//รับ parameter borrowedAgoDays: number

export function calculateDueDate(borrowedAgoDays: number): Date {

  //เรียก function สร้างวันยืมจากด้านบน
  const borrowDate = borrowedDaysAgo(borrowedAgoDays);

  const dueDate = new Date(borrowDate);
  dueDate.setDate(dueDate.getDate() + BORROW_DURATION_DAYS);

  return dueDate;
}
