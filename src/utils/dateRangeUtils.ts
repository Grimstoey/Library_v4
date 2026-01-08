/*
    ⏰ คืนช่วงเวลาของ 1 วัน ในรูปแบบ [startOfDay, startOfNextDay)
        - startOfDay  = 00:00:00.000
        - startOfNextDay = วันถัดไป 00:00:00.000

 */


export function getDayRange(date: Date) {

  const startOfDay = new Date(date);

    /*
      ต้องสร้างใหม่ เพราะ Date เป็น mutable object
      หากไม่สร้าง object ใหม่ มันจะชี้ไปที่ object เดียวกัน แก้ตัวหนึ่ง → อีกตัวเปลี่ยนตามทันที

      สร้าง object ใหม่ เพื่อไม่แก้ object ต้นฉบับ
      
    */

  startOfDay.setHours(0, 0, 0, 0);

  // สร้างวันถัดไปจาก startOfDay
  const startOfNextDay = new Date(startOfDay);
  startOfNextDay.setDate(startOfNextDay.getDate() + 1);

  return {
    startOfDay,
    startOfNextDay,
  };
}
