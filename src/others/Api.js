export const geocodeAddress = async (address) => {
  try {
    const response = await fetch("/api/geocode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch geocode address");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error geocoding address:", error);
  }
};
