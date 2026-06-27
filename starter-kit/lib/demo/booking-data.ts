/** Mock data for the Booking live demo (app/demo/booking). */

export type Slot = {
  id: string;
  time: string;
  service: string;
  bookedBy: string | null;
};

export const services = ["Consultation (30m)", "Strategy session (60m)", "Quick check-in (15m)"];

export const seedSlots: Slot[] = [
  { id: "s1", time: "09:00", service: "Consultation (30m)", bookedBy: "Ana Ruiz" },
  { id: "s2", time: "09:30", service: "Quick check-in (15m)", bookedBy: null },
  { id: "s3", time: "10:00", service: "Strategy session (60m)", bookedBy: null },
  { id: "s4", time: "11:00", service: "Consultation (30m)", bookedBy: "Ben Cho" },
  { id: "s5", time: "13:00", service: "Strategy session (60m)", bookedBy: null },
  { id: "s6", time: "14:00", service: "Quick check-in (15m)", bookedBy: null },
  { id: "s7", time: "14:30", service: "Consultation (30m)", bookedBy: null },
  { id: "s8", time: "15:30", service: "Strategy session (60m)", bookedBy: "Carla Diaz" },
  { id: "s9", time: "16:30", service: "Quick check-in (15m)", bookedBy: null },
];
