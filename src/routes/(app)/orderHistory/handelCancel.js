export async function handelCancel(order_id) {
    try {
      let response = await fetch('/orderHistory/cancelOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_id }),
      });

      if (response.ok) {
        location.reload();
      }
    } catch (error) {
      console.error('Something went wrong:', error);
    }
}