const BASE_URL =
  "https://gist.githubusercontent.com/orlov-oleg-developer/49f08290d1c59a6851e0a0581900e2a7/raw/e5daf87338f3c75165f8edf4c76cc7ec9c2b4aa9/gistfile1.json";

export async function getTrainsData() {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Failed to get data");
  }
  return res.json();
}
