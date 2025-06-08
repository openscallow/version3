export async function getDeliveryWindow(schoolName) {
    try {
      const response = await fetch('/orderHistory/getDeliveryWindow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schoolName }),
      });

      if (response.ok) {
        const data = await response.json();
        return data
      } else {
        throw new Error('Failed to fetch delivery window');
      }
    } catch (error) {
      console.log(`No record found for school: ${schoolName}`);
      return null;
    }
}