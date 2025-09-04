// utils/guestId.ts
export function getGuestId() {
  if (typeof window === "undefined") return "guest"; // SSR safety
  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    guestId = `guest_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("guestId", guestId);
  }
  return guestId;
}

export function getGuestName() {
  if (typeof window === "undefined") return "Guest";
  let guestName = localStorage.getItem("guestName");
  if (!guestName) {
    guestName = `Guest${Math.floor(Math.random() * 1000)}`;
    localStorage.setItem("guestName", guestName);
  }
  return guestName;
}